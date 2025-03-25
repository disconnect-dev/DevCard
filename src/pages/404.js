import { id } from "../config.js";
import { BasePage } from "../struct/base/BasePage.js";
import { getInfo, getNickname } from "../struct/helpers/Utils.js";

export default class MainPage extends BasePage {
    constructor() {
        super('/404', async (req, res) => {
            const userData = (await getInfo(id)).discord_user

            res.status(404).render('404', {
                name: getNickname(userData),
            }); 
        })
    }
}