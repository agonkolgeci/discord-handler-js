module.exports = class Command {
    constructor(Data) {
        this.Name = Data.name;
        this.Usage = Data.usage || Data.name;
        this.Description = Data.description;

        this.Category = Data.category;
        this.Aliases = Data.aliases || [];

        this.Permission = Data.permission;
    }
}