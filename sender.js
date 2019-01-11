const dgram = require('dgram');

const WOULD_YOU_LIKE_ME_TO_DROP_BUFFERS = true; // TOGGLE THIS

const PORT = 41234;
const GRAMS = 1000;
const FILL = '##################################################'

function sendgrams() {
    return new Promise((resolve, reject) => {
        let pos = 0;
        const socket = dgram.createSocket('udp4');
        const funkytown = () => {
            if (pos >= GRAMS) {
                socket.close(() => {
                    console.log('Closed.');
                    resolve();
                });
                return;
            }
            socket.send(`${pos++} ${FILL}${FILL}${FILL}${FILL}${FILL}${FILL}${FILL}`, PORT, (error) => {
                if (WOULD_YOU_LIKE_ME_TO_DROP_BUFFERS) {
                    funkytown();
                } else {
                    setTimeout(funkytown, 0);
                }
            });
        }
        funkytown();
    });
}

(async () => {
    try {
        console.log('Sending.')
        await sendgrams();
        await new Promise((resolve, reject) => {}); // poison
    } catch(e) {
        throw(e)
    }
})()
