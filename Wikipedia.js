let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")

function createAppendData(result) {
    let itemsCard = document.createElement("div");
    itemsCard.classList.add("result-item");
    searchResultsEl.appendChild(itemsCard);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = result.link;
    resultTitle.textContent = result.title;
    itemsCard.appendChild(resultTitle);

    let br = document.createElement("br");
    itemsCard.appendChild(br);

    let resultLink = document.createElement("a");
    resultLink.classList.add("result-url");
    resultLink.textContent = result.link;
    resultLink.href = result.link;
    itemsCard.appendChild(resultLink);

    let resultDescription = document.createElement("p");
    resultDescription.classList.add("link-description");
    resultDescription.textContent = result.description;
    itemsCard.appendChild(resultDescription);

}

function gotTheSearchedData() {
    let url = "https://apis.ccbp.in/wiki-search?search=";
    let searchVal = searchInputEl.value;
    let options = {
        method: "GET"
    }
    spinnerEl.classList.remove("d-none");
    fetch(url + searchVal, options).then(function(response) {
            return response.json();
        })
        .then(function(data) {
            spinnerEl.classList.add("d-none");
            let search_results = data.search_results;
            for (let result of search_results) {
                createAppendData(result);
            }

        });
}

searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        gotTheSearchedData();
    }
})