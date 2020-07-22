const config = require('../config.js');
const moment = require('moment');
const mysql = require('mysql');
const connection = mysql.createConnection(config.database);

exports.run = (message) => {
    /****************************************************
         Add / Update channel and user info in the DB                
    ****************************************************/

    // Pull the discord values to write back to the db
    var guild_id = message.guild.id;
    var prefix = config.bot.prefix;
    var last_message_sent = moment().format();
    var last_user = message.author.id;
    var channel = message.channel.id;

    //Establish a new connection for the command 
    connection.connect(console.log("Connected to MySQL Database in the Activate command."));

    // Set rows as the select statement values.
    var rows = connection.query("SELECT * FROM guilds WHERE guild_id = ?", guild_id);


     //Check if the rows value is 0 and move on
     if (rows.length === 0) {

        /* Insert guild into the database. */
         connection.query("INSERT INTO guilds SET ?", guild_id, prefix, last_message_sent, last_user, channel);
        
            message.channel.send({
                embed: {
                    color: 0x2ecc71, title: "Reading Commands",
                    fields: [{ name: "Reading Commands:", value: `I will now be reading commands from this channel. Type \`p.start\` to start your adventure!` }],
                    timestamp: new Date(), footer: { text: "Current Time Status" }
                }
            });

     } else if (rows.length != 0) {
         connection.query("UPDATE guilds SET guilds.channel = ? WHERE guilds.guild_id = ?", guild_id, prefix, last_message_sent, last_user, channel);
            message.channel.send({
                embed: {
                    color: 0x2ecc71, title: "Channel Changed ",
                    fields: [{ name: "Channel Change:", value: 'You have just changed the channel where reponses will be posted.' }],
                    timestamp: new Date(), footer: { text: "Current Time Status" }
                }
            });

     }else {        
                message.channel.send({
                    embed: {
                        color: 0x2ecc71, title: "Mysql Error",
                        fields: [{ name: "Mysql Error:", value: 'Something has gone wrong please try again later.' }],
                        timestamp: new Date(), footer: { text: "Current Time Status" }
                    }
                });
            }
    
};