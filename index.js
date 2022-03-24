//создаем хттп сервер
const server=require('http').createServer()

//подключаемся к серверу сокет ио
const io=require('socket.io')(server, {
cors: 
    {
        origin: "*"
    }
})

const log = console.log

//получаем обработчикa событий
const registerMessageHandlers = require('./handlers/messageHandlers')
const registerUserHandlers = require('./handlers/userHandlers')



const onConnection = (socket) => {
    //выводим сообщение о подлючении пользователя
    log('User connection')

    registerMessageHandlers(io, socket)
    registerUserHandlers(io, socket)

    //обработка отключения сокета пользователя
    socket.on('disconnect', () => {
        //выводим сообщение
        log('User disconnect')
    })
}

//обрабатываем подключение
io.on ('connection', onConnection)

//запуск сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    log(`Server ready connect. Port: ${PORT}`)
})