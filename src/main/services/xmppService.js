import { Client, xml } from '@xmpp/client'
import colors from 'colors/safe'
import { getStanzaCode } from './stanzaService'

export const createXmppClient = (credentials, mainWindow) => {
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
    // console.log(colors.yellow(stanza.toString()))
    // console.log(JSON.stringify(stanza, null, 2))
    console.log(colors.cyan(getStanzaCode(stanza)))

    if (stanza.is('message')) {
      if (stanza.attrs.type !== 'chat') return
      const from = stanza.attrs.from.split('/')[0]
      const body = stanza.getChild('body')
      if (!body) return
      const message = body.text()
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
