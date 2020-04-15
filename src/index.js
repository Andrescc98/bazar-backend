const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const session=require('cookie-session');
const path=require('path');

// inicializacion de variables
const app = express();
require('./database');

// setting
app.set("port", process.env.PORT || 3000);

// middleware
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors());
app.use(session({
  secret:'jwt',
  keys:['key1', 'key2']
}));

// global variables
app.use((req, res, next) => {
  req.locals={
    keyjwt:'Andres Coronado',
  };
  
  next();
});

// routes
app.use("/api/usuario", require("./routes/usuario"));
app.use("/api/producto", require("./routes/producto"));
app.use("/api/comentario", require("./routes/comentario"));
app.use("/api/categoria", require('./routes/categoria'));

// public
app.use('/public/img', express.static(path.join(__dirname, '/public/upload')))

// port
app.listen(app.get("port"), () => {
  console.log("\nSERVER ON PORT ", app.get("port"), "\n");
});
