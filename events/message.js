// Copyright PokeBot-Generation 2020

const mysql = require('mysql');
const config = require('../config.js');

module.exports = (client, message) => {
    // Ignore all bots and prevent endless looping of bot talk
    if (message.author.bot) return

    // If in trade just return
    if (isInTrade(message.author.id) != null) return;

    //Start the DB connection to write back the channels ID
        con.beginTransaction(async function (err) {
            if (err) { console.error(err); }

            /** Only allow some commands if a user is evolving one of their Pokemon. */
            if (await checkIfUserIsEvolving(message, command, input)) return;
    

            // Ignore messages not starting with the prefix (in config.js)
            if (message.content.indexOf(client.config.bot.prefix) !== 0) return;

            // Set channel if p.activate is sent to a new channel
            //if (message.content.trim() === `p.activate`) await setBotChannel(message);
            //const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g);
            const args = message.content.slice(client.config.bot.prefix.length + 'activate').trim().split(/ +/g); await setBotChannel(message);

            /** The command is the first word in the message, not including the prefix. */
            const command = input.shift().toLowerCase();

            // Grab the command data from the client.commands Enmap
            const cmd = client.commands.get(command);

            // If that command doesn't exist, silently exit and do nothing
            if (!cmd) return;

            let exists = await userExists(message.author.id);
            if (exists && (isInEvolution(message.author.id) === null) && (isInTransaction(message.author.id) === null)) {
                await doNonCommandMessage(message);
            }
        });
    // Run the command
    cmd.run(client, message, args);  
};