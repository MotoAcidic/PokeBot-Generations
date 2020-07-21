const config = require('../config.js');
var curretDate = new Date();
var timeStamp = curretDate.toLocaleString();

module.exports = {
    command_start: function () {
        let commandStatus = false;
        let cancelled = true;
        if (await printTransactionIfTrue(message, " before trying to begin a new adventure.") === false) {
            let exists = await userExists(message.author.id);
            if (!exists) {
                transactions[transactions.length] = new Transaction(message.author.id, "creating your adventure");
                let awaitingUserInput = true;
                /* Lets the user pick their region and starter Pokemon, and populates the user's bag with starting items. */
                while (awaitingUserInput) {
                    let region = await selectRegion(message);
                    let starter = await selectStarter(message, region);
                    if (starter != null) {
                        cancelled = false;
                    }
                    awaitingUserInput = await createNewUser(message.author.id, starter, message, region);
                    if (awaitingUserInput) {
                        cancelled = false;
                        awaitingUserInput = false;
                        commandStatus = await sendMessage(message.channel, (message.author.username + " has started their Pokémon adventure with a " + starter + "! Since you chose to begin in the " + region + " region, you will find yourself in " + getDefaultLocationOfRegion(region) + ". Use the `goto <location_name>` command to move to another location within the region, provided you have a Pokémon strong enough to protect you."));
                    } else if (!cancelled) {
                        commandStatus = await sendMessage(message.channel, "Sorry, something went wrong! I was unable to begin your adventure, please try again.");
                    }
                }
                removeTransaction(message.author.id);
                /* If user decided to cancel (likely because they didn't like their starter Pokemon, or because they timed out). */
                if (cancelled) {
                    commandStatus = await sendMessage(message.channel, (message.author.username + " has decided to cancel their region selection. Begin your adventure another time when you are ready."));
                }
            } else {
                commandStatus = await sendMessage(message.channel, (message.author.username + " already has an adventure in progress."));
            }
        }

        return new Promise(function (resolve) {
            resolve(commandStatus);
        });
};