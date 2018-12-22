exports.botReputation = (message, Client, firebase, symbolCommand) => {
    const userAccountRef = database.ref().child('user_account/' + (message.author.id + process.env.FIREBASE_ACCOUNT_EMAIL));
    userAccountRef.once('value').then(snap => {
        database.ref('user_account/' + (message.author.id + process.env.FIREBASE_ACCOUNT_EMAIL)).set({
            nickname: "test"
        });
    });
};