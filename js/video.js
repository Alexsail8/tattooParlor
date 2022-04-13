const videoPlayer = document.querySelector('.video__content')
const video = document.getElementsByClassName('video-player')[0]
const posterPlayBtn = document.getElementsByClassName('video__play')[0]
const videoPlayControls = document.getElementsByClassName(
	'video-player__controls'
)[0]
const timeline = videoPlayer.querySelector('.timeline')
const volumeSlider = videoPlayer.querySelector(
	'.button__controls .volume-slider'
)
const playBtn = videoPlayer.querySelector(
	'.button__controls .buttons__play-pause'
)
const playPosterBtn = videoPlayer.querySelector(
	'.video__content .video-play__poster-btn'
)
const volumeButton = videoPlayer.querySelector('.volume-button')
const volumeEl = videoPlayer.querySelector('.volume-container .volume')

//click on timeline to skip around
function controlTimeline(e) {
	const timelineWidth = window.getComputedStyle(timeline).width
	const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * video.duration
	video.currentTime = timeToSeek
}

//click volume slider to change volume
function onVolumeSlider(e) {
	const sliderWidth = window.getComputedStyle(volumeSlider).width
	let newVolume = e.offsetX / parseInt(sliderWidth)

	video.volume = newVolume
	videoPlayer.querySelector(
		'.button__controls .volume-percentage'
	).style.width = newVolume * 100 + '%'

	if (Math.trunc(newVolume * 100) <= 1) {
		controlModeVolumeMute(e)
	} else {
		if (video.muted === true) {
			controlModeVolumeMute(e)
		}
	}
}

function controlModeVolumeMute(e) {
	video.muted = !video.muted
	if (video.muted) {
		volumeEl.classList.remove('icono-volumeMedium')
		volumeEl.classList.add('icono-volumeMute')
	} else {
		volumeEl.classList.add('icono-volumeMedium')
		volumeEl.classList.remove('icono-volumeMute')
	}
}

function onPlayVideo(e) {
	if (video.paused) {
		playBtn.classList.remove('play')
		playBtn.classList.add('pause')
		playPosterBtn.classList.remove('video_btn-show')
		playPosterBtn.classList.add('video_btn-hidden')
		videoPlayControls.classList.add('active')
		video.play()
	} else {
		playBtn.classList.remove('pause')
		playBtn.classList.add('play')
		playPosterBtn.classList.add('video_btn-show')
		playPosterBtn.classList.remove('video_btn-hidden')
		video.pause()
	}
}

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
	let seconds = parseInt(num)
	let minutes = parseInt(seconds / 60)
	seconds -= minutes * 60
	const hours = parseInt(minutes / 60)
	minutes -= hours * 60

	if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`
	return `${String(hours).padStart(2, 0)}:${minutes}:${String(
		seconds % 60
	).padStart(2, 0)}`
}

document.addEventListener('DOMContentLoaded', function (e) {
	if (video) {
		playBtn.addEventListener('click', onPlayVideo.bind(this))
		posterPlayBtn.addEventListener('click', onPlayVideo.bind(this))
		video.addEventListener('click', onPlayVideo.bind(this))

		timeline.addEventListener('click', controlTimeline.bind(this))
		volumeSlider.addEventListener('click', onVolumeSlider.bind(this))
		volumeButton.addEventListener('click', controlModeVolumeMute.bind(this))

		video.addEventListener(
			'loadeddata',
			() => {
				videoPlayer.querySelector('.time .length').textContent =
					getTimeCodeFromNum(video.duration)
				video.volume = 0.5
			},
			false
		)

		setInterval(() => {
			const progressBar = videoPlayer.querySelector('.progress')
			progressBar.style.width = (video.currentTime / video.duration) * 100 + '%'
			videoPlayer.querySelector('.time .current').textContent =
				getTimeCodeFromNum(video.currentTime)
		}, 500)
	}
})
