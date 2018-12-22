exports.botReputation = (message, Client, firebase, symbolCommand) => {
    const database = firebase.database();
    const userAccountRef = database.ref().child('user_account/' + (message.author.id));
    userAccountRef.once('value').then(snap => {
        database.ref('user_account/' + (message.author.id)).set({
            nickname: "test"
        });
    });
};