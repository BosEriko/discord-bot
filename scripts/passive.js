exports.botPassive = (cooldownStorage, firebaseDatabase, message) => {
    // Nickname Change History
    const userAccountRef = firebaseDatabase.child('user_account/' + message.author.id)
    const nicknamesRef = userAccountRef.child('nicknames')
    const currentName = message.author.username !== 'Kuru Anime' ? (message.member.nickname === null ? message.author.username : message.member.nickname) : 'Kuru Anime'
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
    const statisticsRef = firebaseDatabase.child('statistics/' + message.author.id)
    const messageCountRef = statisticsRef.child('message_count')
    messageCountRef.once('value').then(snap => {
        let messageCountData = snap.exists() ? snap.val() : 0
        messageCountRef.set(messageCountData + 1)
    })
    // Passive Earn Money
    const marketRef = firebaseDatabase.child('market/' + message.author.id)
    const balanceEarn = .0001
    const cooldownTimeout = 60000
    const balanceRef = marketRef.child('balance')
    balanceRef.once('value').then(snap => {
        let balanceValueData = snap.exists() ? snap.val() : 0
        if (!cooldownStorage.has(message.author.id)) {
            balanceRef.set(balanceValueData + balanceEarn)
            cooldownStorage.add(message.author.id)
            setTimeout(() => {
                cooldownStorage.delete(message.author.id)
            }, cooldownTimeout)
        }
    })
}