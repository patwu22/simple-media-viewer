HFS.onEvent('afterEntryName', ({
		entry
	}) =>
	/\.(mp3|wav|aac|ogg|flac)$/i.test(entry.n) &&
	`<button class='play-button audio-button' onclick='audioplay("${entry.n}")' />`)

HFS.onEvent('afterEntryName', ({
		entry
	}) =>
	/\.(avif|apng|bmp|gif|jfif|jpeg|jpg|png|webp)$/i.test(entry.n) &&
	`<button class='play-button image-button' onclick='imageplay(this, "${entry.n}")' />`)

HFS.onEvent('afterEntryName', ({
		entry
	}) =>
	/\.(f4v|mkv|mov|mp4|ogv|webm)$/i.test(entry.n) &&
	`<button class='play-button video-button' onclick='videoplay("${entry.n}")' />`)

function audioplay(name = '') {
	const root = document.getElementById('audio-player')
	root.style.display = name ? 'flex' : ''
	const audio = root.querySelector('audio')
	audio.src = name
	if (name) audio.play()
	else audio.pause()
	root.querySelector('.player-title').innerText = name
}

function imageplay(btn, name = '') {
	const root = document.getElementById('image-player')
	root.style.display = name ? 'flex' : ''
	const img = root.querySelector('img')
	img.src = name
	img.alt = Array.from(document.querySelectorAll('.image-button')).indexOf(btn)
}

function videoplay(name = '') {
	const root = document.getElementById('video-player')
	root.style.display = name ? 'flex' : ''
	const video = root.querySelector('video')
	video.src = name
	if (name) video.play()
	else video.pause()
}

function imageup() {
	const img = document.querySelector('img')
	const list = document.querySelectorAll('.image-button')
	if (list.item(Number(img.alt) + 1)) list.item(Number(img.alt) + 1).click()
	else list.item(Number(0)).click()
}

function imagedown() {
	const img = document.querySelector('img')
	const list = document.querySelectorAll('.image-button')
	if (list.item(Number(img.alt) - 1)) list.item(Number(img.alt) - 1).click()
	else list.item(Number(list.length) - 1).click()
}

function videoout() {
	document.querySelector('video').src = null
	document.getElementById("video-player").style.display = "none"
}

HFS.onEvent('afterMenuBar', () => 
    `<div class='player' id='audio-player'>
        <audio controls></audio>
        <div>
            <span class='player-title'></span>
        </div>
    </div>
	<div class='player' id='image-player'>
        <img />
		<button class='ctrl-button' id='img-up' onclick='imageup()' style='outline: none;'></button>
		<button class='ctrl-button' id='img-down' onclick='imagedown()' style='outline: none;'></button>
  		<button class='ctrl-button' id='img-auto' onclick='var interv = setInterval(function() {if (document.getElementById("image-player").style.display != "none") imagedown() else clearInterval(interv)}, 5000)' style='outline: none;'></button>
		<button class='ctrl-button ctrl-out' onclick='document.getElementById("image-player").style.display = "none"' style='outline: none;'></button>
    </div>
	<div class='player' id='video-player'>
        <video controls></video>
        <button class='ctrl-button ctrl-out' onclick='videoout()'></button>
    </div>
`)
