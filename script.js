const apiUrl = "https://api.github.com/repos/gitwitorg/gitwit-templates/contents/";

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

async function populateGrid(filterText = "") {
  const gridContainer = document.querySelector(".grid-container");
  gridContainer.innerHTML = ''; // Clear existing content

  const data = await fetchData(apiUrl);

  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      if (item.type === "dir" && item.name.toLowerCase().includes(filterText.toLowerCase())) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");

        const title = document.createElement("div");
        title.classList.add("title");

        const image = document.createElement("img");
        image.height = 12;
        image.style.marginLeft = "4px";
        image.style.marginRight = "4px";
        image.style.marginTop= "4px";
        image.src = `./git-icon-white.png`;
        const a = document.createElement("a");
        a.href = `https://www.github.com/gitwitorg/gitwit-templates/tree/main/${item.name}`;
        a.target = "_blank";
        a.appendChild(image);
        title.appendChild(a);

        const p = document.createElement("span");
        p.textContent = item.name.replace(/-/g, " ");
        title.appendChild(p);

        const button = document.createElement("button");
        button.textContent = "𐌢";
        title.appendChild(button);

        const content = document.createElement("div");
        content.classList.add("content");

        const link = document.createElement("a");
        link.href = `https://react.gitwit.dev/template/${item.name}`;
        link.target = "_blank";

        const screenshot = document.createElement("img");
        screenshot.src = `https://raw.githubusercontent.com/gitwitorg/gitwit-templates/main/${item.name}/screenshot.png`;

        link.appendChild(screenshot);
        content.appendChild(link);

        gridItem.appendChild(title);
        gridItem.appendChild(content);

        gridContainer.appendChild(gridItem);
      }
    });
  }
}

// Call populateGrid initially to populate the HTML
populateGrid();

// Event listener for search bar input
const searchBar = document.querySelector("#searchbar");
searchBar.addEventListener("input", () => {
  populateGrid(searchBar.value);
});

document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', event => {
      const faq = event.target.parentNode;
      const answer = faq.querySelector('.faq-answer');
      
      faq.classList.toggle('closed'); // Toggle the 'open' class on the FAQ
      
      if (faq.classList.contains('closed')) {
          answer.style.display = 'none';
      } else {
          answer.style.display = 'block';
      }
  });
});
