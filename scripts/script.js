// script.js

import { router, state } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
const settingsButton = document.querySelector("header > img");
const pageTitle = document.querySelector("header > h1");

pageTitle.addEventListener('click', () => {
  setState(state.HOME)
})
settingsButton.addEventListener('click', (e) => {
  setState(state.SETTINGS)
})
function expandEntryHandler(e){
  // Create entry-page and update router history
  const entryPage = document.createElement('entry-page');
  entryPage.entry = e.target.entry;

  const existingEntryPage = document.querySelector('entry-page');
  existingEntryPage.parentNode.replaceChild(entryPage, existingEntryPage);

  setState(state.SINGLE_PAGE, e.target.entry.id);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach((entry, id) => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.id = id + 1;
        newPost.addEventListener('click', expandEntryHandler);
        document.querySelector('main').appendChild(newPost);
      });
    });
});

// Register the service worker
if ('serviceWorker' in navigator){
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
      .then(
          (registration) => console.log("ServiceWorker registration successfull with scope: ", registration.scope),
          (error) => console.log("ServiceWorker registration failed: ", error)
      )
  })
}

