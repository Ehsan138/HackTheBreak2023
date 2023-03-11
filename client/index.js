function darkMode() {
     let icon = document.querySelector(".mode-icon");
     let linkText = document.querySelector(".link-text")

     if (icon.textContent === "🌘") {
       icon.textContent = "☀️";
        linkText.textContent = "Light Mode"
     } else {
       icon.textContent = "🌘";
       linkText.textContent = "Dark Mode";
     }

    let main = document.querySelector("main");
    main.classList.toggle("dark-mode");
    console.log("clicked")
}
