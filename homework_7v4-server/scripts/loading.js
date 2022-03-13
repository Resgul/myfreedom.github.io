export function loadingBarDelete() {
  fetch(`https://todoappexamplejs.herokuapp.com/items.json`)
    .then(response => {
      clearInterval(window.myInterval);
      loading.remove()
      delete window.myInterval;
    }
  );
}
  
export function loadingBarProcessing() {
  let timer = 0;
  if (loading) {
    window.myInterval = setInterval(() => {
      timer++;
      loading.append('.');
      loading.prepend('.');
      if (timer % 4 === 0) {
        loading.innerText = 'LOADING';
        timer = 0;
      }
    }, 1000)
  }
}