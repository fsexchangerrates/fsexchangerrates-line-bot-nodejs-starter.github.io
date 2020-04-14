import greeting from './messagesTemp/greeting.json';

const messages = (type?: string) => {
    switch (type) {
        case 'greeting':
            return greeting;
        case 'carousel':
           break;
        case 'messageId3':
            break;
        case 'messageId4':
            break;
        case 'messageId5':
            break;
        case 'messageId6':
            break;
        case 'messageId7':
            break;
        case 'messageId8':
            break;
        case 'messageId9':
            break;
        case 'messageId10':
            break;
        default:
            console.log('type', type);
            break;
    }
};
const _messages = messages;
export { _messages as messages };

import paypal from './messagesTemp/paypal.json';
const texts = (text?: any) => {
    return text = paypal;
}
const _texts = texts;
export { _texts as texts };