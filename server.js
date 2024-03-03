const routerLieu = require("./api/routes/lieu-route");
const routerEquipement = require("./api/routes/equipement-route");
const routerInformation = require("./api/routes/information-route");
const routerAll = require("./api/routes/route");
const express = require("express");
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

app.use("/lieu", routerLieu);
app.use("/information", routerInformation);
app.use("/equipement", routerEquipement);
app.use("/all", routerAll);

app.listen(3001, console.log("Server started on port 3001"));