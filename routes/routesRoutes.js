const router = require('express').Router()
const sendRoutes = require('../controllers/routesController')

router.route('*')
  .get(sendRoutes)
  .post(sendRoutes)
  .put(sendRoutes)
  .delete(sendRoutes)

module.exports = router;