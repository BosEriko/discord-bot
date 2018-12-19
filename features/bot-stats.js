exports.botStats = (message, Client, firebase, symbolCommand) => {
    // Firebase Data
    const database = firebase.database();
    const statsData = database.ref().child('stats/' + message.author.id + '/data/message_count');
    statsData.once('value').then(snap => {
        let statsDataMessage = snap.exists() ? snap.val() : 0;
        database.ref('stats/' + message.author.id + '/data').set({
            message_count: statsDataMessage + 1
        });
    });
    const statsDataMessageShow = () => {
        statsData.once('value').then(snap => {
            return snap.exists() ? snap.val() : 0;
        }
    }

    // The Main Stuff
    if (Client.user.id !== message.author.id) {
        if (message.content.startsWith(symbolCommand + 'st-message')) {
            message.reply(statsDataMessageShow());
        }
    }
};