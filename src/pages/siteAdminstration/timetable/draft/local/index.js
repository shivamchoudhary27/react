//put all these methods in a parent category object
//and then export the category object only
import { makeGetDataRequest } from "../../../../../features/apiCalls/getdata";
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

export const getUrlParams = (location, setUrlArg) => {
    const urlParams = new URLSearchParams(location.search);
    const dpt = parseInt(urlParams.get("dpt"));
    const prg = urlParams.get("prg");
    const prgId = parseInt(urlParams.get("prgId"));
    setUrlArg({ dpt, prg, prgId });
}

export const getTimeslotData = (currentInstitute, urlArg, setDepartmentTimeslots, setApiStatus) => {
    let endPoint = `/${currentInstitute}/timetable/timeslot`;
    makeGetDataRequest(
      endPoint,
      { departmentId: urlArg.dpt, pageNumber: 0, pageSize: 50 },
      setDepartmentTimeslots,
      setApiStatus
    );
}

export const getCourseWorkloadtData = (urlArg, setCoursesList) => {
    let endPoint = `${urlArg.prgId}/category/course/workloads`;
    makeGetDataRequest(
      endPoint,
      { pageNumber: 0, pageSize: 100 },
      setCoursesList
    );
}

export const getSortedCategories = (coursesList, setSortedCategories) => {
    const convertedResult = coursesList.items
        .filter((item) => item.parent === 0)
        .sort((a, b) => a.weight - b.weight)
        .reduce(
        (acc, item) => [
            ...acc,
            item,
            ...getChildren(item, coursesList.items),
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
    {status: "booked", bookedDetais: "TUT SB B204"} 
    : 
    {status: "available"};
}

export const getTableRenderTimeSlots = (departmentTimeslots, timetableData, setTimeslots, weekendTimeslots) => {
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
            monday: getTimeSlotDayData(item.id, 'Monday', timetableData.items, weekendTimeslots),   //JSON.stringify(getRandomStatus()),
            tuesday: getTimeSlotDayData(item.id, 'Tuesday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus()),
            wednesday: getTimeSlotDayData(item.id, 'Wednesday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus()),
            thursday: getTimeSlotDayData(item.id, 'Thursday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus()),
            friday: getTimeSlotDayData(item.id, 'Friday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus()),
            saturday: getTimeSlotDayData(item.id, 'Saturday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus()),
            sunday: getTimeSlotDayData(item.id, 'Sunday', timetableData.items, weekendTimeslots),//JSON.stringify(getRandomStatus(true)),
        };
        
        // console.log(currentPacket,timetableData)
      if (item.breakTime === true) {
          currentPacket.breakTime = true;
          currentPacket.breakType =
          item.type.charAt(0).toUpperCase() + item.type.slice(1) + " break";
        }
        timeslotPacket.push(currentPacket);
    });

    setTimeslots(timeslotPacket);
}

// export const getWeekendTimeslot = () => {}

const getTimeSlotDayData = (slotId, day, packet, weekend) => {

    let response = {};
    const filteredData = packet.filter(item => item.timeSlotId === slotId && item.dayName === day);
    const lowerCaseWeekdays = weekend.map(day => day.toLowerCase());
    
    if (filteredData.length > 0) {
        console.log("filteredData-------", filteredData)
        if (filteredData[0].status !== null) {
            response = {status: "available"};
        } else {
            response = {status: "booked", bookedDetais: "TUT SB B204"} 
        }
    } 
    else{
        if (lowerCaseWeekdays.includes(day.toLowerCase())) {
            response = { status: "weekend" };
        } else {
            response = { status: "available" };
        }
    }

    return JSON.stringify(response); 
}