    // Function to fetch a random quote
    function getRandomQuote() {
      fetch('https://dummyjson.com/quotes/random')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch quote');
          }
          return response.json();
        })
        .then(data => {
          // Update the DOM with the quote
          const quoteElement = document.getElementById('quote-text');
          const authorElement = document.getElementById('quote-author');
          quoteElement.textContent = data.quote; // Changed from data.content
          authorElement.textContent = '- ' + data.author;
          console.log('Quote updated:', data);
        })
        .catch(error => {
          console.error('Error fetching quote:', error);
          // Show error message to user
          const quoteElement = document.getElementById('quote-text');
          quoteElement.textContent = 'Failed to load quote. Please try again.';
        });
    }

    // Set up event listener for button
    const newQuoteBtn = document.getElementById('new-quote-btn');
    newQuoteBtn.addEventListener('click', getRandomQuote);

    // Load initial quote on page load
    getRandomQuote();