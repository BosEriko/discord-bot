exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase) => {
    console.log("MESSAGE AUTHOR: ", message.guild.member(message.author));
    // const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    // userAccountRef.once('value').then(snap => {
    //     userAccountRef.set({
    //         nickname: "NEW TEST"
    //     });
    // });
};