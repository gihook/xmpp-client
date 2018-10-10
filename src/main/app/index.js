import { ipcMain } from 'electron'
import { Client } from '@xmpp/client'
import xml from '@xmpp/xml'
import colors from 'colors/safe'

let client = null

const mainFunction = function (mainWindow) {
  ipcMain.on('register', (sender, data) => {
    client = loginToXmpp(data, mainWindow)
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

const loginToXmpp = (credentials, mainWindow) => {
  const client = new Client()
  const { domain, username, password } = credentials

  client.start(`xmpp://${domain}`)

  client.on('error', err => {
    console.error(colors.red(err.toString()))
  })

  client.on('status', (status, value) => {
    console.log(colors.blue(value ? value.toString() : ''))
  })

  client.on('online', jid => {
    console.log(colors.green('online as', jid.toString()))
    client.send(xml('presence', { from: jid.toString() }), xml('show', {}, 'chat'))
  })

  client.on('stanza', stanza => {
    console.log(colors.yellow(stanza.toString()))

    if (stanza.is('message')) {
      if (stanza.attrs.type !== 'chat') return
      const from = stanza.attrs.from.split('/')[0]
      if (!stanza.getChild('body')) return
      const message = stanza.getChild('body').text()
      mainWindow.webContents.send('receive-message', { from, message })
    }

    if (stanza.is('iq') && stanza.attrs.id === 'test-id-nikola') {
      const rooms = stanza.children[0].children.map(x => {
        return { address: x.attrs['jid'], name: x.attrs['name'] }
      })

      mainWindow.webContents.send('search-chat-rooms', rooms)
    }
  })

  client.handle('authenticate', authenticate => {
    return authenticate(username, password)
  })

  return client
}

export const main = mainFunction
