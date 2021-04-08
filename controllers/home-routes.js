const router = require('express').Router();
const {
    User,
    Recipe
} = require('../models')

// RENDER HOMEPAGE W/ LISTED TO-DOS
router.get('/', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('login')
    }
    ToDo.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'type',
            'title',
            'contents'
        ],
    })
        .then(dbRecipeData => {
            const recipes = dbRecipeData.map(recipe => recipe.get({ plain: true }));
            res.render('homepage', {
                recipes,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// RENDER LOGIN PAGE
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// RENDER SIGNUP PAGE
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

module.exports = router;