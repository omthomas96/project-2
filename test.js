function handleClick() {
    const API_KEY = 'DNTMN9dKFRLsqkl8nNp3gUFMdXmi6oLW';
            console.log('Fetching');
            elementOutputArea.innerHTML = 'handleClick called'
            let example = fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${userInput}&limit=10&rating=g`).then((res) => {
                console.log('This is inside the then() block');
            });
            console.log('This is after the fetch statement where we are now executing other code that is not async');
        }
        