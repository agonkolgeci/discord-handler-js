export default class MessageFormatter {
    /**
     * Message formatter for users.
     *
     * @param client {ExtendedClient} - The extended client
     */
    constructor(client) {
        this.client = client;

        this.formatter = client.config.messages["formatter"];
    }

    /**
     * Format any message
     *
     * @param type {string} - The formatter type
     * @param message {string} - The message content
     *
     * @returns {string} - The formatted message
     */
    format(type, message) {
        return this.formatter[type].replace("{message}", message);
    }

    /**
     * Format success message
     *
     * @param message {string} - The message content
     *
     * @returns {string} - The formatted message
     */
    success(message) {
        return this.format("success");
    }

    /**
     * Format info message
     *
     * @param message {string} - The message content
     *
     * @returns {string} - The formatted message
     */
    info(message) {
        return this.format("info");
    }

    /**
     * Format error message
     *
     * @param message {string} - The message content
     *
     * @returns {string} - The formatted message
     */
    error(message) {
        return this.format("error");
    }
}