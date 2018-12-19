exports.botStats = (message, Client, firebase, symbolCommand) => {
    const database = firebase.database();
    const statsData = database.ref().child('stats/' + message.author.id + '/data/message_count');
    statsData.once('value').then(snap => {
        let statsDataMessage = snap.exists() ? snap.val() : 0;
        database.ref('stats/' + message.author.id + '/data').set({
            message_count: statsDataMessage + 1
        });
    });
    if (Client.user.id !== message.author.id) {
        if (message.content.startsWith(symbolCommand + 'st-message')) {
            statsData.once('value').then(snap => {
                message.reply('There are ' + (snap.exists() ? snap.val() : 0) + ' messages sent by you!');
            })
        }
    }
};