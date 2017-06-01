exports.seed = function(knex, Promise) {
  return knex('items').del()

    .then(function () {
      return Promise.all([
        knex('items').insert([
          {
            name: 'remote',
            reason: 'opens garage',
            cleanliness: 'dusty'
          },
        ])
      ])
    });
};
