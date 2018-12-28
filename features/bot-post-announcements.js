exports.botPostAnnouncements = (message, Axios) => {
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