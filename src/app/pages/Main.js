import { github, id, notification, telegram } from "../../config.js";
import { BasePage } from "../../struct/base/BasePage.js";
import { getAvatar, getInfo, getNickname } from "../../struct/helpers/Utils.js";

export default class MainPage extends BasePage {
    constructor() {
        super('/main', async (req, res) => {
            const userData = (await getInfo(id)).discord_user

            res.render('index', {
                name: getNickname(userData),
                lastname: userData.username,
                avatar: getAvatar(userData),
                github,
                telegram,
                title: notification.title,
                button: notification.button,
                url: notification.url
            });
        })
    }
}