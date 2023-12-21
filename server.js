require("dotenv").config();
const { API_PORT, LINKS_TO_ALLOW } = process.env;

const routerLieu = require("./api/routes/lieu-route");
const routerEquipement = require("./api/routes/equipement-route");
const routerInformation = require("./api/routes/information-route");
const routerAll = require("./api/routes/route");
const express = require("express");

const app = express();
const LINK_TO_ALLOW = LINKS_TO_ALLOW.split(", ");

app.use(express.json());
app.use(function (req, res, next) {
  if(LINK_TO_ALLOW.includes(req.headers.origin)){
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
  };
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
  next();
});

app.use("/lieu", routerLieu);
app.use("/information", routerInformation);
app.use("/equipement", routerEquipement);
app.use("/all", routerAll);

app.listen(API_PORT, console.log("Server started on port " + API_PORT));
