const messages = (messageId) => {
    messageId = String(messageId) ? messageId : messageId;
    switch (messageId) {
        case 'messageId1':
            return msg1;
        case 'messageId2':
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
            console.log('messageId', messageId);
            break;
    }
};
module.exports.messages = messages;

const msg1 = {
    type: 'carousel',
    contents: [{
            type: 'bubble',
            size: 'mega'
        },
        {
            type: 'bubble',
            size: 'mega'
        },
        {
            type: 'bubble',
            size: 'mega'
        },
        {
            type: 'bubble',
            size: 'mega'
        },
        {
            type: 'bubble',
            size: 'mega'
        }
    ]
};
module.exports.msg1 = msg1;