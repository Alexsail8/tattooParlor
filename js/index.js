import i18Obj from './translate.js'

const data = {
	lang: 'en',
	portfolio: 'winter',
	theme: 'dark',
}
// hamburger toggle Menu
const hamburger = document.querySelector('.hamburger')
const nav = document.querySelector('.nav')
const overlay = document.querySelector('.overlay')

const toggleMenu = function () {
	hamburger.classList.toggle('open')
	nav.classList.toggle('active')
	overlay.classList.toggle('active')
}

const jumpToSection = function (event) {
	if (
		event.target.classList.contains('nav__item-link') ||
		event.target.classList.contains('overlay')
	) {
		hamburger.classList.remove('open')
		nav.classList.remove('active')
		overlay.classList.remove('active')
	}
}

hamburger.addEventListener('click', toggleMenu)
nav.addEventListener('click', jumpToSection)

const controlLang = document.querySelectorAll('.control-lang__radio')

function getTranslate(lang) {
	const textEl = document.querySelectorAll('[data-language]')
	const radioEl = document.querySelector(`input[id="${lang}"]`)

	textEl.forEach(el => {
		const translateText = i18Obj[lang][el.dataset.language]
		if (el.placeholder) {
			el.placeholder = translateText
		}
		if (el.textContent !== '') {
			el.textContent = translateText
		}
	})

	radioEl.checked = true
}

function switchLanguage(elem) {
	const lang = elem.target.id

	data.lang = lang
	getTranslate(lang)
	setLocalStorage()
}

// Save to local storage
function setLocalStorage() {
	localStorage.setItem('porfolio-param', JSON.stringify(data))
}

// load from local storage
function loadFromLocalStorage() {
	const localData = JSON.parse(localStorage.getItem('porfolio-param'))

	if (localData) {
		for (const key in localData) {
			if (data.hasOwnProperty(key)) {
				data[key] = localData[key]
			}
		}
	}
}

const themeSwitcher = document.getElementsByClassName('controls__theme')[0]

function toggleTheme(elem) {
	data.theme = data.theme === 'dark' ? 'light' : 'dark'

	changeTheme(data.theme)
	setLocalStorage()
}

function changeTheme(theme) {
	document.documentElement.classList = `theme-${theme}`
}

// start loading DOM content
window.addEventListener('DOMContentLoaded', e => {
	loadFromLocalStorage()

	getTranslate(data.lang)
	changeTheme(data.theme)

	controlLang.forEach(el =>
		el.addEventListener('change', switchLanguage.bind(this))
	)

	themeSwitcher.addEventListener('click', toggleTheme.bind(this))

	document.body.removeAttribute('class')
})
