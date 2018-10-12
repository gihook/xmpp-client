import { ipcMain } from 'electron'
import xml from '@xmpp/xml'
import { createXmppClient } from '../services/xmppService'
import colors from 'colors/safe'
import { getStanzaCode, handlerFactory } from '../services/stanzaService'

let client = null
let eventKeys = []

const mainFunction = function (mainWindow) {
  ipcMain.on('registerClient', (_, credentials) => {
    client = createXmppClient(credentials, (stanza) => {
      const stanzaCode = getStanzaCode(stanza)
      console.log(colors.cyan(stanzaCode))
      console.log(stanza.toString())
      console.log(eventKeys)

      if (!eventKeys.includes(stanzaCode)) return

      const stanzaHandler = handlerFactory(stanzaCode)
      const data = stanzaHandler(stanza)

      // TODO: Too ugly!!!
      if (!data) return

      mainWindow.webContents.send(stanzaCode, data)
    })
  })

  ipcMain.on('registerEventKey', (_, eventKey) => {
    eventKeys = [...eventKeys, eventKey]
  })

  ipcMain.on('send-message', (_, data) => {
    const { to, message } = data
    client.send(
      xml('message', { to, type: 'chat' },
        xml('body', {}, message)
      )
    )
  })

  ipcMain.on('search-chatrooms', (_, data) => {
    const server = data
    client.send(
      xml('iq', { to: server, type: 'get', id: 'search-rooms' },
        xml('query', { xmlns: 'http://jabber.org/protocol/disco#items' })
      )
    )
  })

  ipcMain.on('join-room', (_, data) => {
    console.log('sending presence...')
    const { address } = data
    const xmlStanza = xml('presence', { to: address + '/test-gihhok1', id: 'room-id-nikola' })

    client.send(xmlStanza)
    console.log(xmlStanza)
  })
}

export const main = mainFunction
