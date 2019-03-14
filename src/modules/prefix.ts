// tslint:disable: no-any
const modulesPrefix: any = (data: any) => {
    data.database.ref('guild').child(`${data.message.guild.id}/prefix`).set(data.command);
    data.message.reply(`Prefix has been set to ${data.command}.`);
};

module.exports = modulesPrefix;