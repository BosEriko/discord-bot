exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    const currentName = message.member.nickname === null ? message.author.username + " (Default)" : message.member.nickname;
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    userAccountRef.child('nicknames').once('value').then(snap => {
        if (!snap.exists()) {
            userAccountRef.set({
                nicknames: [currentName]
            });
        } else {
            if (currentName !== snap.val()[snap.val().length - 1]) {
                userAccountRef.set({
                    nicknames: snap.val().push(currentName)
                });
            }
            if (snap.val().length > 10) {
                userAccountRef.set({
                    nicknames: snap.val().shift()
                });
            }
        }
    });
};