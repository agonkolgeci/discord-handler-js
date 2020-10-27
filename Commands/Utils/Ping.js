const Command = require('../../Structure/Command');

class CommandPing extends Command {
    constructor() {
        super({
            name: 'ping',
            aliases: ['pong'],
            description: "See the latency of bot and the api latency.",
            category: 'Utils',
        });
    }

    /**
     * Place where the command code will be executed.
     * @param {Client} Client - Represents the Discord Client.
     * @param Ctx - Represents the message and the args.
     * @returns {Promise<void>}
     * @constructor
     */
    Execute(Client, Ctx) {
        Ctx.message.channel.send(`🏓 Latency is \`${Date.now() - Ctx.message.createdTimestamp} ms\`. API Latency is \`${Math.round(Client.ws.ping)} ms\`.`)
    }
}

module.exports = new CommandPing();