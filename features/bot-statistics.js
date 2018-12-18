exports.botStatistics = (message, Client, firebase, symbolCommand) => {
    // Firebase Data
    const database = firebase.database();
    const messageCount = database.ref().child('statistics/' + message.author.id + '/message_count');
    let messageCountValue;

    // Logic
    messageCount.on("value", snap => {
        if(!snap.exists()){
            database.ref('statistics/' + message.author.id).set({
                message_count: "0"
            })
        };
        messageCountValue = snap.val();
    });
    database.ref('statistics/' + message.author.id).set({
        message_count: messageCountValue++
    });

    // The Main Stuff
    if (Client.user.id !== message.author.id) {
        if (message.content.startsWith(symbolCommand + 'stats-message')) {
            message.reply(messageCountValue);
        }
    }
};