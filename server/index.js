const express = require("express");

const app = express();

const cors = require("cors");

const requestMiddleware = require("./middleware/request");

const userRoutes = require("./routes/userRoute");

const groupRoutes = require("./routes/groupRoutes");

const messageRoutes = require("./routes/groupsMessageRoutes");

app.use(express.json());

app.use([requestMiddleware, cors({ origin: "http://localhost:3000" })]);

app.use("/users", userRoutes);

app.use("/groups", groupRoutes);

app.use("/mess", messageRoutes);

app.all("*", (req, res) => {
  res.status(404).send("Not found error 404");
});

app.listen(80, () => {
  console.log("server listening on port 80....");
});
