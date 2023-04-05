//put all these methods in a parent category object
//and then export the category object only

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
                "coursename" : 'CRS-' + cloneObj[i].courses[j].name,
                "courses": []
              };
          cloneObj.splice(i + 1, 0, newObject);
        }
    }
    return cloneObj;
}
