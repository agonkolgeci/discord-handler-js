export default class CustomError extends Error {
    /**
     * Custom Error
     *
     * @param message {string} - The error message
     */
    constructor(message) {
        super(message);
    }
}