require("dotenv").config();
const dbConfig = require("./database");
const { Sequelize, Model, DataTypes } = require("sequelize");

// Create Connection Between Sequelize and Database (--> MySQL)
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig.options
);

// //Test Connection
// try {
//   sequelize.authenticate();
//   console.log("Connection has been established successfully.");
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

const db = {};
// db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.admin = require("./adminUserModel.js")(sequelize, DataTypes);

// Synchronize Sequelize Model and Actual Datatables in SQL
db.sequelize
  .sync({ force: false })
  // .sync({ force: true }) // force sync --> remove old and create new
  // .sync({ alter: true }) // sync update --> update existing table only
  .then(async () => {
    console.log("Synchronization completed.");
    // Call seeder file to seed the database based on .env conditional
    if (process.env.SEED_DB === "TRUE") {
      const seeder = require("./seeder/seed");
      await seeder.seedData(db);
      console.log("Seeder completed.");
    }
  });

module.exports = db;
