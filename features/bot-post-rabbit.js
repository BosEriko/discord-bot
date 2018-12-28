exports.botPostRabbit = (message, Axios) => {
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