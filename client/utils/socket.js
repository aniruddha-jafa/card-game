import { io } from 'socket.io-client'

const URL = 'http://localhost:4060'
const socket = io(URL, { autoConnect: false })

//** catch-all listener  */
socket.onAny((event, ...args) => {
    console.log('Catch all listener: ', event, args)
})

export default socket
