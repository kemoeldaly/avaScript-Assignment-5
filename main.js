document.addEventListener("DOMContentLoaded", function () {
  const apiKey = "LqF6k0Eo3eFh2ErjR5H2uRHLecgHSBJ5ayJqS7VH"

  function searchPlacesByLocation(location) {
    const apiUrl =  `https://developer.nps.gov/api/v1/places?q=${location}&api_key=${apiKey}`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error( `Request failed with status: ${response.status}`);
        }
        return response.json()
      })
      .then((data) => {
        displayPlaces(data);
      })
      .catch((error) => {
        console.error("Error:", error)
      });
   }

   function displayPlaces(data) {
    const placesDiv = document.getElementById("places")
    placesDiv.innerHTML = "";

    data.data.forEach((place) => {
      const placeLink = document.createElement("a");
      placeLink.textContent = place.title;
      placeLink.href = place.url;
      placeLink.target = "_blank";

        const placeElement = document.createElement("div")
      placeElement.appendChild(placeLink);
      placesDiv.appendChild(placeElement);
    });
    }

  const searchButton = document.getElementById("searchButton");
  searchButton.addEventListener("click", () => {
    const locationInput = document.getElementById("locationInput");
    const userInput = locationInput.value.trim();

    if (userInput) {
      searchPlacesByLocation(userInput);
    }
   });

  const locationInput = document.getElementById("locationInput");
  locationInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      searchPlacesByLocation(locationInput.value.trim());
    }
   });

  fetchParkAlerts();
})
