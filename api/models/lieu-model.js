//requête obtenir tous les lieux
const getAllLieu = "SELECT * FROM lieu";

//requête obtenir un lieu
const getLieuById = "SELECT * FROM lieu WHERE id = $1"

//requête ajout lieu
const insertLieu = "INSERT INTO lieu (nom, geom, lon_deg, lon_min, lon_sec, lon_car, lat_deg, lat_min, lat_sec, lat_car) VALUES ($1, ST_GeomFromText($2, 4326), $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id";

//requête modifier un lieu
const updateLieu = "UPDATE lieu SET nom = $1, geom = ST_GeomFromText($2, 4326), lon_deg = $3, lon_min = $4, lon_sec = $5, lon_car = $6, lat_deg = $7, lat_min = $8, lat_sec = $9, lat_car = $10 WHERE id = $11";

//requête modifier max_value d'un lieu a partir de son id
const updateMaxValueLieu = "UPDATE lieu SET max_value = $1 WHERE id = $2";

//requête supprimer un lieu
const deleteLieu = "DELETE FROM lieu WHERE id = $1";

module.exports = {
  getAllLieu,
  getLieuById,
  insertLieu,
  updateLieu,
  updateMaxValueLieu,
  deleteLieu,
};

