
exports.seed = async function(knex) {
  await knex('groomer-favorites').insert([
        {customer_id:'00u13omswyZM1xVya4x7', groomer_id: '00ultx74kMUmEW8054x6'},
        {customer_id: '00u13omswyZM1xVya4x7', groomer_id: '00ultx74kMUmEW8054x6'},
        {customer_id: '00u13ol5x1kmKxVJU4x7', groomer_id: '00ulthapbErVUwVJy4x'},
        {customer_id: '00u13ol5x1kmKxVJU4x7', groomer_id: '00ultwqjtqt4VCcS24x6'},
      ]);
    
};
