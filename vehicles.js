const d = document,
  $vehicles = d.getElementById("vehiclesContainer"),
  $search = d.getElementById("vehiclesSearch"),
  $template = d.getElementById("vehiclesTemplate").content,
  $fragment = d.createDocumentFragment(),
  $vehiclesNav = d.getElementById("vehiclesNav"),
  $loader = d.getElementById("vehiclesLoader");

let $prevLink, $nextLink;

export default async function getVehicles(url) {
  //Show loader
  $loader.classList.add("active");
  //clean HTML
  $vehicles.innerHTML = "";

  try {
    let res = await fetch(url),
      json = await res.json(),
      vehicles = await json.results;
    // console.log(vehicles);

    if (vehicles.length < 1) {
      //hide loader
      $loader.classList.remove("active");

      $vehicles.innerHTML = `<h2 class="section-title">No vehicles found</h2>`;
    } else {
      vehicles.forEach((el) => {
        //Hide loader
        $loader.classList.remove("active");

        $template.querySelector("h3").textContent = el.name;
        $template.querySelector("div").innerHTML = `
      <br>
      <b>Model: </b>${el.model} <br>
      <b>Vehicle Class: </b>${el.vehicle_class} <br>
      <b>Manufacturer: </b>${el.manufacturer} <br>
      <b>Length: </b>${el.length} <br>
      <b>Cost in Credits: </b>${el.cost_in_credits} <br>
      <b>Cargo Capacity: </b>${el.cargo_capacity} <br>
      <b>Crew: </b>${el.crew} <br>
      <b>Passengers: </b>${el.passengers}
      `;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
    }

    $vehicles.appendChild($fragment);

    $prevLink = json.previous
      ? `<a href="${json.previous}"><span data-link="${json.previous}"><svg data-link="${json.previous}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M24 40 8 24 24 8l2.1 2.1-12.4 12.4H40v3H13.7l12.4 12.4Z"/ data-link="${json.previous}"></svg></span></a>`
      : "";
    $nextLink = json.next
      ? `<a href="${json.next}"><span data-link="${json.next}"><svg data-link="${json.next}" xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m24 40-2.1-2.15L34.25 25.5H8v-3h26.25L21.9 10.15 24 8l16 16Z"/ data-link="${json.next}" ></svg></span></a>`
      : "";

    $vehiclesNav.innerHTML = $prevLink + "" + $nextLink;
  } catch (err) {
    console.log(err);
  }
}

d.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.matches(".vehicles-nav *")) {
    // console.log(e.target);
    e.preventDefault();
    getVehicles(e.target.getAttribute("data-link"));
  }
});

d.addEventListener("keydown", (e) => {
  if (e.target === $search) {
    if (e.key === "Enter") {
      let link = `https://swapi.dev/api/vehicles/?search=${$search.value.toLowerCase()}`;
      getVehicles(link);
    }
  }
});
