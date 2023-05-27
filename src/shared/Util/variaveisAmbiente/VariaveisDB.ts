export const VariaveisDB = {
  DB_LOCAL: {
    DB_LOGIN: {
      connection: {
        connectionString: process.env.DB_LOGIN!,
      },
      nomeDB: 'logins',
    },
  },

  DB_PRODUCTION: {
    DB_LOGIN: {
      connection: {
        connectionString: process.env.DB_LOGIN!,
        ssl: { rejectUnauthorized: false },
      },
      nomeDB: 'logins',
    },
  },
};
