module.exports = class Commands {
    /**
     * Definied the client.
     * @param {Client} Client - Represents the Discord Client.
     */
    constructor(Client) {
        this.Client = Client;
    }

    /**
     * Load all commands in the commands folder.
     * @param {String} Path - Represents the commands folder path in root.
     */
    load(Path) {
        const Dirs = this.Client.ReaddirSync(this.Client.Join(process.cwd(), Path));
        for(const DirName of Dirs) {
            const Files = this.Client.ReaddirSync(this.Client.Join(process.cwd(), `${Path}/${DirName}`));
            for(const FileName of Files) {
                const FileData = require(this.Client.Join(process.cwd(), `${Path}/${DirName}/${FileName}`));
                this.Client.Commands.set(FileData.Name, FileData);
                delete require.cache[require.resolve(this.Client.Join(process.cwd(), `${Path}/${DirName}`, FileName))];
            }
        }
    }
}