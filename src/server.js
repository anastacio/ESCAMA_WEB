const express = require("express");
const nunjucks = require("nunjucks");
const db = require("./database/db-config.js");
const cors = require("cors");
const upload = require("./config/multer.config");
const s3 = require("../src/config/aws.config");
const fs = require("fs");
const dateConversion = require("./helpers/dateConversion");

const server = express();
server.use(cors());

db.initializeDB();

server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

nunjucks.configure("src/views", {
  express: server,
  noCache: true,
});

server.get("/", (req, res) => {
  return res.render("index.html");
});

server.get("/create-point", (req, res) => {
  return res.render("create-point.html");
});

server.get("/about", (req, res) => {
  return res.render("about.html");
});

server.post("/savepoint", upload.single("image"), (req, res) => {
  const params = {
    ACL: "public-read",
    Bucket: "escamaweb",
    Body: fs.createReadStream(req.file.path),
    Key: `${Date.now()}${req.file.originalname}`,
  };

  s3.upload(params, async (err, data) => {
    if (err) {
      console.log("Error occured while trying to upload to S3 bucket", err);
    }

    if (data) {
      fs.unlinkSync(req.file.path);
      const imageLocationURL = data.Location;

      const query = `INSERT INTO tiles (
        image,
        name,
        description,
        address2,
        date,
        lat,
        lon,
        regions,
        types
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;

      const values = [
        imageLocationURL,
        req.body.name,
        req.body.description,
        req.body.address2,
        new Date(),
        req.body.lat,
        req.body.lon,
        req.body.regions,
        req.body.types,
      ];

      try {
        await db.query(query, values);
        console.log("Cadastrado com sucesso");
        return res.render("create-point.html", { saved: true });
      } catch (err) {
        console.log(err);
        return res.send("Erro no cadastro!");
      }
    }
  });
});

server.get("/search-results", async (req, res) => {
  const search = req.query.search;

  if (search == "") {
    //pesquisa vazia
    return res.render("search-results.html", { total: 0 });
  }

  try {
    let query = "SELECT * FROM tiles";
    // let query = "SELECT * FROM tiles WHERE";

    // if (typeof req.query.search === "object" && req.query.search.length > 1) {
    //   search.map((item, index) => {
    //     index > 0 ? (query += " OR ") : null;
    //     query += ` regions LIKE '%${item}%'`;
    //   });
    // } else {
    //   query += ` regions LIKE '%${search}%'`;
    // }

    const result = await db.query(query);

    const { rows } = result;

    rows.map((row) => {
      console.log(row.data);
      row.data = dateConversion(row.data);
    });

    return res.render("search-results.html", {
      tiles: rows,
      total: rows.length,
    });
  } catch (error) {
    return console.log(error);
  }
});

// 404 not found
server.use((req, res) => {
  res.status(404);

  if (req.accepts("html")) {
    res.render("404.html");
    return;
  }

  if (req.accepts("json")) {
    res.send({ error: "Not found" });
    return;
  }

  res.type("txt").send("Not found");
});

server.listen(process.env.PORT || 3000);
