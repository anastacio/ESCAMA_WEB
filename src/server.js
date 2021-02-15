const express = require("express");
const nunjucks = require("nunjucks");
const db = require("./database/db");

const server = express();

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

server.post("/savepoint", (req, res) => {
  const { name, image, address, address2, state, city, items } = req.body;

  const query = `
    INSERT INTO places (
      image,
      name,
      address,
      address2,
      state,
      city,
      items
    ) VALUES ( ?,?,?,?,?,?,? );
  `;

  const values = [image, name, address, address2, state, city, items];

  db.run(query, values, function (err) {
    if (err) {
      console.log(err);
      res.send("Erro no cadastro");
    }
    return res.render("create-point.html", { saved: true });
  });
});

server.get("/search-results", (req, res) => {
  const { search } = req.query;
  if (search == "") {
    return res.render("search-results.html", { places: [], total: 0 });
  }
  db.all(
    `SELECT * FROM places WHERE city LIKE '%${search}%'`,
    function (err, rows) {
      if (err) {
        return console.log(err);
      }
      const total = rows.length;
      return res.render("search-results.html", { places: rows, total });
    }
  );
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

server.listen(3333);
