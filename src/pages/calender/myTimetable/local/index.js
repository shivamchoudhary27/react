//put all these methods in a parent category object
//and then export the category object only
import { makeGetDataRequest } from "../../../../features/apiCalls/getdata";
import { getChildren, updateCategoryLevels } from "../utils";

export const getDragnDropAction = (source, destination) => {
    if (source.level === destination.level) {
        return (source.weight > destination.weight) ? 'upward' : 'downward';
    } else {
        return "newlevelentry";
    }
};

export const getItemsToUpdate = (allItems, dragAction, source, destination) => {
    const itemsToEffect = allItems.filter((e) => {
        if (e.id === source.id) return false;   //source will be updated manually
        if (dragAction === 'newlevelentry' && e.weight >= destination.weight) {
            return true;
        }
        if (dragAction === 'downward' && (e.weight > source.weight && e.weight <= destination.weight)) {
            return true;
        }
        if (dragAction === 'upward' && (e.weight < source.weight && e.weight >= destination.weight)) {
            return true;
        }
    });

    return itemsToEffect;
}

export const updateWeights = (items, action) => {
    let cloneItems = items;

    for (let i = 0; i < cloneItems.length; i++) {
        let newWeight = cloneItems[i].weight;
        
        if (action === 'downward') {
            newWeight = newWeight - 1;
        } else {
            newWeight = newWeight + 1;
        }
        cloneItems[i].weight = newWeight;
    }

    return cloneItems;
}

export const updateSourceProperties = (sourceObj, destinationObj) => {
    const updateItem = sourceObj;
    updateItem.parent = destinationObj.parent;
    updateItem.weight = destinationObj.weight;
    return updateItem;
}

export const cloneCategories = (categoryData) => {
    const cloneArray = [];
    categoryData.map((e) => {
        cloneArray.push(e);
    })
    return cloneArray;
}

export const setHasChildProp = (data) => {
    const newArray = data.map(obj => {
        const hasChild = data.some(item => item.parent === obj.id);
        return { ...obj, haschild: hasChild };
      });
    return newArray;
}

// ========================================================
//           reset the manage course object === >>
// ========================================================
export const resetManageCourseObj = (sortedCategoryData) => {
    const cloneObj = sortedCategoryData;
    for (let i = 0; i < cloneObj.length; i++) {
        for (let j = 0; j < cloneObj[i].courses.length; j++) {
              let newObject = {
                "id": cloneObj[i].courses[j].id,
                "courseid": cloneObj[i].courses[j].id,
                "coursename" : cloneObj[i].courses[j].name,
                "catid": cloneObj[i].id,
                "courses": [],
                "coursedetails" : cloneObj[i].courses[j],
                "files": cloneObj[i].courses[j].files, 
                "published": cloneObj[i].courses[j].published,
                "startDate": cloneObj[i].courses[j].startDate,
                "endDate": cloneObj[i].courses[j].endDate,
              };
          cloneObj.splice(i + 1, 0, newObject);
        }
    }
    return cloneObj;
}

// ========================================================
//                  get URL params === >>
// ========================================================
export const getUrlParams = (location, setUrlArg) => {
    const urlParams = new URLSearchParams(location.search);
    const dpt = parseInt(urlParams.get("dpt"));
    const prg = urlParams.get("prg");
    const prgId = parseInt(urlParams.get("prgId"));
    setUrlArg({ dpt, prg, prgId });
}

// ========================================================
//                 get Timeslot data === >>
// ========================================================
export const getTimeslotData = (currentInstitute, urlArg, setDepartmentTimeslots, setApiStatus) => {
    let endPoint = `/${currentInstitute}/timetable/timeslot`;
    makeGetDataRequest(
      endPoint,
      { departmentId: urlArg.dpt, pageNumber: 0, pageSize: 50 },
      setDepartmentTimeslots,
      setApiStatus
    );
}

