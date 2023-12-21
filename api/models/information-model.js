//requête ajout information
const insertInformation = "INSERT INTO information (id_lieu, id_equipement, environement, nombre_emetteur_visible, hauteur_mesure, date, sonde_100khz_8ghz, sonde_300khz_18ghz, fm, tv, cdma, tm900, tm1800, tm2100, tm2300, tm2500, tm3500) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)";

//requête modifier information
const updateInformation = "UPDATE information SET id_lieu = $1, id_equipement = $2, environement = $3, nombre_emetteur_visible = $4, hauteur_mesure = $5, date = $6, sonde_100khz_8ghz = $7, sonde_300khz_18ghz = $8, fm = $9, tv = $10, cdma = $11, tm900 = $12, tm1800 = $13, tm2100 = $14, tm2300 = $15, tm2500 = $16, tm3500 = $17 WHERE id = $18";

//requête supprimer un information
const deleteInformation = "DELETE FROM information WHERE id = $1";

//requête obtenir un information
const getInformationById = "SELECT * FROM information WHERE id = $1";

module.exports = {
  insertInformation,
  updateInformation,
  deleteInformation,
  getInformationById,
};
