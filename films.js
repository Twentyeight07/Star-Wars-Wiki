const d = document,
  $films = d.getElementById("filmsContainer"),
  $template = d.getElementById("filmsTemplate").content,
  $fragment = d.createDocumentFragment(),
  $loader = d.getElementById("filmsLoader");

let $prevLink, $nextLink;

export default async function getFilms(url) {
  $loader.classList.add("active");
  $films.innerHTML = "";

  try {
    let res = await fetch(url),
      json = await res.json(),
      films = await json.results;
    // console.log(films);

    films.forEach((el) => {
      $loader.classList.remove("active");

      $template.querySelector("h3").textContent = el.title;
      $template.querySelector(".card-content").innerHTML = `
      <br>
      <b>Release Date: </b>${el.release_date} <br>
      <b>Episode: </b>${el.episode_id} <br>
      <b>Producer: </b>${el.producer} <br>
      <b>Director: </b>${el.director} <br>
      `;
      $template.querySelector(".opening-crawl").innerHTML = `
      <br>
      <p>
      <b>Opening Crawl: </b>${el.opening_crawl} <br>
      </p>
      `;

      $films.innerHTML = "";

      let $clone = d.importNode($template, true);
      $fragment.appendChild($clone);
    });

    $films.appendChild($fragment);
  } catch (err) {
    console.log(err);
  }
}
