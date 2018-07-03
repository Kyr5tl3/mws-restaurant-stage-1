document.addEventListener("DOMContentLoaded", event => {

if (!('serviceWorker' in navigator)) {
  console.log('Service Worker not supported');
  return;
}

navigator.serviceWorker.register('/sw.js')
  .then(registration => {
    console.log('SW registered! Scope is:', registration.scope);
  )
  .catch(error => {console.log("Registration failed : " + error)})

});
