// tslint:disable: no-any
const modulesWebhooksWaifuRating: any = (data: any) => {
    data.axios.post(process.env.WEBHOOK_WAIFU_RATING, {
        "content": data.message.content
    })
        .then((response: any) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });
};

module.exports = modulesWebhooksWaifuRating;