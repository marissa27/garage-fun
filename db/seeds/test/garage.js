exports.seed = function(knex, Promise) {
  return knex('items').del()

  .then(() => {
    return Promise.all([
      knex('items').insert([
        {
          name: 'ring',
          reason: 'to hide from mordor',
          cleanliness: 'dusty',
          id: 1,
        },
        {
          name: 'slaughterhouse5',
          reason: 'so it goes',
          cleanliness: 'sparkling',
          id: 2,
        },
        {
          name: 'grandma',
          reason: 'to tell me stories',
          cleanliness: 'dusty',
          id: 3,
        },
      ])
    ])
  })
}