// ========================================================
//             get course workload data === >>
// ========================================================
export const getCourseWorkloadtData = (currentInstitute, setCoursesList) => {
    let endPoint = `/${currentInstitute}/trp/user/programs`;
    makeGetDataRequest(
      endPoint,
    //   { pageNumber: 0, pageSize: 100 },
      {},
      setCoursesList,
    );
}

// ========================================================
//        get list of sorted course categories === >>
// ========================================================
export const getSortedCategories = (urlArg ,coursesList, setSortedCategories) => {
    const allCategories = coursesList?.reduce((accumulator, currentValue) => {
        if (currentValue.programId === urlArg?.prgId || urlArg?.prgId === 0){
        accumulator.push(...currentValue.categories);
    }
    return accumulator
    }, []);
    const convertedResult = allCategories
    
        .filter((item) => item.parent === 0)
        .sort((a, b) => a.weight - b.weight)
        .reduce(
        (acc, item) => [
            ...acc,
            item,
            ...getChildren(item, coursesList),
        ],
        []  
        );

    convertedResult.forEach((item) => {
        if (item.parent === 0) {
        item.level = 1;
        updateCategoryLevels(convertedResult, item.id, 2);
        }
    });
    const hasChildPropAdded = setHasChildProp(convertedResult);
    const courseObjAdded = resetManageCourseObj(hasChildPropAdded);
    setSortedCategories(courseObjAdded);
}

export const getRandomStatus = (weekend = false) => {
    if (weekend === true) {
      return {status: "weekend"};
    }
    // Generate a random number between 0 and 1
    var randomNumber = Math.random();
  
    return randomNumber < 0.5 ? 
    {status: "draft", bookedDetais: "TUT SB B204"} 
    : 
    {status: "available"};
}

