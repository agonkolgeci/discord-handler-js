import CustomError from "../../structure/errors/CustomError.js";

export default [
    {
        name: "ready",
        once: true,

        /**
         * Handle client connection
         *
         * @param client {ExtendedClient} - The extended client
         * @returns {Promise<void>}
         */
        onEvent: async(client) => {
            client.user.setPresence({
                activities: [{
                    name: "discord-handler-js",
                    type: 3
                }],
                status: "online",
                afk: false
            });

            client.logger.log("success", `Client connected on Discord as @${client.user.globalName || client.user.tag}.`);
        }
    },

    {
        name: "interactionCreate",
        once: false,

        /**
         * Handle all interactions (commands, buttons, modals, selects)
         *
         * @param client {ExtendedClient} - The extended client
         * @param interaction {import("discord.js").Interaction} - The interaction
         * @returns {Promise<void>}
         */
        onEvent: async(client, interaction) => {
            try {
                if(interaction.isCommand()) {
                    await client.collection.commands.get(interaction.commandName)?.onCommand(client, interaction);
                }

                if(interaction.isButton()) {
                    await client.collection.components.get(interaction.customId)?.onButtonInteraction(client, interaction);
                }

                if(interaction.isModalSubmit()) {
                    await client.collection.components.get(interaction.customId)?.onModalSubmitInteraction(client, interaction);
                }

                if(interaction.isAnySelectMenu()) {
                    await client.collection.components.get(interaction.customId)?.onSelectMenuInteraction(client, interaction);
                }
            } catch (exception) {
                if(exception instanceof CustomError) {
                    interaction.reply({
                        content: client.formatter.format("error", exception.message),
                        ephemeral: true
                    });
                } else {
                    client.logger.log("error", `An error occurred while user '${interaction.user}' executed command '${interaction.commandName}' >> ${exception}`);
                }
            }
        }
    }
]