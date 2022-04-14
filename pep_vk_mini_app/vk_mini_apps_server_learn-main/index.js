const fs = require( 'fs' )

var options = {
    key: fs.readFileSync('./privatekey.key'),
    cert: fs.readFileSync('./certificate.crt')
}

// создаем HTTP-сервер
const server = require('https').createServer(options)

// подключаем к серверу Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

const log = console.log

// получаем обработчики событий
const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')
const raceHandlers = require('./handlers/raceHandlers')

// данная функция выполняется при подключении каждого сокета 
// (обычно, один клиент = один сокет)
const onConnection = (socket) => {
    // выводим сообщение о подключении пользователя
    log('User connected')

    /*socket.on('join', function(join) {
        log('User join')
        log(join)
        socket.roomId = join.roomId
        // присоединяемся к комнате (входим в нее)
        socket.join(join.roomId)
    })

    socket.on('leave', function(leave) {
        // выводим сообщение
        log('User leave')
        log(leave)
        // покидаем комнату
        socket.leave(leave.roomId)
    })*/

    // регистрируем обработчики
    // обратите внимание на передаваемые аргументы
    registerMessageHandlers(io, socket)
    registerUserHandlers(io, socket)
    raceHandlers(io, socket)

    // обрабатываем отключение сокета-пользователя
    socket.on('disconnect', function() {
        // выводим сообщение
        log('User disconnected')
        // покидаем комнату
        socket.leave(socket.roomId)
    })
}

// обрабатываем подключение
io.on('connection', onConnection)

// запускаем сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    log(`Server ready connect. Port: ${PORT}`)
})