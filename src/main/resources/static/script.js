// =====================================
// ELEMENTS
// =====================================

const analyzeBtn = document.getElementById("analyzeBtn");
const startBtn = document.getElementById("startBtn");
const productLink = document.getElementById("productLink");
const loadingScreen = document.getElementById("loadingScreen");

// =====================================
// ANALYZE FUNCTION
// =====================================

function startAnalysis() {

    const link = productLink.value.trim();

    // Check empty input

    if (link === "") {

        alert("Please enter a product link.");

        productLink.focus();

        return;
    }

    // Save link for next page

    localStorage.setItem("productLink", link);

    // Show loading screen

    loadingScreen.classList.add("active");

    // Simulate AI analysis

    setTimeout(() => {

        window.location.href = "analysis.html";

    }, 2500);
}

// =====================================
// BUTTON EVENTS
// =====================================

if (analyzeBtn) {

    analyzeBtn.addEventListener("click", startAnalysis);

}

if (startBtn) {

    startBtn.addEventListener("click", () => {

        document.querySelector(".hero").scrollIntoView({

            behavior: "smooth"

        });

        productLink.focus();

    });

}

// =====================================
// ENTER KEY SUPPORT
// =====================================

if (productLink) {

    productLink.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            startAnalysis();

        }

    });

}

// =====================================
// CARD ANIMATION ON SCROLL
// =====================================

const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";

            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.2
});

const animatedElements = document.querySelectorAll(".card, .step");

animatedElements.forEach((element) => {

    element.style.opacity = "0";

    element.style.transform = "translateY(40px)";

    element.style.transition = "all 0.8s ease";

    observer.observe(element);

});

// =====================================
// NAVBAR SHADOW ON SCROLL
// =====================================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.25)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

// =====================================
// HERO TEXT EFFECT
// =====================================

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

});

// =====================================
// OPTIONAL LINK VALIDATION
// =====================================

function isValidURL(str) {

    try {

        new URL(str);

        return true;

    } catch {

        return false;

    }

}

// Uncomment below if you want strict URL validation

/*
function startAnalysis() {

    const link = productLink.value.trim();

    if (link === "") {

        alert("Please enter a product link.");
        return;
    }

    if (!isValidURL(link)) {

        alert("Please enter a valid URL.");
        return;
    }

    localStorage.setItem("productLink", link);

    loadingScreen.classList.add("active");

    setTimeout(() => {

        window.location.href = "analysis.html";

    }, 2500);
}
*/

// =====================================
// END
// =====================================