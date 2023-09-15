const express = require("express");
const app = express();

const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db.js");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

dotenv.config();
connectDB();
//routing

app.use("/api/v1/test", require("./routes/testRoute.js"));
app.use("/api/v1/auth", require("./routes/auth.js"));
app.use("/api/v1/inventory", require("./routes/inventory.js"));
app.use("/api/v1/analytics", require("./routes/analytics.js"));
app.use("/api/v1/admin", require("./routes/adminRoutes.js"));
// app.use("/api/v1/admin", require("./routes/adminRoutes.js"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`port is listening at ${PORT}`.bgCyan);
});
