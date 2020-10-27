module.exports = {
    /**
     * Checks if the author has the permissions to execute a command.
     * @param {Command} Command
     * @param {GuildMember} Member
     */
    checkPerms(Command, Member) {
        if(!Command.Permission) return true;
        return Member.hasPermission(Command.Permission);
    },

    /**
     * Sends to the user if the user does not have the required permissions.
     * @param {User} Author - Represents the user where doesn't have permissions.
     * @param {Channel} Channel - Represents the channel where the message will be sent.
     */
    noPermission(Author, Channel) {
        Channel.send(`${Author}, you do not have sufficient permissions.`);
    }
}