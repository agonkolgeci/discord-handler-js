import { Client, Collection, Partials, GatewayIntentBits } from "discord.js";

import logger from "../utils/logger.js";

import MessageFormatter from "./messages/MessageFormatter.js";

import mongoose from "../handlers/mongoose.js";
import commands from "../handlers/commands.js";
import events from "../handlers/events.js";
import components from "../handlers/components.js";
import rest from "../handlers/rest.js";

export default class ExtendedClient extends Client {
    collection = {
        commands: new Collection(),
        events: new Collection(),
        components: new Collection()
    };

    applicationCommands = [];

    constructor(config) {
        super({
            intents: [Object.keys(GatewayIntentBits)],
            partials: [Object.keys(Partials)],
            presence: {
                activities: [{
                    name: "intercepting Star Link satellites...",
                    type: 0
                }],
                status: "idle",
                afk: true
            }
        });

        this.config = config;
    }

    /**
     * Start the application
     *
     * @param token {string} - The application Token
     * @param id - The application ID
     * @returns {Promise<void>}
     */
    start = async(token, id) => {
        this.formatter = new MessageFormatter(this);

        if(this.config.remotes["mongodb"]) await mongoose.connect(this, process.env["MONGO_DB_URI"])
        await commands.deploy(this, new URL("../commands/", import.meta.url));
        await events.deploy(this, new URL("../events/", import.meta.url));
        await components.deploy(this, new URL("../components/", import.meta.url));

        await rest.deploy(this, token, id);

        await this.login(token);
    }

    /**
     * Shutdown application when receive critical exception
     *
     * @param message {string} - The additional message
     * @param exception {Error} - The critical exception
     * @returns {Promise<void>}
     */
    shutdown = (message, exception) => {
        logger.log("error", message);
        console.error(exception);

        process.exit();
    }
}