module.exports = class Events {
    /**
     * Definied the client.
     * @param {Client} Client - Represents the Discord Client.
     */
    constructor(Client) {
        this.Client = Client;
    }

    /**
     * Load all evebts in the events folder.
     * @param {String} Path - Represents the events folder path in root.
     */
    load(Path) {
        const Files = this.Client.ReaddirSync(this.Client.Join(process.cwd(), Path));
        for(const FileName of Files) {
            try {
                const FileData = {
                    name: FileName.split('.')[0],
                    file: require(this.Client.Join(process.cwd(), `${Path}/${FileName}`))
                }

                this.Client.on(FileData.name, FileData.file.bind(null, this.Client));
                delete require.cache[require.resolve(this.Client.Join(process.cwd(), Path, FileName))]
            } catch (error) { throw new Error(error); }
        }
    }
}