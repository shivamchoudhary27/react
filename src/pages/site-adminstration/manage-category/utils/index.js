export const getLatestWeightForCategory = (id, fullArray) => {
    let weight = -1;
    for (let i=0; i < fullArray.length; i++) {
       if (fullArray[i].parent === id) {
          weight = (fullArray[i].weight > weight) ? fullArray[i].weight : weight;
       }
    }


    return ++weight;
}
