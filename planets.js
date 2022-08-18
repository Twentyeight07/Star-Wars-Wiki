const d = document,
  $planets = d.getElementById("planetsContainer"),
  $search = d.getElementById("planetsSearch"),
  $template = d.getElementById("planetsTemplate").content,
  $fragment = d.createDocumentFragment(),
  $planetsNav = d.getElementById("planetsNav"),
  $loader = d.getElementById("planetsLoader");

let $prevLink, $nextLink;

export default async function getPlanets(url) {
  //Show loader
  $loader.classList.add("active");
  $planets.innerHTML = "";

  try {
    let res = await fetch(url),
      json = await res.json(),
      planets = await json.results;
    // console.log(planets);

    if (planets.length < 1) {
      //Hide loader
      $loader.classList.remove("active");

      $planets.innerHTML = `<h2 class="section-title">No planets found</h2>`;
    } else {
      planets.forEach((el) => {
        //Hide loader
        $loader.classList.remove("active");

        $template.querySelector("h3").textContent = el.name;
        $template.querySelector("div").innerHTML = `
      <br>
      <b>Terrain: </b>${el.terrain} <br>
      <b>Surface Water: </b>${el.surface_water} <br>
      <b>Gravity: </b>${el.gravity} <br>
      <b>Population: </b>${el.population} <br>
      <b>Climate: </b>${el.climate} <br>
      <b>Diameter: </b>${el.diameter} <br>
      <b>Orbital Period: </b>${el.orbital_period} <br>
      <b>Rotation Period: </b>${el.rotation_period}
      `;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
    }

    $planets.appendChild($fragment);

    $prevLink = json.previous
      ? `<a href="${json.previous}"><span data-link="${json.previous}"><svg data-link="${json.previous}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/ data-link="${json.previous}"></svg></span></a>`
      : "";
    $nextLink = json.next
      ? `<a href="${json.next}"><span data-link="${json.next}"><svg data-link="${json.next}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"/ data-link="${json.next}" ></svg></span></a>`
      : "";
    $planetsNav.innerHTML = $prevLink + "" + $nextLink;
  } catch (err) {
    console.log(err);
  }
}

d.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.matches(".planets-nav *")) {
    // console.log(e.target);
    e.preventDefault();
    getPlanets(e.target.getAttribute("data-link"));
  }
});

d.addEventListener("keydown", (e) => {
  if (e.target === $search) {
    if (e.key === "Enter") {
      let link = `https://swapi.dev/api/planets/?search=${$search.value.toLowerCase()}`;
      getPlanets(link);
    }
  }
});
