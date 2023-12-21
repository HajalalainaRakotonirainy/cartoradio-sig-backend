const fonction = require("./fonction-controller");
const query = require("../models/model");
const queryLieu = require("../models/lieu-model");
const queryInformation = require("../models/information-model");
const queryEquipement = require("../models/equipement-model");
const Joi = require("joi");
const pool = require("../database");


//modifier max_value d'un lieu
const getAndUpdateMaxValue = (res, idLieu) => {
  pool.query(query.getAllByIdLieu, [idLieu], (error, result) => {
    if(error) throw error;
    var allValue = [];
    var maxValue = 0;
    for (let i = 0; i < result.rowCount; i++) {
      allValue[i] = result.rows[i].sonde_100khz_8ghz > result.rows[i].sonde_300khz_18ghz ? result.rows[i].sonde_100khz_8ghz : result.rows[i].sonde_300khz_18ghz;
    }
    for (let i = 0; i < allValue.length; i++) {
      maxValue = maxValue > allValue[i] ? maxValue : allValue[i];
    }
    pool.query(queryLieu.updateMaxValueLieu, [maxValue.toFixed(2), idLieu]);
    res.end();
  });
};

// ajouter un information
const insertInformation = (req, res) => {
  const validation = Joi.object({
    idLieu : Joi.number().integer().required(),
    idEquipement : Joi.number().integer().required(),
    environement : Joi.string().required(),
    nbEmetteurVisible : Joi.string().required(),
    hauteurMesure : Joi.string().required(),
    date : Joi.date().required(),
    sondeMin : Joi.number().required(),
    sondeMax : Joi.number().required(),
    fm : Joi.number().required(),
    tv : Joi.number().required(),
    cdma : Joi.number().required(),
    tm900 : Joi.number().required(),
    tm1800 : Joi.number().required(),
    tm2100 : Joi.number().required(),
    tm2300 : Joi.number().required(),
    tm2500 : Joi.number().required(),
    tm3500 : Joi.number().required(),
  });
  const { value, error } = validation.validate(req.body);
  const { idLieu, idEquipement} = value;
  const data = Object.values(value);

  if(!error){
    //tester si id lieu est present dans la base de donnée
    pool.query(queryLieu.getLieuById, [idLieu], (errorLieu, resultLieu)=>{
      if (errorLieu) throw errorLieu;
      if(resultLieu.rowCount != 0){//si id lieu est présent
        //on teste ensuite si id équipement est présent dans la base
        pool.query(queryEquipement.getEquipementById, [idEquipement], (errorEquipement, resultEquipement)=>{
          if (errorEquipement) throw errorEquipement;
          if (resultEquipement.rowCount != 0) {//si id equipement est présent
            //on ajoute l'information
            pool.query(queryInformation.insertInformation, data, (errorInformation)=>{
              if (errorInformation) throw errorInformation;
              getAndUpdateMaxValue(res, idLieu);//modifie max_value du lieu
            });
          }
        });
      };
      res.end();
    });
  } else{
    console.error("[error] ", error.message);
    res.status(400);
    res.end();
  };
};

// modifier un information
const updateInformation = (req, res) => {
  const validation = Joi.object({
    idLieu : Joi.number().integer().required(),
    idEquipement : Joi.number().integer().required(),
    environement : Joi.string().required(),
    nbEmetteurVisible : Joi.string().required(),
    hauteurMesure : Joi.string().required(),
    date : Joi.date().required(),
    sondeMin : Joi.number().required(),
    sondeMax : Joi.number().required(),
    fm : Joi.number().required(),
    tv : Joi.number().required(),
    cdma : Joi.number().required(),
    tm900 : Joi.number().required(),
    tm1800 : Joi.number().required(),
    tm2100 : Joi.number().required(),
    tm2300 : Joi.number().required(),
    tm2500 : Joi.number().required(),
    tm3500 : Joi.number().required(),
    idInformation : Joi.number().integer().required(),
  });

  const { value, error } = validation.validate(req.body);
  const { idLieu, idEquipement, idInformation } = value;
  const data = Object.values(value);

  if(!error){
    //tester si id lieu est present dans la base de donnée
    pool.query(queryLieu.getLieuById, [idLieu], (errorLieu, resultLieu)=>{
      if (errorLieu) throw errorLieu;
      if(resultLieu.rowCount != 0){//si id lieu est présent
        //on teste si id équipement est présent dans la base
        pool.query(queryEquipement.getEquipementById, [idEquipement], (errorEquipement, resultEquipement)=>{
          if (errorEquipement) throw errorEquipement;
          if (resultEquipement.rowCount != 0) {//si id equipement est présent
            //on teste si id information est présent dans la base
            pool.query(queryInformation.getInformationById, [idInformation], (errorInformation, resultInformation)=>{
              if (errorInformation) throw errorInformation
              if (resultInformation.rowCount != 0) {//si id information est présent
                const ancienIdLieu = resultInformation.rows[0].id_lieu;//get l'ancien id lieu
                //on modifie l'information
                pool.query(queryInformation.updateInformation, data, (errorUpdateInformation)=>{
                  if (errorUpdateInformation) throw errorUpdateInformation;
                  if (ancienIdLieu == idLieu) {//si l'ancien id lieu est égal au nouveau id lieu
                    getAndUpdateMaxValue(res, idLieu);
                  } else {//si ancien id lieu != nouveau id lieu
                    getAndUpdateMaxValue(res, idLieu);
                    getAndUpdateMaxValue(res, ancienIdLieu);
                  }
                });
              }
            })
          }
        });
      };
      res.end();
    });
  } else{
    console.error("[error] ", error.message);
    res.status(400);
    res.end();
  };
};

//supprimer un information
const deleteInformation = (req, res) => {
  const validation = Joi.object({
    idInformation : Joi.number().integer().required(),
  });

  const { value, error } = validation.validate(req.params);
  const { idInformation } = value;

  if(!error){
    //tester l'existance id information dans la base
    pool.query(queryInformation.getInformationById, [idInformation], (error, result)=>{
      if (error) throw error;
      if (result.rowCount != 0) {//si id information existe
        const idLieu = result.rows[0].id_lieu;
        fonction.requeteSansReponse(queryInformation.deleteInformation, res, [idInformation]);//supprimer information
        getAndUpdateMaxValue(res, idLieu);//modifier max_value du lieu
      }
      res.end();
    });
  } else{
    console.error("[error] ", error.message);
    res.status(400);
    res.end();
  };
};

module.exports = {
  insertInformation,
  updateInformation,
  deleteInformation,
};

