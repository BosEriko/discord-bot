// tslint:disable: no-any
const modulesWebhooksAnnouncements: any = (data: any) => {
    data.axios.post(process.env.WEBHOOK_ANNOUNCEMENTS, {
        "content": data.message.content
    })
        .then((response: any) => {
            console.log(response);
        })
        .catch((error: any) => {
            console.log(error);
        });
};

module.exports = modulesWebhooksAnnouncements;