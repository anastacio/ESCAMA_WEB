function dateConversion(incomingDate) {
  const date = new Date(incomingDate);

  const day = date.getDate().toString(),
    convertedDay = date.length == 1 ? "0" + day : day,
    month = (date.getMonth() + 1).toString(),
    convertedMonth = month.length == 1 ? "0" + month : month,
    convertedYear = date.getFullYear();

  return `${convertedDay}/${convertedMonth}/${convertedYear}`;
}

module.exports = dateConversion;
