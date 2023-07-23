const express = require("express");
const cors = require("cors");
const router = express.Router();

const app = express();

app.use(cors());

require("./src/routes/routes")(app, router);

app.listen(1999, () => {
  console.log("server is running on port : 1999............");
});
