require('dotenv').config();

module.exports = {
  development: {
    username: 'Dhani',
    password: null,
    database: 'notes-dev',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    use_env_variable: 'TEST_DATABASE_URL',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
  }
};
