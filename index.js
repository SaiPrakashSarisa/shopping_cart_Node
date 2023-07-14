const express = require("express");
const cors = require("cors");

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productsRoute");
const cartRouter = require("./routes/cartRoutes");

const app = express();

app.use(cors());

app.use("/", authRouter);
app.use("/", productRouter);
app.use("/", cartRouter);

app.listen(1999, () => {
  console.log("server is running on port : 1999............");
});
