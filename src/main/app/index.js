import { ipcMain } from 'electron'
import xml from '@xmpp/xml'
import { createXmppClient } from '../services/xmppService'

let client = null

const mainFunction = function (mainWindow) {
  ipcMain.on('register', (_, data) => {
    client = createXmppClient(data, mainWindow)
  })

  ipcMain.on('send-message', (sender, data) => {
    const { to, message } = data
    client.send(
      xml('message', { to, type: 'chat' },
        xml('body', {}, message)
      )
    )
  })

  ipcMain.on('search-chatrooms', (sender, data) => {
    const server = data
    client.send(
      xml('iq', { to: server, type: 'get', id: 'test-id-nikola' },
        xml('query', { xmlns: 'http://jabber.org/protocol/disco#items' })
      )
    )
  })

  ipcMain.on('join-room', (sender, data) => {
    console.log('sending presence...')
    const { address } = data
    const xmlStanza = xml('presence', { to: address + '/test-gihhok1', id: 'room-id-nikola' })

    client.send(xmlStanza)
    console.log(xmlStanza)
  })
}

export const main = mainFunction
