export const getLatestWeightForCategory = (id, fullArray) => {
    let weight = -1;
    for (let i=0; i < fullArray.length; i++) {
       if (fullArray[i].parent === id) {
          weight = (fullArray[i].weight > weight) ? fullArray[i].weight : weight;
       }
    }
    
    return ++weight;
}

export const updateCategoryLevels = (data, parentId, level) => {
   data.filter(item => item.parent === parentId).forEach(item => {
     item.level = level;
     updateCategoryLevels(data, item.id, level + 1);
   });
}

export const getChildren = (parent, arr) => {
   return arr.filter(item => item.parent === parent.id)
             .sort((a,b) => a.weight - b.weight)
             .reduce((acc, child) => [...acc, child, ...getChildren(child, arr)], []);
}