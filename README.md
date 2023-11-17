# discord-handler-js v14 🤖
discord-handler-js is an optimized Discord bot structure that lets you easily create your own Discord Bot.

> ### Further information
> - The discord-handler-js uses [ES6 modules](https://www.google.com/search?q=ES6+modules).
> - The discord-handler-js uses the latest version of [discord.js v^1.14](https://github.com/discordjs/discord.js/releases). 

## Table of contents 📃

- [Requirements](#requirements)
- [Installation](#installation)


- [Application Sharding](#application-sharding)
- [Application Commands](#application-commands):
  - Slash commands
  - User contexts
  - Message contexts
- [Application Components](#application-components):
  - Buttons
  - Modals
  - Select Menus
- [Application Events](#application-events)


- [Custom Logger](#custom-logger)
- [Client Message Formatter](#client-message-formatter)
- [MySQL Database (Optional)](#mysql-database-optional)


- [Credits](#credits)

## Requirements
- [Node.js v^16.9.1](https://nodejs.org/) or newer
- [Discord Application](https://discord.com/developers/docs/getting-started)'s credentials

# Installation
Please read [Requirements](#requirements) before starting installation.

1. **Install this project (2 options):**
   - Using command: [`git clone https://github.com/agonkolgeci/discord-handler-js.git`](https://git-scm.com/downloads)
   - Download [the project ZIP](https://github.com/agonkolgeci/discord-handler-js/archive/refs/heads/master.zip) then extract it


2. **Open the new folder with your favorite text editor**


3. **Configure the following files:**
   - `.env` - Application Credentials
   - `src/resources/config.js` - Client Configuration


4. **Install required packages:**
```shell
npm install
```

5. **Run your bot in normal mode: (otherwise see [sharding mode](#application-sharding))**
```shell
node src/index.js
```

## Application Sharding

To run your application in sharding mode:
```shell
node src/shard.js
```

## Application Commands

### Slash commands / User and Message contexts
You can implement various commands in the same file.

```ts
export default [
    {
        structure: SlashCommandBuilder | ContextMenuCommandBuilder,
      
        onCommand: async(client, interaction) => {
            await interaction.reply(`Command ${interaction.commandName} used by ${interaction.user} !`);
        }
    },

    ... // More commands
]
```

## Application Components

### Buttons / Modals / Selects Menus
You can implement various components in the same file.

```ts
export default [
    {
        customId: string,

        onButtonInteraction: async(client, interaction) => {
            await interaction.reply(`Button ${interaction.customId} used by ${interaction.user} !`);
        },
      
        onModalSubmitInteraction: async(client, interaction) => {
            await interaction.reply(`Modal ${interaction.customId} submited by ${interaction.user} !`);
        },

        onSelectMenuInteraction: async(client, interaction) => {
            await interaction.reply(`Select Menu ${interaction.customId} used by ${interaction.user} !`);
        }
    },

    ... // More components
]
```

## Application Events
You can implement various events in the same file.

Note that you must replace `...args` with the event arguments.

```ts
export default [
    {
        name: string,
        once: true,
      
        onEvent: async(client, ...args) => {
            await client.logger.log("info", `Event ${name} called !`);
        }
    },

    ... // More events
]
```

## Custom Logger
discord-handler-js uses a custom logger system (using colors thanks to [chalk](https://www.npmjs.com/package/chalk)).

> You can configure it from the [Logger Module](src/utils/logger.js)

- Import the Logger Module: `import logger from "path/to/logger.js";`
- or Use from Extended Client: `ExtendedClient#logger`

## Client Message Formatter
discord-handler-js uses a message formatting system intended for users.

> You can configure it from the [Configuration](src/resources/config.js)

- Use from Extended Client `ExtendedClient#formatter`

## MySQL Database (Optional)
discord-handler-js lets you open a connection to a [MySQL database](https://google.com/search?q=MySQL+database).

> You can configure it from the [Configuration](src/resources/config.js)

- Use [MySQL 2 pool](https://www.npmjs.com/package/mysql2#using-connection-pools) from ExtendedClient: `ExtendedClient#database`

## Licence
This project is published under the [GNU General Public License v^3.0](LICENSE). You can download, modify or redistribute - even commercially - this software freely, as long as you specify that your work is a reworking of this project. For more details, please refer to the [license text](LICENSE).

## Credits
- Inspiration from [DiscordJS-V14-Bot-Template](https://github.com/TFAGaming/DiscordJS-V14-Bot-Template)