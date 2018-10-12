import { ipcRenderer } from 'electron'

let registratedEventKeys = []

export const sendPrivateMessage = (data) => {
  ipcRenderer.send('send-message', data)
}

export const sendGroupChatMessage = (data) => {
  ipcRenderer.send('send-groupchat-message', data)
}

export const searchForChatRooms = (server) => {
  const eventKey = `iq:result:${server}`
  registerEventKey(eventKey)
  ipcRenderer.send('search-chatrooms', server)
}

export const groupChatListener = (jid, callback) => {
  const eventKey = `message:groupchat:${jid}`
  registerEventKey(eventKey)
  ipcRenderer.on(eventKey, (_, message) => {
    callback(message)
  })
}

export const privateMessageListener = (jid, listener) => {
  const eventKey = `message:chat:${jid}`
  ipcRenderer.on(eventKey, (_, data) => {
    listener(data)
  })
}

export const searchChatRoomsListener = (serverId, listener) => {
  const eventKey = `iq:result:${serverId}`
  ipcRenderer.on(eventKey, (_, rooms) => {
    listener(rooms)
  })
}

export const joinRoom = (room, callback) => {
  ipcRenderer.send('join-room', room)
  const eventKey = `presence::${room.address}`
  registerEventKey(eventKey)
  ipcRenderer.on(eventKey, (_, user) => {
    callback(user)
  })
}

export const registerEventKey = (eventKey) => {
  if (registratedEventKeys.includes(eventKey)) return

  registratedEventKeys.push(eventKey)
  ipcRenderer.send('registerEventKey', eventKey)
}
