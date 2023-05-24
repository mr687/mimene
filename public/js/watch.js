const getCurrentPlayerFromKey = () => {
	const { host, pathname, search } = new URL(document.URL)
  const playerjsFromKey = `pljsplayfrom_player${host}${pathname}${search}`
	return playerjsFromKey
}

const currentPlayerjsSessionString = document.querySelector('input[name="playerjsSession"').value
if (currentPlayerjsSessionString) {
	const currentPlayerjsSession = JSON.parse(currentPlayerjsSessionString)
	const playerjsFromKey = getCurrentPlayerFromKey()
	if (currentPlayerjsSession[playerjsFromKey]) {
		window.localStorage.setItem(playerjsFromKey, currentPlayerjsSession[playerjsFromKey])
	}

	if (currentPlayerjsSession.pljsuserid) {
		window.localStorage.setItem('pljsuserid', currentPlayerjsSession.pljsuserid)
	}

	if (currentPlayerjsSession.pljsvolume) {
		window.localStorage.setItem('pljsvolume', currentPlayerjsSession.pljsvolume)
	}

	if (currentPlayerjsSession.pljsmute) {
		window.localStorage.setItem('pljsmute', currentPlayerjsSession.pljsmute)
	}
}

function GetFile(playerUrl) {
  let url
  let xhr = new XMLHttpRequest()
  xhr.open('GET', '/stream?url=' + playerUrl, false)
  xhr.onreadystatechange = function () {
    url = xhr.responseText
  }
  xhr.send()
  return url
}

const player = new Playerjs({
  id: 'player',
  file: '/public/one_piece.txt',
})

let lastTime = 0
function PlayerjsEvents(event, id, data) {
  if (event == 'time') {
    const now = Date.now()
		if (now - lastTime > 2000) {
			lastTime = now
			syncSession()
		}
  }
}

async function syncSession() {
  const storage = window.localStorage
  const playerjsFromKey = getCurrentPlayerFromKey()
  const userSession = {
    pljsuserid: storage.getItem('pljsuserid'),
    pljsvolume: storage.getItem('pljsvolume'),
    pljsmute: storage.getItem('pljsmute'),
    [playerjsFromKey]: storage.getItem(playerjsFromKey),
  }

	const data = {
		session: userSession,
		playerFromKey: playerjsFromKey,
	}

  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/sync-session', true)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(data))
}
