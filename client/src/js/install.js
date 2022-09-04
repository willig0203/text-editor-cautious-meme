const butInstall = document.getElementById("buttonInstall");
let deferredPrompt;

// Logic for installing the PWA
// Added an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  console.log("beforeinstallprompt");

  deferredPrompt = e;
  butInstall.style.visibility = "visible";
});

// Implemented a click event handler on the `butInstall` element
butInstall.addEventListener("click", async () => {
  console.log("click");
  console.log(deferredPrompt);
  if (deferredPrompt !== null) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      deferredPrompt = null;
    }
  }
  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Installed!";
});

// Added an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("appinstalled");
  console.log("👍", "appinstalled", event);
});
