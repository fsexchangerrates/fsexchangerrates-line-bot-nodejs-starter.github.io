import greeting from './messagesTemp/greeting.json';
import paypal from './messagesTemp/paypal.json';

const messages = (texts?: string) => {
    switch (texts) {
        case 'greeting':
            return  greeting;
        case 'paypal':
           return paypal;
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
            console.log('texts', texts);
            return texts;
            
    }
};
const _messages = messages;
export { _messages as messages };
