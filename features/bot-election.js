exports.botElection = (message, Client, firebase) => {
    // Election Data
    const electionData = firebase.database().ref().child('election');
    let electionDataValue;
    electionData.on("value", snap => {
        electionDataValue = snap.val();
    });
    if (message.channel.name === 'kuru-election' && Client.user.id !== message.author.id) {
        message.reply(electionDataValue);
    }
};