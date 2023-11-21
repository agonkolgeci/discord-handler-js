import { readdirSync } from "fs";

import logger from "../utils/Logger.js";

export default {
    /**
     * Load events
     *
     * @param client {ExtendedClient} - The extended client
     * @param baseURL {URL} - The events base URL
     * @returns {Promise<void>}
     */
    deploy: async(client, baseURL) => {
        for(const dir of readdirSync(baseURL)) {
            for(const file of readdirSync(new URL(`${dir}/`, baseURL)).filter(file => file.endsWith(".js"))) {
                const module = (await import(new URL(`${dir}/${file}`, baseURL))).default;

                for(const event of module) {
                    if(!event) {
                        logger.log("warn", `Unable to retrieve a event in '${dir}/${file}' due to its incorrect structure.`);

                        continue;
                    }

                    if(event.once) {
                        client.once(event.name, (...args) => event.onEvent(client, ...args));
                    } else {
                        client.on(event.name, (...args) => event.onEvent(client, ...args));
                    }

                    client.collection.events.set(event.name, {...event});
                }
            }
        }

        logger.log("info", `Successfully loaded ${client.collection.events.size} events.`);
    }
}