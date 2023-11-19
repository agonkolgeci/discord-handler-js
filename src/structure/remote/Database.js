import mysql from "mysql2/promise";

export default class Database {

    /**
     * Database controller
     *
     * @param client {ExtendedClient} - The extended client
     */
    constructor(client) {
        this.client = client;
    }

    /**
     * Create Database Pool connection
     *
     * @returns {Promise<Pool|void>}
     */
    connect = async() => {
        try {
            const pool = await mysql.createPool({
                "host": process.env["DATABASE_HOST"],
                "database": process.env["DATABASE_NAME"],
                "user": process.env["DATABASE_USER"],
                "password": process.env["DATABASE_PASSWORD"],
                "charset": process.env["DATABASE_CHARSET"],
                "port": process.env["DATABASE_PORT"]
            });

            await pool.getConnection();

            this.client.logger.log("success", `Successfully established connection with the database.`);

            return pool;
        } catch (exception) {
            this.client.shutdown(`An error occurred while creating a pool connection to the MySQL database.`, exception);
        }
    }

}