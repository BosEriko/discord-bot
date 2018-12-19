exports.botStats = (message, Client, firebase, symbolCommand) => {
    // Firebase Data
    const database = firebase.database();
    const statsData = database.ref().child('stats/' + message.author.id + '/data');
    let statsDataMessage;
    statsData.once('value').then(snap => {
        statsDataMessage = snap.exists() ? snap.val() : 0;
        console.log(statsDataMessage);
        database.ref('stats/' + message.author.id).set({
            message_count: statsDataMessage + 1
        });
    });

    // The Main Stuff
    if (Client.user.id !== message.author.id) {
        if (message.content.startsWith(symbolCommand + 'st-message')) {
            message.reply(statsDataMessage);
        }
    }
};