export const capitalizeFirstWords = (str) => {
    if (str === "") {
        return "";
    }
    // Convert the entire string to lowercase first
    const lowerCaseStr = str.toLowerCase();
    // Split the string into words, capitalize each word, and join them back together
    return lowerCaseStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};