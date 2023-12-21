const Router = require('express');
const controlleur = require('../controllers/information-controller');
const router = Router();

router.post('/ajouter', controlleur.insertInformation);//route ajouter un information
router.post('/modifier', controlleur.updateInformation);//route modifier information

router.delete('/supprimer/:idInformation', controlleur.deleteInformation);//route supprimer un information

module.exports = router;