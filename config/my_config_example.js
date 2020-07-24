var myconfig = {
    /**
     * Database credentials
     */
    "database": {
        host: "127.0.0.1",
        user: "db-user",
        password: "db-pass",
        database: 'db-name',
        charset: 'utf8mb4'
    },

    /**
     * Discord bot token
     */
    "token": 'discord-key',

    /**
     * true = Pokebot will attach local images from this repository on your computer when possible for messages
     * false = Pokebot will always use image URLs from the online repository for messages
     */
    "useLocalImages": true
};
module.exports = myconfig;