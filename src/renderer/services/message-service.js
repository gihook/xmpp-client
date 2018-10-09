import { ipcRenderer } from 'electron'

export const sendPrivateMessage = (data) => {
  ipcRenderer.send('send-message', data)
}

export const searchForChatRooms = (server) => {
  ipcRenderer.send('search-chatrooms', server)
}

export const privateMessageListener = (listener) => {
  ipcRenderer.on('receive-message', (_, data) => {
    listener(data)
  })
}

export const searchChatRoomsListener = (listener) => {
  ipcRenderer.on('search-chat-rooms', (_, messages) => {
    listener(messages)
  })
}
