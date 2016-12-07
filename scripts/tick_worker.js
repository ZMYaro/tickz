var tickInterval;

onmessage = function (e) {
	switch (e.data) {
		case 'start':
			clearTickInterval();
			tickInterval = setInterval(tick, 1000);
			break;
		case 'stop':
			clearTickInterval();
			break;
	}
}

function tick() {
	postMessage('tick');
}

function clearTickInterval() {
	if (typeof tickInterval !== 'undefined') {
		clearInterval(tickInterval);
		tickInterval = undefined;
	}
}
