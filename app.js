const userInput = document.getElementById("user-input");
const submitBtn = document.getElementById("submit-btn");
const infoContainer = document.getElementById("info-container");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

submitBtn.addEventListener("click", function () {
  const gameTitle = userInput.value;
  fetch(
    `https://www.cheapshark.com/api/1.0/deals?title=${encodeURIComponent(
      gameTitle
    )}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      // Velger de 24 første dealsene den finner
      const deals = result.slice(0, 24);
      infoContainer.textContent = "";
      deals.forEach((data) => {
        // Lag et card element
        const card = document.createElement("div");
        card.classList.add("card");
        // Lag en tittel
        const title = document.createElement("h2");
        title.textContent = data.title;
        // Legg til normalpris
        const normalPrice = document.createElement("p");
        normalPrice.textContent = `Normal price: ${data.normalPrice}`;
        // Legg til salgspris
        const salePrice = document.createElement("p");
        salePrice.textContent = `Sale price: ${data.salePrice}`;
        // Legg til metacritic score
        const metacriticScore = document.createElement("p");
        metacriticScore.textContent = `Metacritic score: ${data.metacriticScore}`;
        // Legg til steamrating
        const steamrating = document.createElement("p");
        steamrating.textContent = `Steamrating: ${data.steamRatingPercent}%`;
        // Legg til thumbnail
        const thumbnail = document.createElement("img");
        thumbnail.src = `${data.thumb}`;
        // Append alt til kortet
        card.appendChild(title);
        card.appendChild(normalPrice);
        card.appendChild(salePrice);
        card.appendChild(metacriticScore);
        card.appendChild(steamrating);
        card.appendChild(thumbnail);
        // Append kortet til containeren
        infoContainer.appendChild(card);
      });
    })
    .catch((error) => console.log("error", error));
});
