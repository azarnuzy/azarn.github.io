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

const getGajah = document.querySelector(".gajah");

getGajah.addEventListener("click", function () {
  const comp = getPilihanComputer();
  const hasil = getHasil(comp, "gajah");
  const info = document.querySelector(".info");
  info.innerHTML = `${hasil}`;
  const compImg = document.querySelector(".img-komputer");
  console.log(comp);
  compImg.src = `../img/${comp}.png`;
});

const getSemut = document.querySelector(".semut");

getSemut.addEventListener("click", function () {
  const comp = getPilihanComputer();
  const hasil = getHasil(comp, "semut");
  const info = document.querySelector(".info");
  info.innerHTML = `${hasil}`;
  const compImg = document.querySelector(".img-komputer");
  console.log(comp);
  compImg.src = `../img/${comp}.png`;
});

const getOrang = document.querySelector(".orang");

getOrang.addEventListener("click", function () {
  const comp = getPilihanComputer();
  const hasil = getHasil(comp, "orang");
  const info = document.querySelector(".info");
  info.innerHTML = `${hasil}`;
  const compImg = document.querySelector(".img-komputer");
  console.log(comp);
  compImg.src = `../img/${comp}.png`;
});
