const MySql = require('mysql');

module.exports = class {
    /**
     * Defined the client.
     * @param {Client} Client - Represents the Discord Client.
     */
    constructor(Client) {
        this.Client = Client;
    }

    /**
     * Connect to database.
     * @param {JSON} DatabaseConfig - Represents the database config.
     */
    connect(DatabaseConfig) {
        try {
            this.Client.Database = MySql.createPool({
                host: DatabaseConfig["host"], port: DatabaseConfig["port"],
                user: DatabaseConfig["user"], password: DatabaseConfig["password"],
                database: DatabaseConfig["database"], charset: DatabaseConfig["charset"]
            });

            console.log("• Successful database connection.");
        } catch (error) { throw new Error(error); }
    }
}