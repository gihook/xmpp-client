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

export const handlerFactory = (stanzaCode) => {
  const split = stanzaCode.split(':')
  const type = split[0]

  if (type === 'message') return privateChatHandler
}