// ========================================================
//    render table with according to params data === >>
// ========================================================
export const getTableRenderTimeSlots = (departmentTimeslots, timetableData, setTimeslots, weekendTimeslots, courseDates, filters) => {
    let timeslotPacket = [];
    const sortedTimeSlots = departmentTimeslots.items.slice().sort((a, b) => {
      // Convert start times to Date objects for comparison
      const timeA = new Date(`1970-01-01T${a.startTime}`);
      const timeB = new Date(`1970-01-01T${b.startTime}`);

      return timeA - timeB;
    });
    sortedTimeSlots.map((item) => {
        let currentPacket = {
            timeSlot: `${item.startTime} - ${item.endTime}`,
            breakTime: false,
            monday: getTimeSlotDayData(item.id, 'Monday', timetableData.items, weekendTimeslots, courseDates, filters,),   //JSON.stringify(getRandomStatus()),
            tuesday: getTimeSlotDayData(item.id, 'Tuesday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus()),
            wednesday: getTimeSlotDayData(item.id, 'Wednesday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus()),
            thursday: getTimeSlotDayData(item.id, 'Thursday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus()),
            friday: getTimeSlotDayData(item.id, 'Friday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus()),
            saturday: getTimeSlotDayData(item.id, 'Saturday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus()),
            sunday: getTimeSlotDayData(item.id, 'Sunday', timetableData.items, weekendTimeslots, courseDates, filters,),//JSON.stringify(getRandomStatus(true)),
        };
        
        // console.log(item)
      if (item.breakTime === true) {
          currentPacket.breakTime = true;
          currentPacket.breakType =
          item.type.charAt(0).toUpperCase() + item.type.slice(1) + " break";
        }
        timeslotPacket.push(currentPacket);
    });
    setTimeslots(timeslotPacket);
}

// ========================================================
//   get month list between start & end timestamp === >>
// ========================================================
export const getMonthList = (courseData) => {
    const startTimestamp = courseData.startDateTimeStamp;
    const endTimestamp = courseData.endDateTimeStamp;

    // Convert Unix timestamps to Date objects
    const startDate = new Date(startTimestamp);
    const endDate = new Date(endTimestamp);

    const monthsByYear = {};

    let currentDate = new Date(startDate); // Initialize with the start date

    // Iterate through months between start and end date
    while (currentDate <= endDate) {
        const monthName = currentDate.toLocaleString('default', { month: 'long' }); // Get month name
        const year = currentDate.getFullYear(); // Get year
        
        // If the year doesn't exist in the object, create an empty array for it
        if (!monthsByYear[year]) {
            monthsByYear[year] = [];
        }
        
        monthsByYear[year].push(monthName); // Push month name into array for the corresponding year
        
        // Move to the next month by creating a new Date object
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }
    return monthsByYear;
}

// ========================================================
// check sessionDate is lie between start & end date === >>
// ========================================================
const checkSessionDatesIsWithinRange = (filters, sessionDate) => {
    const startDateString = filters.startDate;
    const endDateString = filters.endDate;
    const dateToCheckString = sessionDate;
    
    // Split date strings into day, month, year components
    const [startDay, startMonth, startYear] = startDateString.split('-').map(Number);
    const [endDay, endMonth, endYear] = endDateString.split('-').map(Number);
    const [checkDay, checkMonth, checkYear] = dateToCheckString.split('-').map(Number);

    // Construct Date objects using components (Month - 1 because months are zero-based in JavaScript Date)
    const startDate = new Date(startYear, startMonth - 1, startDay);
    const endDate = new Date(endYear, endMonth - 1, endDay);
    const dateToCheck = new Date(checkYear, checkMonth - 1, checkDay);

    // Check if dateToCheck is between startDate and endDate
    const isWithinRange = dateToCheck >= startDate && dateToCheck <= endDate;

    return isWithinRange;
}
// ========================================================
//       set data according to timeslot & day === >>
// ========================================================
const getTimeSlotDayData = (slotId, day, packet, weekend, courseDates, filters, timeslots) => {
    let response = {};
    const filteredData = packet.filter(item => item.timeSlotId === slotId && item.dayName === day);
    // const filteredTime = timeslots.filter(item => item.id === slotId && item.dayName === day && item.startTime );
    const lowerCaseWeekdays = weekend.map(day => day.toLowerCase());
    // console.log(filteredData)
    if(filteredData.length > 0){
        const x = checkSessionDatesIsWithinRange(filters, filteredData[0].sessionDate)
        // console.log(x)
        if(filteredData[0].status !== null){
            if(filteredData[0].status === "available"){
                response = { status: "available" }
            }else if(filteredData[0].status === "draft" && filteredData[0].bookingStatus === "not_available" && x){  
                response = { status: "not_available"}
            }else if(filteredData[0].status === "draft" && filteredData[0].bookingStatus === "booked" && x){  
                response = { status: "draft", bookedDetais: filteredData[0].description, weekDay: filteredData[0].dayName, timeSlotId:filteredData[0].timeSlotId, sessionDate:filteredData[0].sessionDate, slotDetailId:filteredData[0].timeTableSlotDetailId}
            }else if(filteredData[0].status === "change-request" && filteredData[0].bookingStatus === "booked" && x){  
                response = { status: "changeRequest", bookedDetais: filteredData[0].description, weekDay: filteredData[0].dayName, timeSlotId:filteredData[0].timeSlotId, sessionDate:filteredData[0].sessionDate, slotDetailId:filteredData[0].timeTableSlotDetailId, changeRequestId:filteredData[0].changeRequestId}
            }else{
                response = { status: "available" }
            }
        }
    }else{
        if(lowerCaseWeekdays.includes(day.toLowerCase())){
            response = { status: "weekend" }
        }else if(courseDates.startDate === '--/--/----' && courseDates.endDate === '--/--/----'){
            response = { status: "" }
        }
        else{
            response = { status: "available" }
        }   
    }

    return JSON.stringify(response); 
}