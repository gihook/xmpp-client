export const getStanzaCode = (stanza) => {
  const { type, from } = stanza.attrs
  const stancaCode = `${stanza.name}:${type || ''}:${(from || '').split('/')[0]}`

  return stancaCode
}

const privateChatHandler = (stanza) => {
  const from = stanza.attrs.from.split('/')[0]
  const body = stanza.getChild('body')
  if (!body) return
  const message = body.text()

  return { from, message }
}

const searchRoomsHandler = (stanza) => {
  const rooms = stanza.children[0].children.map(x => {
    return { address: x.attrs['jid'], name: x.attrs['name'] }
  })

  return rooms
}

const groupChatHandler = (stanza) => {
  const { from } = stanza.attrs
  const subject = stanza.getChild('subject')
  const sender = from.split('/')[1]
  const message = stanza.getChild('body')

  // TODO: Too ugly, refactor
  return { sender, message: message ? message.text() : undefined, subject: subject ? subject.text() : undefined }
}

const groupChatPresenceHandler = (stanza) => {
  const from = stanza.attrs.from.split('/')[1]
  const child = stanza.getChildren('x')[1]
  if (!child) return

  const data = { user: child.getChild('item').attrs.jid, status: child.getChild('status') ? child.getChild('status').attrs.code : undefined, from }
  console.log('--------')
  console.log(data)
  console.log('--------')

  return data
}

export const handlerFactory = (stanzaCode) => {
  const split = stanzaCode.split(':')
  const stanzaType = split[0]
  const type = split[1]

  // This is good enough for now; TODO: Make this more functional
  if (stanzaType === 'message' && type === 'groupchat') return groupChatHandler
  if (stanzaType === 'message') return privateChatHandler
  if (stanzaType === 'iq') return searchRoomsHandler
  if (stanzaType === 'presence') return groupChatPresenceHandler
}
