const Router = require('express');
const controlleur = require('../controllers/lieu-controller');
const router = Router();

router.get('/', controlleur.getAllLieu);//route obtenir tous les lieu
router.get('/value/:idLieu', controlleur.getLieuById);//route obtenir un lieu

router.post('/ajouter', controlleur.insertLieu);//route ajouter un lieu
router.post('/modifier', controlleur.updateLieu);//route modifier un lieu

router.delete('/supprimer/:idLieu', controlleur.deleteLieu);//route supprimer un lieu

module.exports = router;