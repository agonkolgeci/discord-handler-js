import { readdirSync } from "fs";

import logger from "../utils/Logger.js";

export default {
    /**
     * Load commands
     *
     * @param client {ExtendedClient} - The extended client
     * @param baseURL {URL} - The commands base URL
     * @returns {Promise<void>}
     */
    deploy: async(client, baseURL) => {
        for(const dir of readdirSync(baseURL)) {
            for(const file of readdirSync(new URL(`${dir}/`, baseURL)).filter(file => file.endsWith(".js"))) {
                const module = (await import(new URL(`${dir}/${file}`, baseURL))).default;

                for(const component of module) {
                    if(!component || !component.customId) {
                        logger.log("warn", `Unable to retrieve an component in '${dir}/${file}' due to its incorrect structure.`);

                        continue;
                    }

                    if(client.collection.components.has(component.commandId)) {
                        logger.log("warn", `Unable to retrieve component '${dir}/${file}#${component.customId}' because a component under its id already exists.`);

                        continue;
                    }

                    client.collection.components.set(component.customId, component);
                }
            }
        }

        logger.log("info",`Successfully loaded ${client.collection.components.size} components.`);
    }
}