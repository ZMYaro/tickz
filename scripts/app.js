var TICK_SOUND_URL = 'audio/tick.mp3';

var ticker,
	ticking,
	tickWorker,
	toggleButton,
	volumeSlider,
	volumeUpButton,
	volumeDownButton;

window.onload = function () {
	ticking = false;
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
	
	tickWorker = new Worker('scripts/tick_worker.js');
	tickWorker.onmessage = function (e) {
		if (e.data === 'tick') {
			tick();
		}
	};
};

function tick() {
	ticker.play();
}

function toggle() {
	if (ticking) {
		tickWorker.postMessage('stop');
		ticking = false;
		toggleButton.firstElementChild.innerHTML = 'play_arrow';
	} else {
		tickWorker.postMessage('start');
		ticking = true;
		toggleButton.firstElementChild.innerHTML = 'stop';
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
