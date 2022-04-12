// changing portfolio images
const portfolioBtn = document.querySelector('.portfolio-btn')
const portfolioImages = document.querySelectorAll('.portfolio-image')

function replaceImages(element) {
	console.log(element)
	if (element.hasAttribute('data-tab')) {
		const portfolioBtns = document.querySelectorAll('.portfolio-btn')
		for (let i = 0; i < portfolioBtns.length; i++) {
			portfolioBtns[i].classList.remove('active')
		}
		element.classList.add('active')

		let seasonName = element.getAttribute('data-tab')

		for (var i = 1; i <= portfolioImages.length; i++) {
			let newSrc = `./assets/img/${seasonName}/${i}.jpg`,
				idItem = document.getElementById(`portfolio-image-${i}`)

			idItem.setAttribute('src', newSrc)
		}
	}
}
