const fonction = require("./fonction-controller");
const query = require("../models/model");
const Joi = require("joi");

//obtenir lieu, information et equipement d'un id lieu
const getAllByIdLieu = (req, res) => {
  const validation = Joi.object({
    idLieu : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getAllByIdLieu, true);

};

//obtenir information, equipement d'un id information
const getInformationEquipementByIdInformation = (req, res)=>{
  const validation = Joi.object({
    idInformation : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getInformationEquipementByIdInformation, true)

};

module.exports = {
  getAllByIdLieu,
  getInformationEquipementByIdInformation,
};
