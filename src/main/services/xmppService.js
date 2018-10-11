import { Client, xml } from '@xmpp/client'
import colors from 'colors/safe'

export const createXmppClient = (credentials, stancaHandler) => {
  const client = new Client()
  const { domain, username, password } = credentials

  client.start(`xmpp://${domain}`)

  client.on('error', err => {
    console.error(colors.red(err.toString()))
  })

  client.on('status', (_, value) => {
    console.log(colors.blue(value ? value.toString() : ''))
  })

  client.on('online', jid => {
    console.log(colors.green('online as', jid.toString()))
    client.send(xml('presence', { from: jid.toString() }), xml('show', {}, 'chat'))
  })

  client.on('stanza', stanza => {
    stancaHandler(stanza)
  })

  client.handle('authenticate', authenticate => {
    return authenticate(username, password)
  })

  return client
}
