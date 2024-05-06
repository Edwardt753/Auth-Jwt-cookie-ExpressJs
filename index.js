require("dotenv").config();
const PORT = process.env.port;
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser"); // Import cookie-parser middleware
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

const route = require("./routes/route");
app.use("/", route);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
