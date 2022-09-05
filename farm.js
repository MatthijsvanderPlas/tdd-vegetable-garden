// purpose: get yield for a crop
// input: a object with a name (crop, plant) and a yield 
// output: yield
const getYieldForPlant = (plant, factor) => {
    return plant.yield + (plant.yield * (plant.factor.sun[factor.sun] / 100))
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
// input: object with cost per crop and a numCrops 
// output: Total cost (cost * number of crops) (number)
const getCostsForCrop = (crop) => {
    return crop.cost * crop.numCrops
}

// purpose: get the revenue for a crop
// input: object with sale price per kilo of the crop and a yield and numCrops to get the getYieldForCrop
// output: Total revenue meaning sale price * total amount of kilo/yield of the crop (number)
const getRevenueForCrop = (crop) => {
    return crop.sale * getYieldForCrop(crop)
}

// purpose: get the profit for a crop
// input: object with sale price per kilo, the cost per crop/plant, the number of crops and the yield per crop
// output: Total profit meaning revenue - costs
const getProfitForCrop = crop => {
    return getRevenueForCrop(crop) - getCostsForCrop(crop)
}


// purpose: get the profit for an array of crop/plant objects
// input: Array with objects with sale price per kilo, the cost per crop/plant, the number of crops and the yield per crop
// output: Total profit for every crop in the array meaning revenue - costs and then added together
const getTotalProfit = crops => {
    return crops.map(crop => getProfitForCrop(crop)).reduce((totalProfit, currentProfit) => totalProfit + currentProfit, 0 )
}



module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
}