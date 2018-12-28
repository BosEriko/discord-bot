exports.botPassive = (firebaseDatabase, message) => {
    // Nickname Change History
    const currentName = message.author.username !== 'Kuru Anime' ? (message.member.nickname === null ? message.author.username : message.member.nickname) : 'Kuru Anime'
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id))
    const nicknamesRef = userAccountRef.child('nicknames')
    nicknamesRef.once('value').then(snap => {
        if (!snap.exists()) {
            nicknamesRef.set([currentName])
        } else {
            let nicknamesArray = snap.val()
            if (currentName !== nicknamesArray[nicknamesArray.length - 1]) {
                nicknamesArray.push(currentName)
                nicknamesRef.set(nicknamesArray)
            }
            if (nicknamesArray.length > 10) {
                nicknamesArray.shift()
                nicknamesRef.set(nicknamesArray)
            }
        }
    })
}