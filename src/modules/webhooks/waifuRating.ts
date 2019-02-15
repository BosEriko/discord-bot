const modulesWebhooksWaifuRating: any = (data) => {
    data.axios.post(process.env.WEBHOOK_WAIFU_RATING, {
        "content": data.message.content
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}

module.exports = modulesWebhooksWaifuRating