//requête obtenir tous les équipements
const getAllEquipement = "SELECT * FROM equipement";

//requête ajouter un équipement
const insertEquipement = "INSERT INTO equipement (type, version_software, numero_serie, version_firmware) VALUES ($1, $2, $3, $4)";

//requête modifier un équipement
const updateEquipement = "UPDATE equipement SET type = $1, version_software = $2, numero_serie = $3, version_firmware = $4 WHERE id = $5";

//requête supprimer un équipement
const deleteEquipement = "DELETE FROM equipement WHERE id = $1";

//requête obtenir un équipement a partir de son id
const getEquipementById = "SELECT * FROM equipement WHERE id = $1";

module.exports = {
  getAllEquipement,
  insertEquipement,
  updateEquipement,
  deleteEquipement,
  getEquipementById,
};
