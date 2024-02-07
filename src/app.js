const express = require("express");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");
const taxRoutes = require("./routes/taxRoute");
const discountRoutes = require("./routes/discountRoute");
const orderRoutes = require("./routes/orderRoute");

const authRoutes = require("./routes/authRoute");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);

app.use("/api", productRoutes);
app.use("/api", taxRoutes);
app.use("/api", discountRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
