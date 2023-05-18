function GetFile(playerUrl){
	let url;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', '/stream?url='+playerUrl, false);
	xhr.onreadystatechange = function() {
		 url = xhr.responseText;
	}
	xhr.send();
	return url
}

const player = new Playerjs({
	id: 'player',
	file: '/public/one_piece.txt'
});

function PlayerjsEvents(event,id,data){}