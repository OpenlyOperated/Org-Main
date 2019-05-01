// Make a master DB connection for resetting the db and server
const { Pool } = require("pg");
const { Schema } = require("shared/utilities");
const Database = new Pool({
  host: process.env.PG_HOST,
  database: "master",
  user: "master",
  password: process.env.PG_ADMIN_PASSWORD,
  port: 5432,
  ssl: process.env.ENVIRONMENT === "LOCAL" ? false : true,
  max: 20,
  min: 4,
  idleTimeoutMillis: 1000,
  connectionTimeoutMillis: 10000,
});

const Client = require("./client.js");

module.exports = {

  /********************
  ******* RESET *******
  ********************/

  reset: () => {
    Client.resetAgent();
    return module.exports.resetDatabase()
      .then(result => {
        return module.exports.addData();
      });
  },

  resetDatabase: () => {
    var templatedSchema = Schema.getTemplated(
      "main_pw",
      "debug_pw"
    );
    templatedSchema = 
     `-- Disconnect all connected clients
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE datname = current_database()
        AND pid <> pg_backend_pid();
      -- Drop tables, roles
      DROP SCHEMA public CASCADE;
      DROP ROLE IF EXISTS main, debug;
      CREATE SCHEMA public;
      GRANT ALL ON SCHEMA public TO master;
      -- Create tables
      ${templatedSchema}
      -- Allow users to access tables
      GRANT USAGE ON SCHEMA public TO main, debug;`;
    return Database.query(templatedSchema);
  },
  
  /********************
  ***** TEST DATA *****
  ********************/
  
  addData: () => {
    return module.exports.addAdminUser();
  },
  
  addAdminUser: () => {
    var addTestAdminUser = fs.readFileSync(path.join(__dirname, "test-files", "add-admin-user.sql"), "utf-8");
    return Database.query(addTestAdminUser)
      .then( result => {
        if (result.rowCount !== 1) {
          throw Error("Error inserting test admin user in database");
        }
      });
  },

}