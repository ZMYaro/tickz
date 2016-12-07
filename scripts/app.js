var TICK_SOUND_URL = 'audio/tick.mp3';

var ticker,
	tickInterval,
	toggleButton,
	volumeSlider,
	volumeUpButton,
	volumeDownButton;

function tick() {
	ticker.play();
}

function toggle() {
	if (tickInterval) {
		clearInterval(tickInterval);
		tickInterval = undefined;
		toggleButton.firstElementChild.innerHTML = 'play_arrow';
	} else {
		tickInterval = setInterval(tick, 1000);
		toggleButton.firstElementChild.innerHTML = 'pause';
	}
}

function updateVolume() {
	ticker.volume = this.value;
	updateVolumeControls();
}

function volumeUp() {
	ticker.volume = Math.min(ticker.volume + 0.2, 1);
	updateVolumeControls();
}

function volumeDown() {
	ticker.volume = Math.max(ticker.volume - 0.2, 0);
	updateVolumeControls();
}

function updateVolumeControls() {
	volumeDownButton.disabled = ticker.volume <= 0.2;
	volumeUpButton.disabled = ticker.volume >= 1;
	volumeSlider.value = ticker.volume;
}

window.onload = function () {
	ticker = document.getElementById('ticker');
	toggleButton = document.getElementById('toggleButton');
	volumeSlider = document.getElementById('volumeSlider');
	volumeUpButton = document.getElementById('volumeUpButton');
	volumeDownButton = document.getElementById('volumeDownButton');
	
	toggleButton.onclick = toggle;
	volumeSlider.oninput = updateVolume;
	volumeSlider.onchange = updateVolume;
	volumeUpButton.onclick = volumeUp;
	volumeDownButton.onclick = volumeDown;
	
	ticker.onloadeddata = function () {
		toggleButton.disabled = false;
	}
	ticker.src = TICK_SOUND_URL;
	
	updateVolumeControls();
};
