import chalk from "chalk";

const types = {
    success: { prefix: chalk.green("[SUCCESS]"), log: console.log },
    info: { prefix: chalk.blue("[INFO]"), log: console.log },
    warn: { prefix: chalk.yellow("[WARNING]"), log: console.warn },
    error: { prefix: chalk.red("[ERROR]"), log: console.error }
}
export default {
    /**
     * @param type {string} - The log type
     * @param message {string} - The message content
     */
    log: (type, message) => {
        const selectedType = types[type.toLowerCase()] || { log: console.log };

        selectedType.log(`${selectedType.prefix || ""} ${message.replace(">>", chalk.red(">>"))}`);
    }
}