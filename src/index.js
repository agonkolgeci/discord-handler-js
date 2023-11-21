/**
 * discord-handler-js v14 - NORMAL MODE
 *
 * discord-handler-js is an optimized Discord bot structure that lets you easily create your own Discord bot.
 * https://github.com/agonkolgeci/discord-handler-js
 */

import ExtendedClient from "./structure/ExtendedClient.js";

import dotenv from "dotenv";
import logger from "./utils/logger.js";
import config from "./resources/config.js";

await dotenv.config();

const client = new ExtendedClient(config);

try {
    await client.start(process.env["CLIENT_TOKEN"], process.env["CLIENT_ID"]);

    logger.log("success", `Successfully started the application in NORMAL mode.`);
} catch (exception) {
    client.shutdown(`An error occurred while connecting to Discord:`, exception);
}

export default client;