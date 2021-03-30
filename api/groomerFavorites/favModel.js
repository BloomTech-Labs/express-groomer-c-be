const db = require('../../data/db-config');

const getAll = async () => {
    return db('groomer_favorites');
};

// The following code is meant to grab data from the groomer table and display when user id is matched
// to id. Unfortunately, I ran in to an error. When user_id is compared to id,
// an error is thrown because user_id is a string and id is an integer. If this code is eventually used, all of the
// migrations will need to be changed because all of the ids are defined as strings.
//
// The following code is needed if you want to display more data on the pet owners dashboard.
//const getById = async (id) => {
//return db('groomer_favorites');
//   .join('groomer', 'groomer.id', 'groomer_favorites.groom_id');
//  .select('groomer.given_name');
// .where('groomer.user_id', id)
//};

const remove = async (id) => {
    return db('groomer').where('user_id', id).del();
};

module.exports = {
    getAll,
    //getById,
    remove,
};
