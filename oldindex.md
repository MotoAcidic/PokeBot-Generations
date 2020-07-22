// Copyright 2020 Precision Electric Motor Sales

const fs = require('fs');
const Discord = require('discord.js');
const Enmap = require("enmap");
const config = require('./config.js');
const mysql = require('mysql');
const oak = require('oakdex-pokedex');
const client = new Discord.Client();

client.config = config;
client.commands = new Enmap();
/*******************************************
*  Set some globals to call in other files *
*******************************************/
global.globalClient = client;
global.con = mysql.createConnection(config.database);

/************************
*   MySQL DB Connection *
************************/

con.connect(function (err) {
    if (err) {
        console.log(err);
        process.exit();
    }
    console.log("Connected to MySQL Database.");
});



 client.on("ready", () => {
        client.user.setActivity(`Start | ${config.bot.prefix}`);

        // Log to console the actual path we are starting to scan then start
        // To scan that folder after.
        console.log("PokeBot-Generations Bot Just Started!");

        console.log(`${client.user.username} has loaded correctly and is online!`);
 });

/**
 * Client Events
 */
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
    });
});
//console.log(global.globalHours);
//console.log(global.globalDay);
client.login(config.bot.token);