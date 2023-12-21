//requête selectionner information, lieu, équipement a partir d'un idenfiant d'un lieu
const getAllByIdLieu = "SELECT *, information.id as id_information FROM information INNER JOIN lieu ON lieu.id = information.id_lieu INNER JOIN equipement ON equipement.id = information.id_equipement WHERE lieu.id = $1";

//requête selectionner l'équipement et information a partir de l'id information
const getInformationEquipementByIdInformation = "SELECT *, information.id as id_information FROM equipement INNER JOIN information ON equipement.id = information.id_equipement WHERE information.id = $1";

module.exports = {
  getAllByIdLieu,
  getInformationEquipementByIdInformation,
};
