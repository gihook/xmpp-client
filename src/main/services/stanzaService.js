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

export const handlerFactory = (stanzaCode) => {
  const split = stanzaCode.split(':')
  const stanzaType = split[0]

  // This is good enough for now; TODO: Make this more functional
  if (stanzaType === 'message') return privateChatHandler
  if (stanzaType === 'iq') return searchRoomsHandler
}
