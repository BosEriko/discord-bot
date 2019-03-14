// tslint:disable: no-any
const modulesPrefix: any = (data: any) => {
    if (data.command) {
        // data.database.ref('guild').child(`${data.message.guild.id}/prefix`).set(data.command);
        data.message.reply(`Prefix has been set to ${data.args[1]}.`);
    } else {
        data.message.reply(`Please specify a prefix.`);
    }
};

module.exports = modulesPrefix;