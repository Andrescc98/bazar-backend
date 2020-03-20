const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require('./database');

const app = express();

// setting
app.set("port", process.env.PORT || 3000);

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/producto", require("./routes/producto"));
app.use("/api/comentario", require("./routes/comentario"));

// port
app.listen(app.get("port"), () => {
  console.log("\nSERVER ON PORT ", app.get("port"), "\n");
});
