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
      // console.log(colors.yellow(stanza.toString()))
      // console.log(JSON.stringify(stanza, null, 2))
      const stanzaCode = getStanzaCode(stanza)
      console.log(colors.cyan(stanzaCode))

      if (eventKeys.indexOf(stanzaCode) === -1) return

      console.log('passed', stanzaCode)
      console.log(eventKeys)
      const stanzaHandler = handlerFactory(stanzaCode)
      mainWindow.webContents.send(stanzaCode, stanzaHandler(stanza))
      // if (stanza.is('message')) {
      //   if (stanza.attrs.type !== 'chat') return
      //   const from = stanza.attrs.from.split('/')[0]
      //   const body = stanza.getChild('body')
      //   if (!body) return
      //   const message = body.text()
      //   mainWindow.webContents.send('receive-message', { from, message })
      // }

      // if (stanza.is('iq') && stanza.attrs.id === 'test-id-nikola') {
      //   const rooms = stanza.children[0].children.map(x => {
      //     return { address: x.attrs['jid'], name: x.attrs['name'] }
      //   })

      //   mainWindow.webContents.send('search-chat-rooms', rooms)
      // }
    })
  })

  ipcMain.on('registerEventKey', (_, eventKey) => {
    console.log(colors.bgYellow(eventKey))
    eventKeys = [...eventKeys, eventKey]
    console.log(colors.bgYellow(eventKeys))
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
      xml('iq', { to: server, type: 'get', id: 'test-id-nikola' },
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
