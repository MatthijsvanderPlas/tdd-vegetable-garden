// purpose: get yield for a crop
// input: a object with a name (crop, plant) and a yield 
// output: yield
const getYieldForPlant = (plant) => {
    return plant.yield
}

// purpose: get yield for a crop object
// input: object with a crop object {crop, yield} and a numCrops variable 
// output: yield * numCrops
const getYieldForCrop = (crop) => {
    return crop.crop.yield * crop.numCrops
}

// purpose: loop over the array of objects and return the totalyield of the crops passed as objects
// input: Array of crop objects 
// output: Total yield as a single number
const getTotalYield = ({ crops }) => {
    return  crops.map(crop => getYieldForCrop(crop)).reduce((total, increment) => total + increment)
}

// purpose: get the costs for a crop
// input: object with cost per crop  a crop 
// output: Total cost (cost * number of crops) (number)
const getCostsForCrop = (crop) => {
    return crop.cost * crop.numCrops
}

const getRevenueForCrop = (crop) => {
    return crop.sale * getYieldForCrop(crop)
}



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
}