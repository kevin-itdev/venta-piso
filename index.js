        const images = [];
        for (let i = 1; i <= 53; i++) {
            images.push(`../images/Photo${i}.jpeg`);//   ../images/Photo1.jpeg for Vercel   ./images/Photo1.jpeg local
        }
        const pictures = document.getElementById("myPictures");
        let currentIndex = 0;
        let autoSlideInterval;
        // Dynamically add thumbnails
        images.forEach((src, index) => {
            pictures.innerHTML += `<img class="thumbnail" src="${src}" alt="Image ${index + 1}" onclick="changeImage(${index})">`;
        });
// ---
        document.getElementById("contact-form-right").addEventListener("submit", async function (event) {
            event.preventDefault();
        
            const formData = new FormData(this);
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            });
        
            const result = await response.text();
            document.getElementById("status-right").textContent = result;
        });
        document.getElementById("contact-form-center").addEventListener("submit", async function (event) {
            event.preventDefault();
        
            const formData = new FormData(this);
            const response = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { "Content-Type": "application/json" }
            });
        
            const result = await response.text();
            document.getElementById("status-center").textContent = result;
        });
// ---
        // Function to scroll thumbnails left or right
        function scrollThumbnails(amount) {
            document.querySelector(".thumbnail-wrapper").scrollBy({
                left: amount,
                behavior: "smooth"
            });
        }

        function changeImage(index) {
            currentIndex = index;
            document.getElementById("mainImage").src = images[currentIndex];

            // Remove active class from all thumbnails
            document.querySelectorAll(".thumbnail").forEach(img => img.classList.remove("active"));
            document.querySelectorAll(".thumbnail")[currentIndex].classList.add("active");

            restartAutoSlide();
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            changeImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            changeImage(currentIndex);
        }

        function openModal() {
            document.getElementById("imageModal").style.display = "flex";
            document.getElementById("modalImage").src = images[currentIndex];
        }

        function closeModal() {
            document.getElementById("imageModal").style.display = "none";
        }

        function autoSlide() {
            nextImage();
        }

        function restartAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(autoSlide, 4000);
        }

        // Start auto-slide on load
        autoSlideInterval = setInterval(autoSlide, 4000);
