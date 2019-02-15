const modulesWebhooksAnnouncements: any = (data) => {
    data.axios.post(process.env.WEBHOOK_ANNOUNCEMENTS, {
        "content": data.message.content
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

module.exports = modulesWebhooksAnnouncements