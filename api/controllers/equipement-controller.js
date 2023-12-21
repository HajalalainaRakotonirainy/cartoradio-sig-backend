const fonction = require("./fonction-controller");
const query = require("../models/equipement-model");
const Joi = require("joi");

//obtenir tous les equipements
const getAllEquipement = (req, res) => {
  fonction.requeteAvecReponse(query.getAllEquipement, res);
};

//ajouter un équipement
const insertEquipement = (req, res) => {
  const validation = Joi.object({
    type : Joi.string().valid("SMP2", "PR100").required(),
    versionSoftware : Joi.string().required(),
    numeroSerie : Joi.string().required(),
    versionFirmware : Joi.string().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.body, query.insertEquipement, false);
};

//modifier un équipement
const updateEquipement = (req, res) => {
  const validation = Joi.object({
    type : Joi.string().valid("SMP2", "PR100").required(),
    versionSoftware : Joi.string().required(),
    numeroSerie : Joi.string().required(),
    versionFirmware : Joi.string().required(),
    idEquipement : Joi.number().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.body, query.updateEquipement, false);
};

//supprimer un équipement
const deleteEquipement = (req, res) => {
  const validation = Joi.object({
    idEquipement : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteEquipement, false);
};

//obtenir un équipement a partir de son id
const getEquipementById = (req, res) => {
  const validation = Joi.object({
    idEquipement : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getEquipementById, true);
};

module.exports = {
  getAllEquipement,
  insertEquipement,
  updateEquipement,
  deleteEquipement,
  getEquipementById,
};
