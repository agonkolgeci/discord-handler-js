const { Client, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const Database = require('./Configs/Utils/Database');
const Commands = require('./Structure/Handler/Commands');
const Events = require('./Structure/Handler/Events');

/**
 * Copyright © 2020 Jielos
 * See the LICENSE file.
 */
class Main extends Client {
    constructor() {
        super({disableMentions: "everyone"});

        this.ReaddirSync = readdirSync;
        this.Join = join;

        /**
         * For edit a configuration, please check the file 'Configs/config.json'.
         * Client.Config returns Config.
         * @type {{Token: string, Prefix: string, Embed: {Url: string, Color: string, Footer: string}}}
         */
        this.Config = require('./Configs/config.json');
        this.Functions = require('./Configs/Utils/Functions');
        this.Prefix = this.Config["Prefix"];

        this.Embed = {
            url: this.Config.Embed["Url"],
            color: this.Config.Embed["Color"],
            footer: this.Config.Embed["Footer"]
        }

        try {
            this.Launch().then(() => {
                console.log("• Successful robot launch, connection to Discord...");
            });
        } catch (error) { throw new Error(error); }

        this.login(this.Config["Token"]).then(() => {
            console.log("• Connection to Discord successful!");
        });
    }

    /**
     * Launch all modules in the bot.
     * @returns {Promise<void>}
     * @constructor
     */
    async Launch() {
        this.Commands = new Collection();

        new Commands(this).load('Commands'); // Use a folder name being in the root.
        new Events(this).load('Events'); // Use a folder name being in the root.
        new Database(this).connect(require('./Configs/database.json'));
    }
}

module.exports = new Main();

