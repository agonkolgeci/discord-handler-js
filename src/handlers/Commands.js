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

                for(const command of module) {
                    if(!command || !command.structure?.name) {
                        client.logger.log("warn", `Unable to retrieve a command in '${dir}/${file}' due to its incorrect structure.`);

                        continue;
                    }

                    if(client.collection.commands.has(command.structure.name)) {
                        client.logger.log("warn", `Unable to retrieve command '${dir}/${file}#${command.structure?.name}' because a command under its name already exists.`);

                        continue;
                    }

                    client.collection.commands.set(command.structure.name, command);
                    client.applicationCommands.push(command.structure);
                }
            }
        }

        client.logger.log("info", `Successfully loaded ${client.collection.commands.size} commands.`);
    }
}