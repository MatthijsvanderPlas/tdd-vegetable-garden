// input: a object with a name (crop, plant) and a yield 
// output: yield
const getYieldForPlant = (plant) => {
    return plant.yield
}

// input: object with a crop object {crop, yield} and a numCrops variable 
// output: yield * numCrops
const getYieldForCrop = (plant) => {
    return plant.crop.yield * plant.numCrops
}

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
}