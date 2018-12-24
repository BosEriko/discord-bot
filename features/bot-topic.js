exports.botTopic = (message, Client, symbolCommand, firebaseDatabase) => {
    const now = new Date()
    const start = new Date(now.getFullYear(), 0, 0)
    const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000)
    const oneDay = 1000 * 60 * 60 * 24
    const day = Math.floor(diff / oneDay)
    if (message.channel.id === '510302403031990274' && Client.user.id !== message.author.id) {
        if (message.content.startsWith(symbolCommand + 'topic')) {
            firebaseDatabase.child('fun_data/topic_of_the_day').once('value').then(snap => {
                let topicOfTheDay = snap.val()
                message.reply(topicOfTheDay[day % topicOfTheDay.length])
            })
        }
    }
}