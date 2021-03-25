const Recipe = require('./Recipe');
const User = require('./User');

//create associations
User.hasMany(Recipe, {
    foreignKey: 'user_id'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

module.exports = { User, Recipe };