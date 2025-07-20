/* IntersectionObserver: adds .is-visible to .reveal as they enter viewport */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

/* ───── Parallax hero gradient ───── */
window.addEventListener("scroll", () => {
  const y = window.scrollY;
  document.querySelector(".hero").style.backgroundPosition = `center ${
    y * -0.2
  }px`;
});

/* ───── CTA pulse after 8 s idle ───── */
let idleTimer;
const ctaBtn = document.querySelector(".cta .btn");
function startIdle() {
  idleTimer = setTimeout(
    () => (ctaBtn.style.animation = "pulse 2s infinite"),
    8000
  );
}
["mousemove", "scroll", "keydown", "touchstart"].forEach((evt) =>
  window.addEventListener(
    evt,
    () => {
      ctaBtn.style.animation = "none";
      clearTimeout(idleTimer);
      startIdle();
    },
    { passive: true }
  )
);
startIdle();

/* ───── I18N  ───── */
const t = {
  en: {
    tagline: "Family-grown • Organic • Wholesale only",
    "cta-order": "Order now",
    "about-h": "Why choose our hazelnuts?",
    "about-p":
      "From our orchard in Monoszló, Hungary, we harvest, hand-sort and sun-dry each nut within 24 h. The result is a creamy, sweet flavour and a 97 % kernel-to-shell ratio your customers will love.",
    "grades-h": "Grades & formats",
    "grades-list": `<li>Whole kernels (14-16 mm)</li>
                   <li>Blanched kernels</li>
                   <li>Roasted, chopped (2-4 mm)</li>
                   <li>Hazelnut paste (100 %)</li>`,
    "price-h": "Price list (Ex-works)",
    "price-list": `<li>Whole roasted hazelnuts - <strong>8 000 HUF / kg</strong></li>
                  <li>Hazelnut cream, unsweetened - <strong>4 000 HUF / jar</strong></li>
                  <li>Hazelnut cream, sweetened - <strong>3 000 HUF / jar</strong></li>`,
    "moq-h": "Minimum order",
    "moq-p": "10 kg per SKU • FOB Budapest",
    "shelf-h": "Shelf life",
    "shelf-p": "12 months vacuum-sealed",
    "cta-h": "Let's get cracking.",
    "order-h": "Place a B2B order",
    "form-name": "Name",
    "form-company": "Company",
    "form-email": "E-mail",
    "form-product": "Product",
    "opt-nuts": "Roasted hazelnuts (kg)",
    "opt-cream-u": "Cream • unsweetened (jar)",
    "opt-cream-s": "Cream • sweetened (jar)",
    "form-qty": "Quantity",
    "form-send": "Send order",
    "order-note":
      "We will confirm availability and shipping cost within one business day.",
    "contact-h": "Contact Kata",
    "contact-note": "We ship within 48 h after payment.",
    "footer-made": "Grown with ❤ by Kata",
  },
  hu: {
    tagline: "Családi termesztés • Bio • Csak nagyker",
    "cta-order": "Rendelés",
    "about-h": "Miért a mi mogyorónk?",
    "about-p":
      "Monoszlói ültetvényünkön 24 órán belül betakarítjuk, kézzel válogatjuk és napon szárítjuk a mogyorót. Így lesz igazán édes, krémes és 97 %-os béltartalmú.",
    "grades-h": "Termékeink",
    "grades-list": `<li>Egész szem (14-16 mm)</li>
                   <li>Blansírozott szem</li>
                   <li>Pörkölt, darált (2-4 mm)</li>
                   <li>Mogyorókrém (100 %)</li>`,
    "price-h": "Árlista (ex-works)",
    "price-list": `<li>Pörkölt mogyoró - <strong>8 000 Ft / kg</strong></li>
                  <li>Mogyorókrém, cukor nélkül - <strong>4 000 Ft / üveg</strong></li>
                  <li>Mogyorókrém, cukorral - <strong>3 000 Ft / üveg</strong></li>`,
    "moq-h": "Minimális rendelés",
    "moq-p": "10 kg tételenként • FOB Budapest",
    "shelf-h": "Szavatosság",
    "shelf-p": "12 hónap vákuumcsomagolva",
    "cta-h": "Vágjunk bele!",
    "order-h": "B2B rendelés",
    "form-name": "Név",
    "form-company": "Cég",
    "form-email": "E-mail",
    "form-product": "Termék",
    "opt-nuts": "Pörkölt mogyoró (kg)",
    "opt-cream-u": "Krém • cukor nélkül (üveg)",
    "opt-cream-s": "Krém • cukorral (üveg)",
    "form-qty": "Mennyiség",
    "form-send": "Küldés",
    "order-note":
      "Egy munkanapon belül visszaigazoljuk a készletet és a szállítási díjat.",
    "contact-h": "Kapcsolat - Kata",
    "contact-note": "Fizetés után 48 órán belül szállítunk.",
    "footer-made": "Szeretettel termesztve - Kata",
  },
};

function applyTranslations(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key && t[lang][key]) {
      if (
        el.tagName === "INPUT" ||
        el.tagName === "SELECT" ||
        el.tagName === "TEXTAREA"
      ) {
        el.placeholder = t[lang][key];
      } else {
        el.innerHTML = t[lang][key];
      }
    }
  });
  // toggle button label
  const btn = document.getElementById("langToggle");
  btn.textContent = lang === "en" ? "HU" : "EN";
  btn.setAttribute(
    "aria-label",
    lang === "en" ? "Magyar változat" : "English version"
  );
}

const langToggle = document.getElementById("langToggle");
langToggle.addEventListener("click", () => {
  const newLang = document.documentElement.dataset.lang === "en" ? "hu" : "en";
  applyTranslations(newLang);
});
applyTranslations("en"); // initial
