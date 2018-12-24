exports.botPost = (message, Client, Axios) => {
    if (message.channel.name === 'rabbit-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.RABBIT_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
    if (message.channel.name === 'announcements-post' && Client.user.id !== message.author.id) {
        Axios.post(process.env.ANNOUNCEMENTS_WEBHOOK, {
            "content": message.content
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }
}