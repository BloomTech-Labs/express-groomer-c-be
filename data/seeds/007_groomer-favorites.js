exports.seed = async function(knex) {
  await knex('groomer_favorites').insert([
        {
          id: '1',
          cust_id:'00u13omswyZM1xVya4x7', 
          groom_id: '00ultx74kMUmEW8054x6'
        }
      ]);
    
};
