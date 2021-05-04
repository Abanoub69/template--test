const quoteContainer = document.getElementById('qoute-generation');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function finishLoadAndHideLoader() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// get quote api
async function getQuote() {
  showLoader();
  const proxyUrl = 'https://cros-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // if there is no author add 'unknown'
    if (!data.quoteAuthor) {
      quoteAuthor.innerText = 'Unknown';
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }
    // add long-quote class if the quote is bigger than 80 character
    if (data.quoteText.length > 80) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // stop loadeing show container
    finishLoadAndHideLoader();
  } catch (err) {
    getQuote();
  }
}
function twitterQuote() {
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', twitterQuote);
getQuote();
