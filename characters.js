const d = document,
  $people = d.getElementById("peopleContainer"),
  $search = d.getElementById("charactersSearch"),
  $template = d.getElementById("charactersTemplate").content,
  $fragment = d.createDocumentFragment(),
  $charactersNav = d.getElementById("charactersNav"),
  $loader = d.getElementById("charactersLoader");

let $prevLink, $nextLink;

export default async function getPeople(url) {
  //Show loader
  $loader.classList.add("active");
  //cleaning the HTML of the section I prevent the old results show until the new results is ready
  $people.innerHTML = "";
  try {
    let res = await fetch(url),
      json = await res.json(),
      characters = await json.results;
    // console.log(characters);

    if (characters.length < 1) {
      //Hide loader
      $loader.classList.remove("active");

      $people.innerHTML = `<h2 class="section-title">No characters found</h2>`;
    } else {
      characters.forEach((el) => {
        //Hide loader
        $loader.classList.remove("active");

        $template.querySelector("h3").textContent = el.name;
        $template.querySelector("div").innerHTML = `
      <br>
      <b>Birth Year: </b>${el.birth_year} <br>
      <b>Gender: </b>${el.gender} <br>
      <b>Hair Color: </b>${el.hair_color} <br>
      <b>Eye Color: </b>${el.eye_color} <br>
      <b>Height: </b>${el.height}
      `;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
    }

    $people.appendChild($fragment);

    $prevLink = json.previous
      ? `<a href="${json.previous}"><span data-link="${json.previous}"><svg data-link="${json.previous}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/ data-link="${json.previous}"></svg></span></a>`
      : "";
    $nextLink = json.next
      ? `<a href="${json.next}"><span data-link="${json.next}"><svg data-link="${json.next}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"/ data-link="${json.next}" ></svg></span></a>`
      : "";

    $charactersNav.innerHTML = `${$prevLink} ${$nextLink}`;
  } catch (err) {
    console.log(err);
  }
}

d.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.matches(".characters-nav *")) {
    // console.log(e.target);
    e.preventDefault();
    getPeople(e.target.getAttribute("data-link"));
  }
});

d.addEventListener("keydown", (e) => {
  if (e.target === $search) {
    if (e.key === "Enter") {
      let link = `https://swapi.dev/api/people/?search=${$search.value.toLowerCase()}`;
      getPeople(link);
    }
  }
});
