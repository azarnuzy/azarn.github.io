const bar = document.querySelector(".bar-menu");
const menu = document.querySelector(".menu-icon");
const active = document.querySelectorAll(".menu-icon li a");
const arrowRight = document.querySelector(".lnr-arrow-right");
const arrowLeft = document.querySelector(".lnr-arrow-left");
let menuitr = 1;
const menuItem = bar.nextElementSibling;
const len = document.body.clientWidth;
if (len > 1170) {
  bar.setAttribute("hidden", true);
}

window.addEventListener("resize", function (e) {
  const width = document.body.clientWidth;
  const menuItem = bar.nextElementSibling;
  if (width > 1170) {
    bar.setAttribute("hidden", true);
    menuItem.style.maxHeight = menuItem.scrollHeight + "px";
  } else {
    bar.removeAttribute("hidden");
    menuItem.style.maxHeight = 0;
  }
});

bar.addEventListener("click", function (e) {
  bar.classList.toggle("times");
  const times = document.querySelector(".times");

  const timesShow = document.querySelector(".times");
  if (timesShow) {
    times.innerHTML = `<li><i class="fas fa-times"></i></li>`;
  } else {
    bar.innerHTML = `<li><i class="fas fa-bars"></i></li>`;
  }

  if (bar.classList.contains("times")) {
    menuItem.style.maxHeight = menuItem.scrollHeight + "px";
  } else {
    menuItem.style.maxHeight = 0;
  }
});

const items = document.querySelectorAll(".menu-item li");
const pages = document.querySelectorAll(".animated-section");
const home = document.querySelector(".home-page");
const aboutme = document.querySelector(".about-me");
const resume = document.querySelector(".resume");
const portofolio = document.querySelector(".portofolio");
const blog = document.querySelector(".blog");
const contact = document.querySelector(".contact");

const showPage = function (id) {
  if (id == 1) {
    home.removeAttribute("hidden");
  } else {
    home.setAttribute("hidden", true);
  }

  if (id == 2) {
    aboutme.removeAttribute("hidden");
  } else {
    aboutme.setAttribute("hidden", true);
  }

  if (id == 3) {
    resume.removeAttribute("hidden");
  } else {
    resume.setAttribute("hidden", true);
  }

  if (id == 4) {
    portofolio.removeAttribute("hidden");
  } else {
    portofolio.setAttribute("hidden", true);
  }

  if (id == 5) {
    blog.removeAttribute("hidden");
  } else {
    blog.setAttribute("hidden", true);
  }

  if (id == 6) {
    contact.removeAttribute("hidden");
  } else {
    contact.setAttribute("hidden", true);
  }
};

const activePage = function (id) {
  for (let itr = 0; itr < active.length; itr++) {
    if (id == itr + 1) {
      active[itr].classList.add("active");
    } else {
      active[itr].classList.remove("active");
    }
  }
};

items.forEach(function (item) {
  item.addEventListener("click", function (e) {
    const id = e.target.parentElement.id;
    menuitr = id;
    activePage(id);
    showPage(id);
  });
});

arrowRight.addEventListener("click", function (e) {
  menuitr++;
  if (menuitr > 6) {
    menuitr = 1;
  }
  activePage(menuitr);
  showPage(menuitr);
});

arrowLeft.addEventListener("click", function (e) {
  menuitr--;
  if (menuitr < 1) {
    menuitr = 6;
  }
  activePage(menuitr);
  showPage(menuitr);
});

console.log(menuitr);

// Get the modal
const modal = document.querySelectorAll("#myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
const img = document.querySelectorAll("#myImg");
const modalImg = document.querySelectorAll("#img01");
const captionText = document.querySelectorAll("#caption");

for (let itr = 0; itr < img.length; itr++) {
  img[itr].addEventListener("click", function (e) {
    modal[itr].style.display = "block";
    modalImg[itr].src = this.src;
    captionText[itr].innerHTML = this.alt;
  });
}

// Get the <span> element that closes the modal
const span = document.querySelectorAll(".close");

for (let itr = 0; itr < span.length; itr++) {
  modal[itr].addEventListener("click", function (e) {
    modal[itr].style.display = "none";
  });

  span[itr].addEventListener("click", function (e) {
    modal[itr].style.display = "none";
  });
}
