export const getLatestWeightForCategory = (id, fullArray) => {
    let largestWeight = fullArray.filter(item => item.parent === id)
    .reduce((prev, curr) => prev.weight > curr.weight ? prev : curr)
    .weight;
    return ++largestWeight;
}