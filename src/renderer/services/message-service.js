import { ipcRenderer } from 'electron'

export const sendPrivateMessage = (data) => {
  ipcRenderer.send('send-message', data)
}

export const searchForChatRooms = (server) => {
  ipcRenderer.send('search-chatrooms', server)
}

export const privateMessageListener = (jid, listener) => {
  const eventKey = `message:chat:${jid}`
  ipcRenderer.on(eventKey, (_, data) => {
    listener(data)
  })
}

export const searchChatRoomsListener = (listener) => {
  ipcRenderer.on('search-chat-rooms', (_, messages) => {
    listener(messages)
  })
}

export const joinRoom = (room) => {
  ipcRenderer.send('join-room', room)
}
