const db = require('../../data/db-config');

const getAll = async () => {
    return db('groomer_favorites')
}

const getById = async (id) => {
    return db('groomer').where('user_id', id).first().select('*');
};
const getFavorite = async (id) => {
    return db('groomer_favorites')
        .join('groomer', 'groomer.id', '=', 'groomer_favorites.groom_id')
        .where('groomer_favorites.groom_id', id)
        .select(
            'groomer.given_name''
        )
        
}
const remove = async (id) => {
    return db('groomer').where('user_id', id).del();
}


module.exports = {
    getAll,
    getById,
    getFavorite,
    remove
}