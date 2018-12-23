exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    const currentName = message.member.nickname === null ? message.author.username + " (Default)" : message.member.nickname;
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    userAccountRef.set({
        nicknames: [currentName]
    });
    userAccountRef.child('nicknames').once('value').then(snap => {
        console.log(snap.val());
    });
};