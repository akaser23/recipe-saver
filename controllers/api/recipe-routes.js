const router = require('express').Router();
const {
    User,
    Recipe
} = require('../../models');
const { recipe } = require('../home-routes');

//Get all Recipes
router.get('/', (req, res) => {
    Recipe.findAll({
        attributes: ['id', 'category', 'title', 'contents'],
    })
        .then((dbRecipeData) => res.json(dbRecipeData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err)
        });
});

//Create a Recipe
router.post('/', (req, res) => {
    Recipe.create({
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents,
        user_id: req.session.user_id
    })
        .then((dbRecipeData) => res.json(dbRecipeData))
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Update a Recipe
router.put('/:id', (req, res) => {
    console.log(req.body);
    Recipe.update({
        category: req.body.category,
        title: req.body.title,
        contents: req.body.contents
    }, {
        where: {
            id: req.params.id,
        },
    })
        .then((dbRecipeData) => {
            console.log(dbRecipeData);
            if (!dbRecipeData) {
                res.status(404).json({
                    message: "No recipe found with this id"
                });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Delete a recipe
router.delete("/:id", (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((dbRecipeData) => {
            if (!dbRecipeData) {
                res.status(404).json({
                    message: "We were unable to locate this post."
                });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;