const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");
const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const contactsRoutes = require("./routes/contacts");

const port = process.env.PORT || 8080;
const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  next();
});
app.use("/contact", contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(`MongoDB connection error: ${err}`);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
