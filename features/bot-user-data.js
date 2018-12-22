exports.botUserData = (message, Client, firebase, symbolCommand, firebaseDatabase, Discord) => {
    const user = new Discord.User(message.author);
    console.log("MESSAGE AUTHOR: ", user.tag);
    // const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id));
    // userAccountRef.once('value').then(snap => {
    //     userAccountRef.set({
    //         nickname: "NEW TEST"
    //     });
    // });
};