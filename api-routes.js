// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

var recipeController = require('./recipeController');

router.route('/recipes')
    .get(recipeController.index)
    .post(recipeController.new);
router.route('/recipes/:recipe_id')
    .get(recipeController.view)
    .patch(recipeController.update)
    .put(recipeController.update)
    .delete(recipeController.delete);

module.exports = router;