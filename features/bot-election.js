exports.botElection = (message, Client, firebase, symbolCommand) => {
    // The Command
    const command = message.cleanContent.split(" ")[0];
    // The Parameter
    const parameter = message.cleanContent.replace(command + " ", "");

    // Firebase Data
    const database = firebase.database();
    const electionData = database.ref().child('election/' + message.author.id + '/data');
    var electionDataValue;
    electionData.on("value", snap => {
        electionDataValue = snap.exists() ? snap.val() : "No data yet";
    });

    // The Main Stuff
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        if (command === (symbolCommand + 'write')) {
            database.ref('election/' + message.author.id).set({
                data: parameter
            })
        }else{
            // message.reply(electionDataValue);
            message.reply("Kuru Election is Under Maintenance.");
        }
    }
};