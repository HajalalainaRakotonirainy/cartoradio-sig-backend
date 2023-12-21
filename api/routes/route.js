const Router = require('express');
const controlleur = require('../controllers/controller');

const router = Router();

router.get('/lieu/:idLieu', controlleur.getAllByIdLieu);//route obtenir toutes information, equipement et lieu a partir d'un id lieu
router.get('/information/:idInformation', controlleur.getInformationEquipementByIdInformation);//route obtenir equipement et information a partir d'un id information

module.exports = router;