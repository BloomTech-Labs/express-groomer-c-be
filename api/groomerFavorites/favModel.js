const db = require('../../data/db-config');

const getAll = async () => {
    return db('groomer_favorites');
};



const remove = async (id) => {
    return db('groomer').where('user_id', id).del();
};

module.exports = {
    getAll,
    //getById,
    remove,
};
