const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
require("dotenv").config();
const ejs = require("ejs");
const logger = require("./logger/logger");
const adminroute = require("./routers/adminroute");
const employeeroute = require("./routers/employeeroute");
const managerroute = require("./routers/managerroute");
const login = require("./routers/loginroutes");
const { loginGet } = require("./controller/loginmodule/login.controller");
const { errorGet } = require("./controller/loginmodule/error.controller");
const socket = require("socket.io");
const { request } = require("http");
let PORT = process.env.PORT;

app.use(
  "/bootstrap_icon_css",
  express.static("./node_modules/bootstrap-icons/font")
);
app.use(
  "/charts",
  express.static(path.join(__dirname, "node_modules/apexcharts/dist/"))
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/")));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "/node_modules/bootstrap/dist")));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(
  "/bootstrape",
  express.static(path.join(__dirname, "/node_modules/bootstrap/dist"))
);
app.use(
  "/sweetalert2",
  express.static(path.join(__dirname, "/node_modules/sweetalert2/dist"))
);
app.use(
  "/boxicon",
  express.static(path.join(__dirname, "/node_modules/boxicons"))
);
app.use(
  "/socket.io",
  express.static(path.join(__dirname, "/node_modules/socket.io/client-dist"))
);

const server = app.listen(PORT, () => {
  console.log(
    `listen portno is : http://${process.env.HOST}:${process.env.PORT}`
  );
});
// app.use((req, res, next) => {
//   console.log(req.path);
//   next();
// });

app.get("/", loginGet);
app.use("/admin", adminroute);
app.use("/employee", employeeroute);
app.use("/login", login);
app.use("/manager", managerroute);
app.get("*", errorGet);
const activeUsers = new Set();
//socket.io

const io = socket(server);

io.on("connection", (socket) => {
  console.log("Made socket connection");
  socket.on("recmsg", (data) => {
    console.log(data);
    io.emit("sendmsg", data);
  });
});

io.on("disconnect", () => {
  activeUsers.delete(io.userId);
  io.emit("user disconnected", io.userId);
});
