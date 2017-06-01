module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/garage',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true
  },

  test: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/garagetest',
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds/test',
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://localhost/garage',
    migrations: {
      directory: './db/migrations'
    },
    seeds: {
      directory: './db/seeds/dev',
    },
    useNullAsDefault: true
  },
};
