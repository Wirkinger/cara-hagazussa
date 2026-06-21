const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
    menuToggle.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

const lightbox = document.getElementById("lightbox");

if (lightbox) {
    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeBtn = lightbox.querySelector(".lightbox-close");
    const prevBtn = lightbox.querySelector(".lightbox-prev");
    const nextBtn = lightbox.querySelector(".lightbox-next");
    const galleryItems = document.querySelectorAll(".gallery-item");

    const images = Array.from(galleryItems).map((item) => ({
        src: item.querySelector("img").src,
        alt: item.querySelector("img").alt,
    }));

    let currentIndex = 0;

    function showImage(index) {
        currentIndex = (index + images.length) % images.length;
        const { src, alt } = images[currentIndex];
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        lightboxCaption.textContent = alt;
    }

    function openLightbox(index) {
        showImage(index);
        lightbox.hidden = false;
        lightbox.setAttribute("aria-hidden", "false");
        requestAnimationFrame(() => lightbox.classList.add("is-open"));
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        setTimeout(() => {
            lightbox.hidden = true;
            lightboxImage.src = "";
        }, 350);
    }

    galleryItems.forEach((item) => {
        item.addEventListener("click", () => {
            openLightbox(Number(item.dataset.index));
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
    nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener("keydown", (e) => {
        if (lightbox.hidden) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") showImage(currentIndex - 1);
        if (e.key === "ArrowRight") showImage(currentIndex + 1);
    });
}