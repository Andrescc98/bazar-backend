const express = require("express");
const cors = require("cors");

const app = express();

// setting
app.set("port", process.env.PORT || 3000);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes

// port
app.listen(app.get("port"), () => {
  console.log("\nSERVER ON PORT ", app.get("port"), "\n");
});
