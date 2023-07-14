export default html => {
  const toc = []
  const titleMatches = html.match(/<h.*?<\/h.>/igms)
  titleMatches.forEach(match => {
    toc.push(
      {
        'level': parseInt(match.match(/(<\/?h)([0-6])/g)[0].charAt(2)),
        'text': match.match(/<\/a>(.*?)<\/h.>/g)[0].replace(/(<([^>]+)>)/ig, ''),
        'id': match.match(/id="([^"]+)/g)[0].replace('id="', ''),
      }
    )
  })

  return toc
}