import { Client, Collection, Partials, GatewayIntentBits } from "discord.js";

import logger from "../utils/logger.js";

import { readdirSync } from "fs";

import MessageFormatter from "./messages/MessageFormatter.js";

import commands from "../handlers/Commands.js";
import events from "../handlers/Events.js";
import components from "../handlers/Components.js";

import rest from "../handlers/Rest.js";
import Database from "./remote/Database.js";

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

        this.logger = logger;

        this.readdirSync = readdirSync;
    }

    /**
     * Start the application
     */
    start = async() => {
        this.formatter = new MessageFormatter(this);

        if(this.config.remotes["database"]) this.database = await new Database(this).connect();

        await commands.deploy(this, new URL("../commands/", import.meta.url));
        await events.deploy(this, new URL("../events/", import.meta.url));
        await components.deploy(this, new URL("../components/", import.meta.url));

        await rest.deploy(this, process.env["CLIENT_TOKEN"], process.env["CLIENT_ID"]);

        await this.login(process.env["CLIENT_TOKEN"]);
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