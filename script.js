import getFilms from "./films.js";
import getPeople from "./characters.js";
import getVehicles from "./vehicles.js";
import getPlanets from "./planets.js";

const d = document;

d.addEventListener("DOMContentLoaded", (e) => {
  getFilms("https://swapi.dev/api/films/");
  getPeople("https://swapi.dev/api/people/");
  getVehicles("https://swapi.dev/api/vehicles/");
  getPlanets("https://swapi.dev/api/planets/");
});
