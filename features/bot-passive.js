exports.botPassive = (firebaseDatabase, message) => {
    const userAccountRef = firebaseDatabase.child('user_account/' + (message.author.id))
    const statisticsRef = firebaseDatabase.child('statistics/' + (message.author.id))
    const currentName = message.author.username !== 'Kuru Anime' ? (message.member.nickname === null ? message.author.username : message.member.nickname) : 'Kuru Anime'
    // Nickname Change History
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
    // Message Count
    const messageCountRef = statisticsRef.child('message_count')
    messageCountRef.once('value').then(snap => {
        let messageCountData = snap.exists() ? snap.val() : 0
        messageCountRef.set(messageCountData + 1)
    })
}