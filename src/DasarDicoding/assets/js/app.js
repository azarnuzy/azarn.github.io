const menuHeader = document.querySelector(".menu-bar");

menuHeader.addEventListener("click", function (e) {
  menuHeader.classList.toggle("times");
  const times = document.querySelector(".times");
  const timesShow = menuHeader.classList.contains("times");
  if (timesShow) {
    times.innerHTML = `<li><i class="fas fa-times"></i></li>`;
  } else {
    menuHeader.innerHTML = `<li><i class="fas fa-bars"></i></li>`;
  }

  const menuItem = menuHeader.nextElementSibling;
  console.log(menuItem);
  if (menuHeader.classList.contains("times")) {
    menuItem.style.maxHeight = menuItem.scrollHeight + "px";
  } else {
    menuItem.style.maxHeight = 0;
  }
});

const progress = document.querySelectorAll(".progress-done");

progress.forEach(function (part) {
  part.style.width = part.getAttribute("data-done") + "%";
  part.style.opacity = 1;
});
