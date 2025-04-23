
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("intro");
  const content = document.getElementById("content");
  setTimeout(() => {
    intro.style.display = "none";
    content.classList.remove("hidden");
  }, 2500);
});
