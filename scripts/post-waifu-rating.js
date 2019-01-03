exports.botPostWaifuRating = (Axios, message) => {
    Axios.post(process.env.WAIFU_RATING_WEBHOOK, {
        "content": message.content
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}