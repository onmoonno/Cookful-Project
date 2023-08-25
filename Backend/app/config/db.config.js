module.exports = {
  HOST: "localhost",
  USER: "postgresql",
  PASSWORD: "123456",
  DB: "postgres",
  port: 5432,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
