const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const routesRoutes = require('./routesRoutes')

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);
router.use('*', routesRoutes);

module.exports = router;