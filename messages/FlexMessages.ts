import * as line from '@line/bot-sdk';

import { FlexMessage, 
    FlexBlockStyle,
    FlexBox,
    FlexBubble,
    FlexBubbleStyle,
    FlexButton,
    FlexCarousel,
    FlexContainer,
    FlexComponent,
    FlexImage,
    FlexText,
    FlexSpacer,
    Message,
    MessageEvent,
    EventBase,
    EventMessage,
    MessageCommon,
    ClientConfig,
    Client,
    MiddlewareConfig,
    TextEventMessage
 } from '@line/bot-sdk';
var config = require('./config.json');
const middleware = line.middleware(config);
 
const client = new line.Client(config);
const replyMessage = client.replyMessage;

const FlexMessage = replyMessage