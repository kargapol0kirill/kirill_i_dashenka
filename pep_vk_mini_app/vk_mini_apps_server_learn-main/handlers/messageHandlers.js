const { nanoid } = require('nanoid')

// настраиваем БД
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
// БД хранится в директории "db" под названием "messages.json"
const adapter = new FileSync('db/messages.json')
const db = low(adapter)

// записываем в БД начальные данные
db.defaults({
    messages: [
      {
        messageId: '1',
        userId: '1',
        senderName: 'Bob',
        messageText: 'What are you doing here?',
        createdAt: '2021-01-14',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxLkbtTa0kfmKizxJgqECQLdlt_xq1R2jEQQ&usqp=CAU'
      },
      {
        messageId: '2',
        userId: '2',
        senderName: 'Alice',
        messageText: 'Go back to work!',
        createdAt: '2021-02-15',
        avatar: 'https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-9-avatar-2754584_120518.png'
      }
    ]
}).write()

module.exports = (io, socket) => {
    console.log('module.exports messages handler')

    // обрабатываем запрос на получение сообщений
    const getMessages = () => {
        console.log('getMessages')

        // получаем сообщения из БД
        const messages = db.get('messages').value()

        console.log(messages)

        // передаем сообщения пользователям, находящимся в комнате
        // синонимы - распространение, вещание, публикация
        io
        //.in(socket.roomId)
        .emit('messages', messages)
    }
    
    // обрабатываем добавление сообщения
    // функция принимает объект сообщения
    const addMessage = (message) => {
        db.get('messages')
        .push({
            // генерируем идентификатор с помощью nanoid, 8 - длина id
            messageId: nanoid(8),
            createdAt: new Date(),
            ...message
        })
        .write()

        // выполняем запрос на получение сообщений
        getMessages()
    }

    // регистрируем обработчики
    socket.on('message:get', getMessages)
    socket.on('message:add', addMessage)
}