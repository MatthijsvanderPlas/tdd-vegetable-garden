// purpose: get yield for a crop (including enviromental factors)
// input: a object with a name (crop, plant) and a yield and a second object with the enviromental factor
// output: yield (adjusted by factors)
const getYieldForPlant = (plant, factor) => {
    if (factor) {        
        let factoredYield = plant.yield
        for (let key in factor) {
            // If the factor is a negative value we use take the value divide it by a hundred make it a positive and subtract that from 1 -60% then means yield*.4 40% is left of the yield. We then multiply the yield by that number.
            // If the factor is a possitve value we divide the value by a hundred and add 1. We then multiply the yield by that number.
            if (plant.factor[key][factor[key]] < 0){ 
                factoredYield =  factoredYield * (1 - (-1 * (plant.factor[key][factor[key]] /100)))
            } else {
                factoredYield = factoredYield * (1 + (plant.factor[key][factor[key]] /100))
            }
        }
        return Math.round(factoredYield * 100) /100
    }
    return plant.yield
}

// purpose: get yield for a crop object
// input: object with a crop object {crop, yield} and a numCrops variable 
// output: yield * numCrops
const getYieldForCrop = (crop, factor) => {
    if(factor) {
        console.log(getYieldForPlant(crop.crop, factor))
        return getYieldForPlant(crop.crop ,factor) * crop.numCrops
    }
    return getYieldForPlant(crop.crop) * crop.numCrops
}

// purpose: loop over the array of objects and return the totalyield of the crops passed as objects
// input: Array of crop objects 
// output: Total yield as a single number
// Added the enviromental factor into the object in the array and pass it down to the getYieldForCrop function
const getTotalYield = ({ crops }) => {
    return  crops.map(crop => getYieldForCrop(crop, crop.factor)).reduce((total, increment) => total + increment)
}

// purpose: get the costs for a crop
// input: object with cost per crop and a numCrops 
// output: Total cost (cost * number of crops) (number)
const getCostsForCrop = (crop) => {
    return crop.cost * crop.numCrops
}

// purpose: get the revenue for a crop
// input: object with sale price per kilo of the crop and a yield and numCrops to get the getYieldForCrop
// Added the enviromental factor into the function if it is passed in
// output: Total revenue meaning sale price * total amount of kilo/yield of the crop (number)
const getRevenueForCrop = (crop, factor) => {
    if(factor){
        return crop.sale * getYieldForCrop(crop, factor)
    }
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