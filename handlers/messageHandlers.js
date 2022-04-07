const { nanoid } = require('nanoid')

const low = require('lowdb')

const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/messages.json')

const db = low(adapter)



db.defaults({ 

    messages : [
        {
            messageid : '1',
            userid : '1',
            senderName : 'judy',
            messageText : 'What are u doing&',
            createAt: "2021-01-14",
            avatar: 'https://gamerbay.ru/wp-content/uploads/2021/01/judyalvarez.jpg'
        },
        {
            messageid : '2',
            userid : '2',
            senderName : 'Vi',
            messageText : 'Im drink with Takemura',
            createAt: "2021-02-15",
            avatar: 'https://modslab.net/files/mods/cyberpunk_2077/9sr95k3RSE/img1.jpg'
        }

    ]
}).write()





module.exports = (io, socket) => {
    const getMessages = () => {
        const messages = db.get('messages').value()
        io.emit('messages', messages)
    }

    const addMessage = (message) => {
        db.get('messages')
        .push({
            messageId: nanoid(8),
            createdAt: new Date(),
            ...message

        })
    .write()

    getMessages()
    }


socket.on('message:get', getMessages)
socket.on('message:add', addMessage)
}