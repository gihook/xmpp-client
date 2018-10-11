export const getStanzaCode = (stanza) => {
  const { type, from } = stanza.attrs
  const stancaCode = `${stanza.name}:${type || ''}:${(from || '').split('/')[0]}`

  return stancaCode
}
