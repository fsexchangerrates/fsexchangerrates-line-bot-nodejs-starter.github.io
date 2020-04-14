'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
const config = require('./config.json');

const message1 = require('./messagesTemp/message1.json');
const data1 = require('./messagesTemp/data1.json');
const greeting = require('./messagesTemp/greeting.json');
const paypal = require('./messagesTemp/paypal.json');
const webMoney = require('./messagesTemp/webMoney.json');
let richMenuId1 = 'ur46il;-ufki75rrf';
let richMenuId2 = 'jyrsscvgu8oolncsqtthh';

let baseUrl = config.baseUrl;

// create LINE SDK client
const client = new line.Client(config);

const app = express();

app.use(line.middleware(config));
app.use(client.replyMessage());

app.use(baseUrl);

app.get('/webhook', line.middleware(config), (req, res) => {
    console.log('I am listening. Go see post');
});
// webhook callback
app.post('/webhook', line.middleware(config), (req, res) => {
    // req.body.events should be an array of events
    if (!Array.isArray(req.body.events)) {
        return res.status(500).end();
    }
    // handle events separately
    Promise.all(req.body.events.map(event => {
            console.log('event', event);
            // check verify webhook event
            if (event.replyToken === '00000000000000000000000000000000' ||
                event.replyToken === 'ffffffffffffffffffffffffffffffff') {
                return;
            }
            return handleEvent(event);
        }))
        .then(() => res.end())
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

async function linkRichMenuToUser(userId, richMenuId) {
    console.log('linkRichMenuToUser', linkRichMenuToUser);

    return client.linkRichMenuToUser(userId, richMenuId);
};

// simple reply function
const replyText = (token, texts) => {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
        token,
        texts.map((text) => ({ type: 'text', text }))
    );
};
// callback function to handle a single event
function handleEvent(event) {
    switch (event.type) {
        case 'message':
            const message = event.message;
            switch (message.type) {
                case 'text':
                    return handleText(message, event.replyToken);
                case 'image':
                    return handleImage(message, event.replyToken);
                case 'video':
                    return handleVideo(message, event.replyToken);
                case 'audio':
                    return handleAudio(message, event.replyToken);
                case 'location':
                    return handleLocation(message, event.replyToken);
                case 'sticker':
                    return handleSticker(message, event.replyToken);
                default:
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }

        case 'follow':
            return replyText(event.replyToken, 'Got followed event: ' + `${JSON.stringify(greeting)}`);

        case 'unfollow':
            return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

        case 'join':
            return replyText(event.replyToken, `Joined ${event.source.type}`);

        case 'leave':
            return console.log(`Left: ${JSON.stringify(event)}`);

        case 'postback':
            const data = event.postback.data;
            switch (data) {
                case 'next':
                    return linkRichMenuToUser(event.source.userId, `${richMenuId2}`);
                case 'previous':
                    return linkRichMenuToUser(event.source.userId, `${richMenuId1}`);
                case 'data1':
                    return replyText(event.replyToken, data1);
                case 'greeting':
                    return replyText(event.replyToken, `${JSON.stringify(greeting)}`);
                case 'paypal':
                    return replyText(event.replyToken, paypal);
                case 'webMoney':
                    return replyText(event.replyToken, webMoney);
                default:
                    return replyText(event.replyToken, `Got postback: ${data}`);
            }
        case 'beacon':
            const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
            return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}

const temp1 = require('./messagesTemp/temp1.json');

function handleText(message, replyToken) {
    switch (message.text) {
        case 'carousel':
            return client.replyMessage(replyToken, message1);
        case 'confirm':
            return client.replyMessage(replyToken, temp1);
        case 'cancel':
            return client.replyMessage(replyToken, message.text);
    }
    return replyText(replyToken, message.text);
}

function handleImage(message, replyToken) {
    return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
    return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
    return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
    return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
    return replyText(replyToken, 'Got Sticker');
}

const port = config.port;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});