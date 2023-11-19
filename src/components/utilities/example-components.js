export default [
    {
        customId: "example-button",

        /**
         *
         * @param client {ExtendedClient} - The extended client
         * @param interaction {import("discord.js").ButtonInteraction} - The button interaction
         * @returns {Promise<void>}
         */
        onButton: async(client, interaction) => {
            await interaction.reply({
                content: client.formatter.format("success", "The button has been successfully used !"),
                ephemeral: true
            });
        }
    },

    {
        customId: "example-modal",

        /**
         *
         * @param client {ExtendedClient} - The extended client
         * @param interaction {import("discord.js").ModalSubmitInteraction} - The button interaction
         * @returns {Promise<void>}
         */
        onModalSubmit: async(client, interaction) => {
            await interaction.reply({
                content: client.formatter.format("success", "The modal has been successfully submitted !"),
                ephemeral: true
            });
        }
    },

    {
        customId: "example-select_menu",

        /**
         *
         * @param client {ExtendedClient} - The extended client
         * @param interaction {import("discord.js").SelectMenuInteraction} - The button interaction
         * @returns {Promise<void>}
         */
        onSelectMenu: async(client, interaction) => {
            await interaction.reply({
                content: client.formatter.format("success", "The select menu has been successfully used !"),
                ephemeral: true
            });
        }
    }
]