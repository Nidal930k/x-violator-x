
document.addEventListener("DOMContentLoaded", () => {
  const secret = [38,38,40,40,37,39,37,39,66,65]; // ↑ ↑ ↓ ↓ ← → ← → B A
  let input = [];
  window.addEventListener("keydown", e => {
    input.push(e.keyCode);
    if (input.length > 10) input.shift();
    if (input.join() === secret.join()) {
      alert("👀 Easter Egg débloqué ! Respect ++ pour avoir trouvé ça 💀");
    }
  });
});
