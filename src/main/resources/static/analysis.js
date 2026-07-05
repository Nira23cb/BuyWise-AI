// ==========================================
// BUYWISE ANALYSIS
// ==========================================

// Product URL
const productUrl = localStorage.getItem("productLink");

// Elements
const productName = document.getElementById("productName");
const scoreCircle = document.querySelector(".score-circle");
const summaryCard = document.querySelector(".summary-card p");
const priceElement = document.querySelector(".price");
const buyButton = document.querySelector(".buy-btn");

const prosList = document.getElementById("prosList");
const consList = document.getElementById("consList");

const verdict = document.getElementById("verdict");
const scoreText = document.getElementById("scoreText");

// New Elements
const confidenceBar = document.getElementById("confidenceBar");
const confidenceText = document.getElementById("confidenceText");

const fakeRisk = document.getElementById("fakeRisk");

const positive = document.getElementById("positive");
const neutral = document.getElementById("neutral");
const negative = document.getElementById("negative");

const tipsList = document.getElementById("tipsList");

const bestFor = document.getElementById("bestFor");
const avoidIf = document.getElementById("avoidIf");

if (!productUrl) {

    alert("No product selected.");

    window.location.href = "index.html";

}

productName.textContent = "Analyzing Product...";
priceElement.textContent = "Loading...";
summaryCard.textContent = "Analyzing reviews...";
scoreCircle.textContent = "...";

buyButton.onclick = () => {

    window.open(productUrl, "_blank");

};

fetch("http://localhost:8080/api/analyze", {

    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({

        url: productUrl

    })

})

.then(response => response.json())

.then(data => {

    console.log(data);

    if (!data.choices) {

        alert("Groq returned an error.");

        console.log(data);

        return;

    }

    const aiText = data.choices[0].message.content;

    const analysis = JSON.parse(aiText);

    // Product
    productName.textContent = analysis.productName;

    scoreCircle.textContent = analysis.buyScore;

    summaryCard.textContent = analysis.summary;

    verdict.textContent = analysis.verdict;

    scoreText.textContent = "AI analyzed customer reviews.";

    // Price
    priceElement.textContent = analysis.priceVerdict;

    // Confidence
    confidenceBar.style.width = analysis.confidence + "%";

    confidenceText.textContent = analysis.confidence + "%";

    // Fake Review
    fakeRisk.textContent = analysis.fakeReviewRisk;

    if (analysis.fakeReviewRisk === "Low") {

        fakeRisk.style.color = "lime";

    } else if (analysis.fakeReviewRisk === "Medium") {

        fakeRisk.style.color = "orange";

    } else {

        fakeRisk.style.color = "red";

    }

    // Sentiment
    positive.textContent = analysis.positive;

    neutral.textContent = analysis.neutral;

    negative.textContent = analysis.negative;

    // Pros
    prosList.innerHTML = "";

    analysis.pros.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        prosList.appendChild(li);

    });

    // Cons
    consList.innerHTML = "";

    analysis.cons.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        consList.appendChild(li);

    });

    // Tips
    tipsList.innerHTML = "";

    analysis.buyingTips.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        tipsList.appendChild(li);

    });

    // Best For
    bestFor.innerHTML = "";

    analysis.bestFor.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        bestFor.appendChild(li);

    });

    // Avoid If
    avoidIf.innerHTML = "";

    analysis.avoidIf.forEach(item => {

        const li = document.createElement("li");

        li.textContent = item;

        avoidIf.appendChild(li);

    });

    // Buy Button
    buyButton.onclick = () => {

        window.open(productUrl, "_blank");

    };

})

.catch(error => {

    console.error(error);

    alert("Unable to connect to backend.");

});