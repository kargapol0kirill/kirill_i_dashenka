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
            senderName : 'Bob',
            messageText : 'What are u duing here&',
            createAt: "2021-01-14",
            avatar: 'https://gamerbay.ru/wp-content/uploads/2021/01/judyalvarez.jpg'
        },
        {
            messageid : '2',
            userid : '2',
            senderName : 'Grob',
            messageText : 'Fuck u',
            createAt: "2021-02-15",
            avatar: 'https://modslab.net/files/mods/cyberpunk_2077/9sr95k3RSE/img1.jpg'
        }

    ]
})



module.exports = (io, socket) => {

}