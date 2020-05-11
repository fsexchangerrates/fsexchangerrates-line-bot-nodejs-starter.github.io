import express from 'express';
import * as line from '@line/bot-sdk';
import { appendFile } from 'fs';
import { stringify } from 'querystring';
import { Request, Response } from '@line/bot-sdk/dist/middleware';

const config = {
        channelSecret: process.env.channelSecret,
        channelAccessToken: process.env.channelAccessToken
};
const port = process.env.port || 3000;
const baseUrl = process.env.baseUrl;
const richMenuId_1 = 'fffffffffff';
const richMenuId_2 = 'ggggggggggg';

/**
 * @param {Object} app
 */
export class App
{
        static PORT = port;

        public app = express();
        public middlewareConfig = config;
        public middleware = line.middleware;
        public client: line.Client;

        public constructor(
                client: line.Client
        ) {
                this.app = express();
                this.middlewareConfig = config;
                this.middleware = line.middleware;
                this.client = new line.Client(config);
                this.app.listen(App.PORT, () => {
                        console.log('listening on port: ' + `${App.PORT}`);
                });
                this.app.post('/webhook', this.middleware(this.middlewareConfig), (req: Request, res: Response) => {
                        Promise.all(req.body.events.map(event => {
                                console.log('event', event);
                                 return this.handleEvent(event);
                        })).then((result) => res.end(result))
                        .catch((error) => {
                                throw new console.error(error);
                        });
                });
        }

        /**
         *  @param string userId 
         * */
        getProfile(userId: string) {
                return this.client.getProfile(userId);
        }

        /**
         * 
         * @param userId 
         * @param richMenuId 
         */
        linkRichMenu(userId: string, richMenuId: string ) {
                return this.client.linkRichMenuToUser(userId, richMenuId);
        }

        /**
         * 
         * @param event 
         */
        handleEvent(event) {
                if (event.replyToken && event.replyToken.match(/^(\*)/i)) {
                        return console.log( 'Message sent from replyToken: ' + event.replyToken, `${JSON.stringify(event.message)}`);
                }
                switch (event.type) {
                        case 'message':
                                const message: any = event.message;
                                switch (message.type) {
                                        case 'text':
                                                return this.client.replyMessage(event.replyToken, message );
                                }
                        case 'postback':
                                const data: string = event.postback.data;
                                switch (data) {
                                        case 'previous':
                                                return this.linkRichMenu(event.source.userId, `${richMenuId_1}`);
                                        case 'nextmenu':
                                                return this.linkRichMenu(event.source.userId, `${richMenuId_2}`);
                                }
                }
        }
}