exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    console.log("MESSAGE AUTHOR: ", (message.member.nickname === null ? "No nick" : message.member.nickname));
    // const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    // userAccountRef.once('value').then(snap => {
    //     userAccountRef.set({
    //         nickname: "NEW TEST"
    //     });
    // });
};