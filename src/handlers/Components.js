export default {
    /**
     * Load commands
     *
     * @param client {ExtendedClient} - The extended client
     * @param baseURL {URL} - The commands base URL
     * @returns {Promise<void>}
     */
    deploy: async(client, baseURL) => {
        for(const dir of client.readdirSync(baseURL)) {
            for(const file of client.readdirSync(new URL(`${dir}/`, baseURL)).filter(file => file.endsWith(".js"))) {
                const module = (await import(new URL(`${dir}/${file}`, baseURL))).default;

                for(const component of module) {
                    if(!component || !component.customId) {
                        client.logger.log("warn", `Unable to retrieve an component in '${dir}/${file}' due to its incorrect structure.`);

                        continue;
                    }

                    if(client.collection.components.has(component.commandId)) {
                        client.logger.log("warn", `Unable to retrieve component '${dir}/${file}#${component.customId}' because a component under its id already exists.`);

                        continue;
                    }

                    client.collection.components.set(component.customId, component);
                }
            }
        }

        client.logger.log("info",`Successfully loaded ${client.collection.components.size} components.`);
    }
}