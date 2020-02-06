var mongoose = require('mongoose');
// Setup schema
var recipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String        
    },
    url: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    type: {
        type: String,
        required: true
        },
    create_date: {
        type: Date,
        default: Date.now
    },
    update_date: {
        type: Date,
        default: Date.now
    }
});

var Recipe = module.exports = mongoose.model('recipe', recipeSchema);
module.exports.get = function (callback, limit) {
    Recipe.find(callback).limit(limit);
}