import CasesSection from "./components/Cases/CasesSection";
import { RunTimeInfoModal } from "./components/Modals/RunTimeInfoModal";
import NavBar from "./components/NavBar";
import RunInfoSection from "./components/RunInfo/RunInfoSection";
import SummarySection from "./components/Summary/SummarySection";
import { RunInfo } from "./data/runInfo";
import { DetailsButtonModal } from "./components/Modals/DetailsButtonModal";
import InputDataHandler from "./components/InputDataHandler";
import { useEffect, useState } from "react";

function App(props) {
  const [lines, setLines] =useState(props.lines);
  console.log(lines)

  useEffect(() => {
    function handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const json = e.target.result;
        const dataObjectsArray = json.trim().split(/\n(?=\{)/);
        var liness = dataObjectsArray.map((line) => JSON.parse(line));
        console.log('file loaded')
        setLines(liness);
        // lines = liness;
        console.log(lines)
      };

      reader.readAsText(file);
    }
    const inputFile = document.querySelector("#fileInput");
    inputFile.onchange = handleFileUpload;
  }, []);

  const runInfo = new RunInfo(lines);

  const summary = runInfo.createSummary();

  document.getElementsByTagName("title")[0].textContent +=
    " " + runInfo.dialectShortName;

  return (
    <div>
      <NavBar runInfo={runInfo} />
      <div className="container p-4">
        <InputDataHandler />
        <RunInfoSection runInfo={runInfo} />
        <SummarySection lines={lines} />
        <CasesSection lines={lines} />
      </div>
      <RunTimeInfoModal lines={lines} summary={summary} />
      <DetailsButtonModal lines={lines} summary={summary} />
    </div>
  );
}
export default App;
