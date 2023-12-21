const Router = require('express');
const controlleur = require('../controllers/equipement-controller');
const router = Router();

router.get('/', controlleur.getAllEquipement);//route obtenir tous les équipements
router.get('/value/:idEquipement', controlleur.getEquipementById);//route obtenir un équipement

router.post('/ajouter', controlleur.insertEquipement);//route ajout équipement
router.post('/modifier', controlleur.updateEquipement);//route modifier équipement

router.delete('/supprimer/:idEquipement', controlleur.deleteEquipement);//route supprimer équipement

module.exports = router;