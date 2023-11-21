import mongoose from "mongoose";

import logger from "../utils/Logger.js";

export default {
    /**
     * Connect the database to the atlas
     *
     * @param client {ExtendedClient} - The extended client
     * @param uri {string} - The MongoDB URI
     * @returns {Promise<void>}
     */
    connect: async(client, uri) => {
        try {
            await mongoose.connect(uri);

            logger.log("success", "Successfully connected MongoDB to the atlas !");
        } catch (exception) {
            logger.log("error",`Unable to connect MongoDB to the atlas. >> ${exception}`);
        }
    }
}