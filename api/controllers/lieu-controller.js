const fonction = require("./fonction-controller");
const query = require("../models/lieu-model");
const Joi = require("joi");

//fonction modifier la coordonnée de format DMS en format décimal
function dmsToDecimalCoordinate(degree, minute, seconde, cardinal) {
    var decimalCoordinate = parseInt(degree)+(parseInt(minute)/60)+(parseFloat(seconde)/3600);
    if (cardinal == "S" || cardinal == "O") {
      return -decimalCoordinate.toFixed(6);
    } else if(cardinal == "E" || cardinal == "N") {
      return decimalCoordinate.toFixed(6);
    }
}

//obtenir tous les lieux
const getAllLieu = (req, res) => {
  fonction.requeteAvecReponse(query.getAllLieu, res);
};

//obtenir un lieu
const getLieuById = (req, res) => {
  const validation = Joi.object({
    idLieu : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getLieuById, true);
};

//ajouter un lieu
const insertLieu = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    lonDeg : Joi.number().integer().required(),
    lonMin : Joi.number().integer().required(),
    lonSec : Joi.number().required(),
    lonCar : Joi.string().valid("E", "O").required(),
    latDeg : Joi.number().integer().required(),
    latMin : Joi.number().integer().required(),
    latSec : Joi.number().required(),
    latCar : Joi.string().valid("N", "S").required(),
  });

  const { value, error } = validation.validate(req.body);
  const {nom, lonDeg, lonMin, lonSec, lonCar, latDeg, latMin, latSec, latCar} = value;

  if(!error){
    const longitude = dmsToDecimalCoordinate(lonDeg, lonMin, lonSec, lonCar);
    const latitude = dmsToDecimalCoordinate(latDeg, latMin, latSec, latCar);
    const point = "POINT ("+longitude+" "+latitude+")";

    fonction.requeteAvecReponse(query.insertLieu, res, [nom, point, lonDeg, lonMin, lonSec, lonCar, latDeg, latMin, latSec, latCar]);
  } else{
    console.log("[error] "+error.message);
    res.status(400);
    res.end();
  };
};

//modifier un lieu
const updateLieu = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    lonDeg : Joi.number().integer().required(),
    lonMin : Joi.number().integer().required(),
    lonSec : Joi.number().required(),
    lonCar : Joi.string().valid("E", "O").required(),
    latDeg : Joi.number().integer().required(),
    latMin : Joi.number().integer().required(),
    latSec : Joi.number().required(),
    latCar : Joi.string().valid("N", "S").required(),
    idLieu : Joi.number().integer().required(),
  });

  const { value, error } = validation.validate(req.body);
  const {nom, lonDeg, lonMin, lonSec, lonCar, latDeg, latMin, latSec, latCar, idLieu} = value;

  if(!error){
    const longitude = dmsToDecimalCoordinate(lonDeg, lonMin, lonSec, lonCar);
    const latitude = dmsToDecimalCoordinate(latDeg, latMin, latSec, latCar);
    const point = "POINT ("+longitude+" "+latitude+")";

    fonction.requeteSansReponse(query.updateLieu, res, [nom, point, lonDeg, lonMin, lonSec, lonCar, latDeg, latMin, latSec, latCar, idLieu]);
  } else{
    console.log("[error] "+error.message);
    res.status(400);
    res.end();
  };
};

//supprimer un lieu
const deleteLieu = (req, res) => {
  const validation = Joi.object({
    idLieu : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteLieu, false);
};

module.exports = {
  getAllLieu,
  getLieuById,
  insertLieu,
  updateLieu,
  deleteLieu,
};

