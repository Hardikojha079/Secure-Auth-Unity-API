const { Router } = require('express');
const controller = require('./controller');
const middleware = require('./middleware');

const router = Router();

router.post('/login', controller.GetLoginId);
router.get('/', middleware.authenticateToken, controller.getDetails);
router.post('/', middleware.authenticateToken, controller.AddDetails);
router.put('/:account_number', middleware.authenticateToken, controller.updateDetails);
router.delete('/:account_number', middleware.authenticateToken, controller.removeDetails);

module.exports = router;
