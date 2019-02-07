exports.botPostRabbit = (Axios, message) => {
    Axios.post(process.env.RABBIT_WEBHOOK, {
        "content": message.content + " - http://rabbit.kuru-anime.com",
        "embeds": [
            {
                "title": "Rabbit",
                "description": "Watch anime with us!\n\n**Link:** http://rabbit.kuru-anime.com",
                "thumbnail": {
                    "url": "https://i.imgur.com/pyqoFns.png"
                },
                "url": "http://rabbit.kuru-anime.com"
            }
        ]
    })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
}