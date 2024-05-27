// import MappingTable from "./mappingTable";
// import { useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import { getData } from "../../../../adapters/microservices";

// type Props = {
//   setActiveTab: any;
//   refreshTab: boolean;
//   tabRefreshToggle: any;
// };

// const MappingCOsPOsPSOs = (props: Props) => {
//   const { cid } = useParams();
//   const [posAverage, setPosAverage] = useState({});
//   const [programOutcomeDtos, setProgramOutcomeDtos] = useState({});
//   const [programOutcomes, setProgramOutcomes] = useState({ items: [] });
//   const [programoutcomeApiStatus, setProgramoutcomeApiStatus] = useState("");

//   useEffect(() => {
//     setProgramoutcomeApiStatus("started");
//     getData(`/${cid}/programoutcome/level`, {})
//       .then((res: any) => {
//         if (res.data !== "" && res.status === 200) {
//           const convertedData = {};
//           const convertAverage = {};

//           // Initialize convertedData with empty values for PO1 to PO14 for each item
//           res.data.items.forEach(
//             (item: { programOutcomeDtos: any[]; id: string | number }) => {
//               const poArray = Array.from(
//                 { length: 14 },
//                 (_, index) => index + 1
//               );

//               const programOutcomeDtos = item.programOutcomeDtos.map((po) => {
//                 po.name.replace("PO", "");
//               });

//               poArray.forEach((po) => {
//                 const key = `PO${po}_${item.id}`;
//                 if (!programOutcomeDtos.includes(po.toString())) {
//                   convertedData[item.id] = convertedData[item.id] || [];
//                   convertAverage[`PO${po}`] = "";
//                   convertedData[item.id].push({
//                     name: `PO${po}`,
//                     value: "",
//                     average: "",
//                     id: "",
//                   });
//                 }
//               });
//             }
//           );

//           // Update convertedData with actual values for PO1 to PO14 if available
//           res.data.items.forEach(
//             (item: { id: string | number; programOutcomeDtos: any[] }) => {
//               convertedData[item.id] = convertedData[item.id] || [];
//               item.programOutcomeDtos.forEach((po) => {
//                 const key = `PO${po.name}_${item.id}`;
//                 convertAverage[po.name] = po.average;
//                 // posAverage['avg'] = po.average;
//                 convertedData[item.id].push({
//                   name: po.name,
//                   value: po.value,
//                   average: po.average,
//                   id: po.id,
//                 });
//               });
//             }
//           );

//           // Sort array by numerical part of the name property (e.g., PO1, PO2, PO3, etc.)
//           for (const id in convertedData) {
//             convertedData[id].sort((a, b) => {
//               const numA = parseInt(a.name.replace("PO", ""));
//               const numB = parseInt(b.name.replace("PO", ""));
//               return numA - numB;
//             });
//           }

//           // Extract entries of average, sort by name, and reconstruct the object
//           const sortedConvertAverage = Object.fromEntries(
//             Object.entries(convertAverage).sort(([keyA], [keyB]) => {
//               const poA = parseInt(keyA.slice(2));
//               const poB = parseInt(keyB.slice(2));
//               return poA - poB;
//             })
//           );

//           setProgramOutcomes(res.data);
//           setPosAverage(sortedConvertAverage);
//           setProgramOutcomeDtos(convertedData);
//         }
//         setProgramoutcomeApiStatus("finished");
//       })
//       .catch((err: any) => {
//         setProgramoutcomeApiStatus("finished");
//         console.log(err);
//       });
//   }, [props.setActiveTab, props.refreshTab]);

//   return (
//     <MappingTable
//       posAverage={posAverage}
//       setActiveTab={props.setActiveTab}
//       programOutcomes={programOutcomes.items}
//       programOutcomeDtos={programOutcomeDtos}
//       tabRefreshToggle={props.tabRefreshToggle}
//       programoutcomeApiStatus={programoutcomeApiStatus}
//     />
//   );
// };

// export default MappingCOsPOsPSOs;


import MappingTable from "./mappingTable";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getData } from "../../../../adapters/microservices";

type Props = {
  setActiveTab: any;
  refreshTab: boolean
  tabRefreshToggle: any
};

const MappingCOsPOsPSOs = (props: Props) => {
  const { cid } = useParams();
  const [posAverage, setPosAverage] = useState({});
  const [programOutcomeDtos, setProgramOutcomeDtos] = useState({});
  const [programOutcomes, setProgramOutcomes] = useState({ items: [] });
  const [programoutcomeApiStatus, setProgramoutcomeApiStatus] = useState("");
  
  useEffect(() => {
    setProgramoutcomeApiStatus("started")
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

              const programOutcomeDtos = item.programOutcomeDtos.map((po) =>
                po.name.replace("PO", "")
              );

              poArray.forEach((po) => {
                const key = `PO${po}_${item.id}`;
                if (!programOutcomeDtos.includes(po.toString())) {
                  convertedData[item.id] = convertedData[item.id] || [];
                  convertAverage[`PO${po}`] = "";
                  convertedData[item.id].push({
                    name: `PO${po}`,
                    value: "",
                    average: "",
                    id: "",
                  });
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
                // posAverage['avg'] = po.average;
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
              const numA = parseInt(a.name.replace("PO", ""));
              const numB = parseInt(b.name.replace("PO", ""));
              return numA - numB;
            });
          }

          // Extract entries of average, sort by name, and reconstruct the object
          const sortedConvertAverage = Object.fromEntries(
            Object.entries(convertAverage).sort(([keyA], [keyB]) => {
              const poA = parseInt(keyA.slice(2));
              const poB = parseInt(keyB.slice(2));
              return poA - poB;
            })
          );

          setProgramOutcomes(res.data);
          setPosAverage(sortedConvertAverage);
          setProgramOutcomeDtos(convertedData);
        }
        setProgramoutcomeApiStatus("finished")
      })
      .catch((err: any) => {
        setProgramoutcomeApiStatus("finished")
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