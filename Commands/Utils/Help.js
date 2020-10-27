const Command = require('../../Structure/Command');

class CommandHelp extends Command {
    constructor() {
        super({
            name: 'help',
            usage: 'help [command]',
            description: "View all commands and get command information.",
            category: 'Utils'
        });
    }

    /**
     * Place where the command code will be executed.
     * @param {Client} Client - Represents the Discord Client.
     * @param Ctx - Represents the message and the args.
     * @returns {Promise<void>}
     * @constructor
     */
    async Execute(Client, Ctx) {
        if(Ctx.args[1]) {
            const Command = Client.Commands.find(Command => Command.Aliases.includes(Ctx.args[1])) || Client.Commands.get(Ctx.args[1]);
            if(!Command) return Ctx.message.channel.send(`${Ctx.message.author}, this command doesn't exist.`);
            let Aliases = [ "No aliases." ];
            for(let Aliase of Command.Aliases) {
                Aliases.shift();
                Aliases.push(Aliase);
            }

            Ctx.message.channel.send({
                embed: {
                    title: `Discord'Handler Help - ${Command.Name}`,
                    description: `[»](${Client.Embed.url}) More information in command \`${Command.Name}\`.`,
                    fields: [
                        {
                            name: "Command Name",
                            value: Command.Name,
                            inline: true
                        },
                        {
                            name: "Command Usage",
                            value: Command.Usage,
                            inline: true
                        },
                        {
                            name: "Command Description",
                            value: Command.Description
                        },
                        {
                            name: "Command Category",
                            value: Command.Category,
                            inline: true
                        },

                        {
                            name: "Command Aliases",
                            value: Aliases.join(", "),
                            inline: true
                        }
                    ],
                    thumbnail: {
                        url: Client.user.displayAvatarURL({format: 'png'})
                    },

                    url: Client.Embed.url,
                    color: Client.Embed.color,
                    footer: {
                        text: Client.Embed.footer,
                        icon_url: Client.user.displayAvatarURL({format: 'png'})
                    }
                }
            })
        } else {
            Ctx.message.channel.send({
                embed: {
                    title: "Discord'Handler Help",
                    description: `[»](${Client.Embed.url}) Commands of ${Client.user.username}.\n`+
                        `[»](${Client.Embed.url}) For more information do \`${Client.Prefix}help [commandName]\`.`,
                    fields: [
                        {
                            name: "Utilities commands",
                            value: Client.Commands.filter(Command => Command.Category === 'Utils').map(Command => `\`${Command.Name}\``).join(', ')
                        }
                    ],
                    thumbnail: {
                        url: Client.user.displayAvatarURL({format: 'png'})
                    },

                    url: Client.Embed.url,
                    color: Client.Embed.color,
                    footer: {
                        text: Client.Embed.footer,
                        icon_url: Client.user.displayAvatarURL({format: 'png'})
                    }
                }
            })
        }
    }
}

module.exports = new CommandHelp();