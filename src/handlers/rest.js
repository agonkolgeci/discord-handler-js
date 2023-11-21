import { REST, Routes } from "discord.js";

import logger from "../utils/Logger.js";

const rest = new REST({ version: "10" });

export default {
    /**
     * Deploy some stuff to the Discord API
     *
     * @param client {ExtendedClient} - The extended client
     * @param token {string} - Application Token
     * @param id {string} - Application ID
     * @returns {Promise<void>}
     */
    deploy: async(client, token, id) => {
        try {
            await rest.setToken(token).put(
                Routes.applicationCommands(id),

                {
                    body: client.applicationCommands
                }
            )

            logger.log("success", "Successfully deployed application commands to the Discord API.");
        } catch (exception) {
            logger.log("error",`Unable to deployed application commands to the Discord API. >> ${exception}`);
        }
    }
}