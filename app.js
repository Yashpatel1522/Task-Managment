const path = require("path");
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
app.use(cookieparser());
require("dotenv").config();
const socket = require("socket.io");
const router = require("./routers/router");
let PORT = process.env.PORT;
const fs = require('fs');

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


app.use(router)
//socket.io

const io = socket(server);

io.on("connection", (socket) => {

  socket.on("recmsg", (data) => {
    io.emit("sendmsg", data);
  });
  socket.on("msg", (data) => {
    io.emit("msg2", data);
  });
  socket.on("notification-data", (data) => {
    io.emit("send-notification-data", data)
  })
  socket.on("deletefile", (fileName)=> {
    fs.unlinkSync(`public/assets/pdfs/${fileName}`);
  });
  socket.on("downloadFile", (fileName)=> {
    const data = fs.readFileSync(`public/assets/pdfs/${fileName}`);
    socket.emit('blob', {data, fileName})
  });
});

io.on("disconnect", () => {
  activeUsers.delete(io.userId);
  io.emit("user disconnected", io.userId);
});

