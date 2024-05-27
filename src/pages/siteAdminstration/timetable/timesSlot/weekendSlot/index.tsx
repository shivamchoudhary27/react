import WeekendSlotModal from "./form";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getData } from "../../../../../adapters/microservices";

type Props = {
  onHide: any;
  modalShow: any;
  weekendSlotObj: any;
  toggleModalShow: any;
};

const WeekendSlot = (props: Props) => {
  const currentInstitute: number = useSelector(
    (state: any) => state.globalFilters.currentInstitute
  );

  // Initial values of react table === >>>
  const initialValues = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };
  const [initFormValues, setInitFormValues] = useState(initialValues);
  const [weekendData, setWeekendData] = useState([]);
  const [apiStatus, setApiStatus] = useState("started");

  useEffect(() => {
    if (props.weekendSlotObj.id === 0) {
      getData(`/weekdays/${currentInstitute}`, {})
        .then((res: any) => {
          if (res.data !== "") {
            setWeekendData(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
          //   setShowAlert(true);
        });
    } else if (props.weekendSlotObj.id !== 0) {
      getData(`/weekdays/${currentInstitute}`, {
        departmentId: props.weekendSlotObj.id,
      })
        .then((res: any) => {
          if (res.data !== "") {
            setWeekendData(res.data);
          }
        })
        .catch((err: any) => {
          console.log(err);
          //   setShowAlert(true);
        });
    }
  }, [props.weekendSlotObj]);

  useEffect(() => {
    setApiStatus("started");
    if (props.weekendSlotObj.id === 0 || props.weekendSlotObj.id !== 0) {
      let filteredData = [];
      if (props.weekendSlotObj.id === 0) {
        filteredData = weekendData.filter(
          (item: any) => item.departmentId === null
        );
      } else {
        filteredData = weekendData.filter(
          (item: any) => item.departmentId === props.weekendSlotObj.id
        );
      }

      const updatedValues: any = { ...initFormValues };
      filteredData.forEach((item: any) => {
        const lowercaseDays = item.weekDays.map((day: any) =>
          day.toLowerCase()
        );
        Object.keys(updatedValues).forEach((elem: any) => {
          updatedValues[elem] = false;
          setApiStatus("finished");
        });
        lowercaseDays.forEach((el: any) => {
          updatedValues[el] = true;
          setApiStatus("finished");
        });
      });
      setInitFormValues(updatedValues);
    }
  }, [weekendData, props.weekendSlotObj]);

  return (
    <WeekendSlotModal
      apiStatus={apiStatus}
      onHide={props.onHide}
      modalShow={props.modalShow}
      initFormValues={initFormValues}
      currentInstitute={currentInstitute}
      weekendSlotObj={props.weekendSlotObj}
      toggleModalShow={props.toggleModalShow}
    />
  );
};

export default WeekendSlot;
