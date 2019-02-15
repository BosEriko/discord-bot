const modulesWebhooksWaifuRating: any = (data: any) => {
    data.axios.post(process.env.WEBHOOK_WAIFU_RATING, {
        "content": data.message.content
    })
        .then(function (response: any) {
            console.log(response)
        })
        .catch(function (error: any) {
            console.log(error)
        })
}

module.exports = modulesWebhooksWaifuRating