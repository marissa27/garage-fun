module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/garage',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/garagetest',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: 'postgres://localhost/garage',
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },

};
