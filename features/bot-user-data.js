exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    console.log("MESSAGE AUTHOR: ", message.author);
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    userAccountRef.set({
        nicknames: message.member.nickname === null ? "No nick" : message.member.nickname
    });
};