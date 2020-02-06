Recipe = require('../models/recipe');
// Handle index actions
exports.index = function (req, res) {
    Recipe.get(function (err, recipes) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Recipes retrieved successfully",
            data: recipes
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var recipe = new Recipe();
    recipe.title = req.body.title;
    recipe.url = req.body.url;
    recipe.rating = req.body.rating;
    recipe.type = req.body.type;

    recipe.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'New recipe created!',
            data: recipe
        });
    });
};
// Handle view contact info
exports.view = function (req, res) {
    Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: recipe
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
Recipe.findById(req.params.recipe_id, function (err, recipe) {
        if (err)
            res.send(err);
     recipe.title = req.body.title;
     recipe.url = req.body.url;
     recipe.rating = req.body.rating;
     recipe.type = req.body.type;
// save the contact and check for errors
        recipe.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Recipe info updated',
                data: recipe
            });
        });
    });
};
// Handle delete contact
exports.delete = function (req, res) {
    Recipe.remove({
        _id: req.params.recipe_id
    }, function (err, recipe) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Recipe deleted'
        });
    });
};