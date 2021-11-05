const scard = document.getElementById('scard');
const cardlist = document.getElementById('cardlist');
document.querySelector('#card-name').addEventListener('keyup', (event) => {
	if (event.key !== 'Enter') return; // Use `.key` instead.
	document.querySelector('#scard').click(); // Things you want to do.
	event.preventDefault(); // No need to `return false;`.
});

const searchCard = function () {
	let criteria = document.getElementById('card-name').value;

	fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${criteria}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			let cardList = data;

			let ul = document.getElementById('cardlist');
			ul.innerHTML = '';

			cardList.data.forEach((card) => {
				let li = document.createElement('li');
				li.setAttribute('id', card.id);
				li.appendChild(document.createTextNode(card.name));
				ul.appendChild(li);
			});
		})
		.catch(function (err) {
			console.log('Something went wrong!', err);
		});

	//* XHR Method
	// const xhr = new XMLHttpRequest();
	// xhr.open(
	// 	'GET',
	// 	`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${criteria}`
	// );
	// xhr.onload = () => {
	// 	const cardList = JSON.parse(xhr.response).data;
	// 	let ul = document.getElementById('cardlist');
	// 	ul.innerHTML = '';

	// 	cardList.forEach((card) => {
	// 		let li = document.createElement('li');
	// 		li.setAttribute('id', card.id);
	// 		li.appendChild(document.createTextNode(card.name));
	// 		ul.appendChild(li);
	// 	});
	// };
	// xhr.send();
};

const selectCard = function (e) {
	let listId = e.target.id;

	fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${listId}`)
		.then(function (response) {
			return response.json();
		})
		.then(function (data) {
			// console.log(data);
			let cardDetail = data;

			let cardName = document.getElementById('cardname');
			cardName.innerHTML = '';
			cardName.appendChild(
				document.createTextNode(cardDetail.data[0].name)
			);
			let cardType = document.getElementById('cardtype');
			cardType.innerHTML = '';
			cardType.appendChild(
				document.createTextNode(cardDetail.data[0].type)
			);
			let cardText = document.getElementById('cardtext');
			cardText.innerHTML = '';
			cardText.appendChild(
				document.createTextNode(cardDetail.data[0].desc)
			);
			let cardImage = document.getElementById('cardimage');
			cardImage.setAttribute(
				'src',
				cardDetail.data[0].card_images[0].image_url
			);
		})
		.catch(function (err) {
			console.log('Something went wrong!', err);
		});

	//* XHR Method
	// const xhr = new XMLHttpRequest();
	// xhr.open(
	// 	'GET',
	// 	`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${listId}`
	// );
	// xhr.onload = () => {
	// 	const cardDetail = JSON.parse(xhr.response).data;
	// 	console.log(cardDetail);
	// 	let cardName = document.getElementById('cardname');
	// 	cardName.innerHTML = '';
	// 	cardName.appendChild(document.createTextNode(cardDetail[0].name));
	// 	let cardType = document.getElementById('cardtype');
	// 	cardType.innerHTML = '';
	// 	cardType.appendChild(document.createTextNode(cardDetail[0].type));
	// 	let cardText = document.getElementById('cardtext');
	// 	cardText.innerHTML = '';
	// 	cardText.appendChild(document.createTextNode(cardDetail[0].desc));
	// 	let cardImage = document.getElementById('cardimage');
	// 	cardImage.setAttribute('src', cardDetail[0].card_images[0].image_url);
	// };
	// xhr.send();
};

if (this.addEventListener) {
	// For all major browsers, except IE 8 and earlier
	scard.addEventListener('click', searchCard);
	cardlist.addEventListener('click', selectCard);
} else if (this.attachEvent) {
	// For IE 8 and earlier versions
	scard.attachEvent('onclick', searchCard);
	cardlist.attachEvent('onclick', selectCard);
}
