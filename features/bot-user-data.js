exports.botUserData = (message, firebaseDatabase) => {
    if (message.author.username !== 'Kuru Anime') {
        const currentName = message.member.nickname === null ? message.author.username + " (Default)" : message.member.nickname
        const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id))
        userAccountRef.child('nicknames').once('value').then(snap => {
            if (!snap.exists()) {
                userAccountRef.set({
                    nicknames: [currentName]
                })
            } else {
                let nicknamesArray = snap.val()
                if (currentName !== nicknamesArray[nicknamesArray.length - 1]) {
                    nicknamesArray.push(currentName)
                    userAccountRef.set({
                        nicknames: nicknamesArray
                    })
                }
                if (nicknamesArray.length > 10) {
                    nicknamesArray.shift()
                    userAccountRef.set({
                        nicknames: nicknamesArray
                    })
                }
            }
        })
    }
}