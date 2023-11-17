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
     * @param credentials {Set} - The database credentials
     * @returns {Promise<Pool|void>}
     */
    connect = async(credentials) => {
        try {
            const pool = await mysql.createPool(credentials);
            await pool.getConnection();

            return pool;
        } catch (exception) {
            this.client.shutdown(`An error occurred while creating a pool connection to the MySQL database.`, exception);
        }
    }

}