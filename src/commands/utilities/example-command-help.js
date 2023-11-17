import {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} from "discord.js";

export default [
    {
        structure:
            new SlashCommandBuilder()
                .setName("help")
                .setDescription("Learn more about discord-handler-js."),

        /**
         *
         * @param client {ExtendedClient} - The extended client
         * @param interaction {import("discord.js").CommandInteraction} - The command interaction
         * @returns {Promise<void>}
         */
        onCommand: async(client, interaction) => {
            const project = client.config["project"];

            const exampleButton = new ButtonBuilder().setStyle(ButtonStyle.Link).setLabel("Check GitHub Repository").setURL(project["url"]);

            await interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle("discord-handler-js")
                        .setDescription(project["description"])
                        .setURL(project["url"])
                        .setColor("#263040")
                        .addFields(
                            { name: "Author(s)", value: project["authors"].join("\n"), inline: true },
                            { name: "Version", value: project["version"], inline: true }
                        )
                ],
                components: [ new ActionRowBuilder().addComponents(exampleButton) ]
            })
        }
    }
]