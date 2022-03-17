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

const onConnection = (socket) => {

}

//обрабатываем подключение
io.on ('connection', onConnection)

//запуск сервер
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
    log(`Server ready connect. Port: ${PORT}`)
})