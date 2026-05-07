const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config({ quiet: true });

const app = express();
app.use(express.json());

const allowedOrigins = process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(",") : ["http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

app.use(cookieParser());

const server = createServer(app);

const initSockets = require("./socket");
initSockets(server, app);

const routes = require("./routes");
app.use("/api", routes);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`✅ server running on port ${PORT}`);
});
