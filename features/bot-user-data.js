exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    userAccountRef.set({
        nickname: message.member.nickname === null ? "No nick" : message.member.nickname
    });
};