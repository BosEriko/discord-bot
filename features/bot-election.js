exports.botElection = (message, Client, firebase, symbolCommand) => {
    const command = message.cleanContent.split(" ")[0];
    const parameter = message.cleanContent.replace(command + " ", "");
    const database = firebase.database();
    const electionData = database.ref().child('election/' + message.author.id + '/data');
    let electionDataValue;
    electionData.on("value", snap => {
        electionDataValue = snap.exists() ? snap.val() : "No data yet";
    });
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        if (command === (symbolCommand + 'write')) {
            database.ref('election/' + message.author.id).set({
                data: parameter
            })
        }else{
            message.reply(electionDataValue);
        }
    }
};