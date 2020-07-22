const { MessageEmbed, splitMessage } = require("discord.js");
const config = require('../config.js');
const mysql = require('mysql');
const con = mysql.createConnection(config.database);

exports.run = (client, message, args) => {
    /****************************************************
    *             Add new channel to DB                 *
    ****************************************************/

    //Start the DB connection to write back the channels ID
    con.beginTransaction(async function (err) {
        if (err) { console.error(err); }

        /** Only allow some commands if a user is evolving one of their Pokemon. */
        //if (await checkIfUserIsEvolving(message, command, input)) return;

        let wasTheChannelSet = true;
        let rows = doQuery("SELECT * FROM guilds WHERE guild_id = ?", [message.guild.id]);
        if (rows === null) {
            wasTheChannelSet = false;
            /* If guild doesn't exist in the database. */
        } else if (rows.length === 0) {
            let guild = {
                guild_id: message.guild.id,
                prefix: client.config.bot.prefix,
                last_message_sent: moment().format(),
                last_user: message.author.id,
                channel: message.channel.id
            }
            /* Insert guild into the database. */
            if (doQuery("INSERT INTO guilds SET ?", [guild])) {
                wasTheChannelSet = await sendMessage(message.channel, `I will now be reading commands from this channel. Type \`!pb begin\` to start your adventure!`);
            } else {
                await sendMessage(message.channel, `Whoops, something went wrong! Please try again later.`);
                wasTheChannelSet = false;
            }
            /* If guild is in the database. */
        } else {
            /* Update the channel that the bot will read from for the current guild. */
            if (doQuery("UPDATE guilds SET guilds.channel = ? WHERE guilds.guild_id = ?", [message.channel.id, message.guild.id]) != null) {
                wasTheChannelSet = await sendMessage(message.channel, `I will now be reading commands from this channel.`);
            } else {
                await sendMessage(message.channel, `Whoops, something went wrong! Please try again later.`);
                wasTheChannelSet = false;
            }
        }

        return new Promise(function (resolve) {
            resolve(wasTheChannelSet);
        });

    }),

};