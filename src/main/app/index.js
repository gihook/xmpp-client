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
    client.send(xml('presence'))
  })

  client.on('stanza', stanza => {
    console.log(colors.yellow(stanza.toString()))

    if (!stanza.is('message')) return

    const from = stanza.attrs.from.split('/')[0]
    const message = stanza.getChild('body').text()
    mainWindow.webContents.send('receive-message', { from, message })
  })

  client.handle('authenticate', authenticate => {
    return authenticate(username, password)
  })

  return client
}

export default {
  main: mainFunction
}
