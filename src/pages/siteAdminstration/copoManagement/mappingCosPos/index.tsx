import MappingTable from "./mappingTable";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData } from "../../../../adapters/microservices";

type Props = {
  setActiveTab: any;
  refreshTab: boolean;
  tabRefreshToggle: any;
};

const MappingCOsPOsPSOs = (props: Props) => {
  const { cid } = useParams();
  const [posAverage, setPosAverage] = useState({});
  const [programOutcomeDtos, setProgramOutcomeDtos] = useState({});
  const [programOutcomes, setProgramOutcomes] = useState({ items: [] });
  const [programoutcomeApiStatus, setProgramoutcomeApiStatus] = useState("");

  useEffect(() => {
    setProgramoutcomeApiStatus("started");
    getData(`/${cid}/programoutcome/level`, {})
      .then((res: any) => {
        if (res.data !== "" && res.status === 200) {
          const convertedData = {};
          const convertAverage = {};

          // Initialize convertedData with empty values for PO1 to PO14 for each item
          res.data.items.forEach(
            (item: { programOutcomeDtos: any[]; id: string | number }) => {
              const poArray = Array.from(
                { length: 14 },
                (_, index) => index + 1
              );

              const programOutcomeDtos = item.programOutcomeDtos.map((po) => {
                return po.name.replace("PO", "");
              });

              poArray.forEach((po) => {
                const key = `PO${po}_${item.id}`;
                if (!programOutcomeDtos.includes(po.toString())) {
                  if (po == 13) {
                    if (!programOutcomeDtos.includes("PSO1")) {
                      convertedData[item.id] = convertedData[item.id] || [];
                      convertAverage[`PSO${1}`] = "";
                      convertedData[item.id].push({
                        name: `PSO${1}`,
                        value: "",
                        average: "",
                        id: "",
                      });
                    }
                  } else if (po == 14) {
                    if (!programOutcomeDtos.includes("PSO2")) {
                      convertedData[item.id] = convertedData[item.id] || [];
                      convertAverage[`PSO${2}`] = "";
                      convertedData[item.id].push({
                        name: `PSO${2}`,
                        value: "",
                        average: "",
                        id: "",
                      });
                    }
                  } else {
                    convertedData[item.id] = convertedData[item.id] || [];
                    convertAverage[`PO${po}`] = "";
                    convertedData[item.id].push({
                      name: `PO${po}`,
                      value: "",
                      average: "",
                      id: "",
                    });
                  }
                }
              });
            }
          );

          // Update convertedData with actual values for PO1 to PO14 if available
          res.data.items.forEach(
            (item: { id: string | number; programOutcomeDtos: any[] }) => {
              convertedData[item.id] = convertedData[item.id] || [];
              item.programOutcomeDtos.forEach((po) => {
                const key = `PO${po.name}_${item.id}`;
                convertAverage[po.name] = po.average;
                convertedData[item.id].push({
                  name: po.name,
                  value: po.value,
                  average: po.average,
                  id: po.id,
                });
              });
            }
          );

          // Sort array by numerical part of the name property (e.g., PO1, PO2, PO3, etc.)
          for (const id in convertedData) {
            convertedData[id].sort((a, b) => {
              // Extract numerical parts
              const numA = parseInt(a.name.replace(/[^0-9]/g, ""));
              const numB = parseInt(b.name.replace(/[^0-9]/g, ""));

              // Extract prefixes
              const prefixA = a.name.match(/^[A-Z]+/)[0];
              const prefixB = b.name.match(/^[A-Z]+/)[0];

              // Compare prefixes first
              if (prefixA < prefixB) return -1;
              if (prefixA > prefixB) return 1;

              // If prefixes are the same, compare numerical parts
              return numA - numB;
            });
          }

          // Extract entries of average, sort by name, and reconstruct the object
          const sortedConvertAverage = Object.fromEntries(
            Object.entries(convertAverage).sort(([keyA], [keyB]) => {
              // Extract numerical parts
              const numA = parseInt(keyA.replace(/[^0-9]/g, ""));
              const numB = parseInt(keyB.replace(/[^0-9]/g, ""));

              // Extract prefixes
              const prefixA = keyA.match(/^[A-Z]+/)[0];
              const prefixB = keyB.match(/^[A-Z]+/)[0];

              // Compare prefixes first
              if (prefixA < prefixB) return -1;
              if (prefixA > prefixB) return 1;

              // If prefixes are the same, compare numerical parts
              return numA - numB;
            })
          );

          setProgramOutcomes(res.data);
          setPosAverage(sortedConvertAverage);
          setProgramOutcomeDtos(convertedData);
        }
        setProgramoutcomeApiStatus("finished");
      })
      .catch((err: any) => {
        setProgramoutcomeApiStatus("finished");
        console.log(err);
      });
  }, [props.refreshTab]);

  return (
    <MappingTable
      posAverage={posAverage}
      setActiveTab={props.setActiveTab}
      programOutcomes={programOutcomes.items}
      programOutcomeDtos={programOutcomeDtos}
      tabRefreshToggle={props.tabRefreshToggle}
      programoutcomeApiStatus={programoutcomeApiStatus}
    />
  );
};

export default MappingCOsPOsPSOs;
