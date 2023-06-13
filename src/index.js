import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { createRoot } from "react-dom/client";
import App from "./App";

// document.addEventListener("DOMContentLoaded", () => {
let Dialect = "2020-12";
let dialect;

const url = window.location.href;
const urlParts = url.split("/");
let draftPart;
for (const part of urlParts) {
  if (part.includes("draft")) {
    draftPart = part;
    break;
  }
}
if (draftPart) {
  dialect = draftPart.substring(draftPart.indexOf("draft") + "draft".length);
}

switch (dialect) {
  case "2020-12":
  case "2019-09":
  case "7":
  case "6":
  case "4":
  case "3":
    Dialect = dialect;
    break;
}

//fetching json data from url
function handleRemoteDataFetch(Dialect) {
  fetch(`https://bowtie-json-schema.github.io/bowtie/draft${Dialect}.jsonl`)
    .then((response) => response.text())
    .then((jsonl) => {
      const dataObjectsArray = jsonl.trim().split(/\n(?=\{)/);
      const lines = dataObjectsArray.map((line) => JSON.parse(line));
      const root = createRoot(document.getElementById("root"));

      root.render(<App lines={lines} />);
    });
}
handleRemoteDataFetch(Dialect);

function handleFileUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const json = e.target.result;
    const dataObjectsArray = json.trim().split(/\n(?=\{)/);
    const lines = dataObjectsArray.map((line) => JSON.parse(line));
    const root = createRoot(document.getElementById("root"));

    root.render(<App lines={lines} />);
  };

  reader.readAsText(file);
}
// document.addEventListener("DOMContentLoaded", function () {
//   const input = document.getElementsByClassName('fileInput');
//   console.log(input[0]);
// });

// });
