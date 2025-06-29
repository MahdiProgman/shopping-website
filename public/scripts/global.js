const greetingText = document.getElementById("greeting-text");
const greetingIcon = document.getElementById("greeting-icon");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const drawerBox = document.querySelector(".drawer");
const overlay = document.querySelector("body > .overlay");
const headerSpacer = document.querySelector("header > .spacer");
const swiperProducts = document.querySelectorAll(".swiper-products");
const recentSearchesBox = document.querySelector(".recent-searches");
const headerOverlay = document.querySelector(".header-overlay");
const searchInput = document.getElementById("search-input");
const openUserBoxBtn = document.getElementById("open-user-dropdown-btn");
const userDropdown = document.querySelector("header .user-dropdown");
const exitFromAccountBtn = document.getElementById("exit-from-account-btn");
const exitFromAccountDrawerBtn = document.getElementById(
  "exit-from-account-drawer-btn"
);
const customSelectElements = document.querySelectorAll('.custom-select');
const openUserPanelDrawerBtn = document.getElementById('open-user-panel-drawer-btn');
const userPanelDrawerContent = document.querySelector('.drawer .user-panel-content');
const mainDrawerContent = document.querySelector('.drawer .main-content');
const backToMainDrawerBtn = document.getElementById('back-to-main-drawer-btn');
const time = new Date();

if (time.getHours() >= 6 && time.getHours() <= 12) {
  greetingText.innerText = "صبح بخیر";
  greetingIcon.src = "/assets/icons/morning.png";
} else if (time.getHours() >= 12 && time.getHours() < 18) {
  greetingText.innerText = "بعد از ظهر بخیر";
  greetingIcon.src = "/assets/icons/afternoon.png";
} else {
  greetingText.innerText = "شب بخیر";
  greetingIcon.src = "/assets/icons/night.png";
}

if (openUserBoxBtn && userDropdown && exitFromAccountBtn) {
  openUserBoxBtn.addEventListener("click", () => {
    if (!userDropdown.classList.contains("on")) {
      userDropdown.classList.add("on");
      openUserBoxBtn.classList.add("open");
    } else {
      userDropdown.classList.remove("on");
      openUserBoxBtn.classList.remove("open");
    }
  });

  exitFromAccountBtn.addEventListener("click", () => {
    Swal.fire({
      title: "آیا شما مطمعن هستید؟",
      text: "با این کار شما به طور کامل از حساب خود خارج خواهید شد.",
      confirmButtonColor: "#f16767",
      confirmButtonText: "خروج",
      showCancelButton: true,
      cancelButtonText: "لغو",
      icon: "warning",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const form = document.createElement("form");

        form.method = "POST";
        form.action = "/auth/logout";

        document.body.appendChild(form);

        requestAnimationFrame(() => {
          form.submit();
        });
      }
    });
  });

  exitFromAccountDrawerBtn.addEventListener("click", () => {
    Swal.fire({
      title: "آیا شما مطمعن هستید؟",
      text: "با این کار شما به طور کامل از حساب خود خارج خواهید شد.",
      confirmButtonColor: "#f16767",
      confirmButtonText: "خروج",
      showCancelButton: true,
      cancelButtonText: "لغو",
      icon: "warning",
      willOpen: () => {
        drawerBox.classList.remove("on");
        overlay.classList.add("hidden");
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const form = document.createElement("form");

        form.method = "POST";
        form.action = "/auth/logout";

        document.body.appendChild(form);

        requestAnimationFrame(() => {
          form.submit();
        });
      }
    });
  });
}

menuBtn.addEventListener("click", () => {
  if (!drawerBox.classList.contains("on")) {
    drawerBox.classList.add("on");
    overlay.classList.remove("hidden");
  }
});

closeBtn.addEventListener("click", () => {
  if (drawerBox.classList.contains("on")) {
    drawerBox.classList.remove("on");
    overlay.classList.add("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const setSpacerHeight = () => {
    headerSpacer.style.height = `${
      document.querySelector("header > .section-1").clientHeight
    }px`;
  };

  window.addEventListener("resize", setSpacerHeight);

  const headerResizeObserver = new ResizeObserver(setSpacerHeight);
  headerResizeObserver.observe(document.querySelector("header > .section-1"));

  const closeDrawerMenu = () => {
    if (
      document.documentElement.clientWidth > 640 &&
      drawerBox.classList.contains("on")
    ) {
      drawerBox.classList.remove("on");
      overlay.classList.add("hidden");
    }
  };

  const drawerResizeObserver = new ResizeObserver(closeDrawerMenu);
  drawerResizeObserver.observe(document.documentElement);
});

swiperProducts.forEach((value, i) => {
  new Swiper(`.sp-${i + 1}`, {
    autoplay: {
      delay: 3500,
    },
    navigation: {
      nextEl: `.sp-${i + 1} .swiper-button-next`,
      prevEl: `.sp-${i + 1} .swiper-button-prev`,
    },
    pagination: {
      el: `.sp-${i + 1} .swiper-pagination`,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      640: {
        slidesPerView: 2,
      },
    },
  });
});


if(recentSearchesBox) {
  searchInput.addEventListener("focus", () => {
    recentSearchesBox.classList.add("on");
    headerOverlay.classList.remove("hidden");
  });

  document.addEventListener("mousedown", (e) => {
    if (
      !recentSearchesBox.contains(e.target) &&
      recentSearchesBox.classList.contains("on")
    ) {
      recentSearchesBox.classList.remove("on");
      headerOverlay.classList.add("hidden");
    }
  });
}

document.addEventListener("touchstart", (e) => {
  if(recentSearchesBox) {
    if (
      !recentSearchesBox.contains(e.target) &&
      recentSearchesBox.classList.contains("on")
    ) {
      recentSearchesBox.classList.remove("on");
      headerOverlay.classList.add("hidden");
    }
  }

  if (!drawerBox.contains(e.target) && drawerBox.classList.contains("on")) {
    drawerBox.classList.remove("on");
    overlay.classList.add("hidden");
    if(!mainDrawerContent.classList.contains('active') && currentState === 'main-content') {
      userPanelDrawerContent.classList.remove('active');
      mainDrawerContent.classList.add('active');
    }
  }
});

if(customSelectElements.length !== 0) {
  customSelectElements.forEach(customSelect => {
    customSelect.addEventListener('click', () => {
      if(!customSelect.classList.contains('open')) customSelect.classList.add('open');
      else customSelect.classList.remove('open');
    });

    customSelect.querySelectorAll('.dropdown ul li').forEach(choice => {
      choice.addEventListener('click', () => {
        customSelect.querySelector('.select-box span').innerText = choice.children[0].innerText;
        customSelect.querySelector('.dropdown ul li.selected').classList.remove('selected');
        choice.classList.add('selected');
        document.querySelector('.custom-select-input').value = choice.dataset.value;
      });
    });
  });
}

if (openUserPanelDrawerBtn) {
  openUserPanelDrawerBtn.addEventListener('click', () => {
    mainDrawerContent.classList.remove('active');
    userPanelDrawerContent.classList.add('active');
  });

  backToMainDrawerBtn.addEventListener('click', () => {
    userPanelDrawerContent.classList.remove('active');
    mainDrawerContent.classList.add('active');
  });
}