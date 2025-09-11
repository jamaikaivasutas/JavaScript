 async function getJoke() {
      const mode = document.getElementById('mode').value;
      const input = document.getElementById('inputValue').value.trim();
      let url = '';

      if (mode === 'random') {
        url = 'https://official-joke-api.appspot.com/jokes/random';
      } else if (mode === 'id' && input) {
        url = `https://official-joke-api.appspot.com/jokes/${input}`;
      } else if (mode === 'type' && input) {
        url = `https://official-joke-api.appspot.com/jokes/${input}/random`;
      } else {
        alert('Kérlek adj meg egy értéket!');
        return;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        const joke = Array.isArray(data) ? data[0] : data;

        document.getElementById('jokeBox').innerHTML = `
          <p><strong>${joke.setup}</strong></p>
          <p>${joke.punchline}</p>
        `;
      } catch (error) {
        document.getElementById('jokeBox').innerHTML = `<p>Hiba történt a vicc lekérésekor.</p>`;
      }
    }