function getPilihanComputer() {
  const comp = Math.random();
  if (comp < 0.34) return "gajah";
  if (comp >= 0.34 && comp < 0.67) return "orang";
  return "semut";
}

function getHasil(comp, player) {
  if (player == comp) return "SERI";
  if (player == "gajah") return comp == "orang" ? "MENANG" : "KALAH";
  if (player == "orang") return comp == "gajah" ? "KALAH" : "MENANG";
  if (player == "semut") return comp == "orang" ? "KALAH" : "MENANG";
}

function putar() {
  const imgComputer = document.querySelector(".img-komputer");
  const gambar = ["gajah", "semut", "orang"];
  let i = 0;
  const waktuMulai = new Date().getTime();
  setInterval(function () {
    if (new Date().getTime() - waktuMulai > 1000) {
      clearInterval;
      return;
    }

    imgComputer.setAttribute("src", `../crocsDesign/img/${gambar[i++]}.png`);
    if (i == gambar.length) {
      i = 0;
    }
  }, 100);
}

const getGambar = document.querySelectorAll("li img");

getGambar.forEach(function (gambar) {
  gambar.addEventListener("click", function () {
    const comp = getPilihanComputer();
    const player = gambar.className;
    const hasil = getHasil(comp, player);
    const info = document.querySelector(".info");
    putar();
    setTimeout(() => {
      info.innerHTML = `${hasil}`;
      const compImg = document.querySelector(".img-komputer");
      console.log(comp);
      compImg.src = `../crocsDesign/img/${comp}.png`;
    }, 1000);
  });
});
