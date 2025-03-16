import express from 'express';
import { rateLimit } from 'express-rate-limit';
import { promises as fs } from 'fs';
import { info } from '../helpers/Logs.js';
import { getAvatar, getInfo, getNickname } from '../helpers/Utils.js';
import { github, id, notification, telegram } from '../../config.js'

export class Core {
    constructor() {}

    async registerPages(app) {
        const files = await fs.readdir('./src/app/pages');
        
        for (const file of files) {
            if (!file.endsWith('.js')) continue;
            const PageClass = (await import(`../../app/pages/${file}`)).default;
            const page = new PageClass();
            
            app.use(page.path, (req, res) => page.handler(req, res));
            
            info(`Registered page ${page.path}`);
        }

        for (const folder of files) {
            const folderStats = await fs.stat(`./src/app/pages/` + folder);
            if (folderStats.isDirectory()) {
                const subFiles = await fs.readdir(`./src/app/pages/` + folder);
                for (const file of subFiles) {
                    if (!file.endsWith('.js')) continue;
                    const PageClass = (await import(`../../app/pages/${folder}/${file}`)).default;
                    const page = new PageClass();
                    
                    app.use('/' + folder + page.path, (req, res) => page.handler(req, res));
                    
                    info(`Registered page ${'/' + folder + page.path}`);
                }
            }
        }
    }

    async start() {
        const app = express();
        const port = 3000;

        const limiter = rateLimit({
            windowMs: 60 * 1000, 
            limit: 150,
            standardHeaders: true,
            legacyHeaders: false,
            message: 'Rate limit exceeded',
            skipFailedRequests: true,
        });
        
        app.use(limiter);

        app.use(express.json());
        app.use(express.static('./views'));

        app.set('view engine', 'ejs');

        app.get('/', async (req, res) => {
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
        });

        await this.registerPages(app);
        
        app.use((req, res) => {
            res.redirect('/404')
        });


        app.listen(port, () => {
            info(`Bio start in port ${port}`);
        });
    }
}