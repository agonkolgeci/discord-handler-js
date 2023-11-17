export default {
    project: {
        title: "discord-handler-js",
        description: "discord-handler-js is an optimized Discord bot structure that lets you easily create your own Discord bot.",
        authors: [ "Agon KOLGECI" ],

        url: "https://github.com/agonkolgeci/discord-handler-js",
        version: "v14"
    },

    messages: {
        formatter: {
            success: "✅ {message}",
            info: "\uD83D\uDCCC {message}",
            error: "❌ {message}"
        }
    },

    remotes: {
        database: {
            "host": "DATABASE_HOST",
            "database": "DATABASE_NAME",
            "user": "USERNAME",
            "password": "PASSWORD",
            "charset": "utf8mb4",
            "port": 3306
        }
    }
}