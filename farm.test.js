const { getYieldForPlant, getYieldForCrop, getTotalYield, getCostsForCrop, getRevenueForCrop, getProfitForCrop, getTotalProfit } = require("./farm");

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
    };

    test("Get yield for plant with no environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
        };
        expect(getYieldForCrop(input)).toBe(30);
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
        };
        const crops = [
            { crop: corn, numCrops: 5 },
            { crop: pumpkin, numCrops: 2 },
        ];
        expect(getTotalYield({ crops })).toBe(23);
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const crops = [{ crop: corn, numCrops: 0 }];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getCostsForCrop", () => {
    test("Get costs for crop, simple", () => {
        const corn = {
            name: "corn",
            yield: 3,
        };
        const input = {
            crop: corn,
            numCrops: 10,
            cost: 1,
        };
        expect(getCostsForCrop(input)).toBe(10);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop, simple", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
        }
        const input = {
            crop: brocolli,
            numCrops: 15,
            cost: .5,
            sale: 1.5,
        }
        expect(getRevenueForCrop(input)).toBe(112.5)
    })
})

describe("getProfitForCrop", () => {
    test("Get profit for crop, simple", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
        }
        const input = {
            crop: brocolli,
            numCrops: 15,
            cost: .5,
            sale: 1.5,
        }
        expect(getProfitForCrop(input)).toBe(105)
    })
})

describe("getTotalProfit", () => {
    test("Get profit for crop, simple", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
        }

        const pumpkin = {
            name: "pumpkin",
            yield: 3,
        }

        const crops = [
            { crop: brocolli, numCrops: 15, cost: .5, sale: 1.5, },
            { crop: pumpkin, numCrops: 22, cost: 1, sale: 2, }
        ]

        expect(getTotalProfit(crops)).toBe(215)
    })
})

describe("getYieldForPlant", () => {
    const corn = {
        name: "corn",
        yield: 30,
        factor: {
            sun: {
            low: -50,
            medium: 0,
            high: 50,
            },
        },
    };

    const environmentFactors = {
        sun: "low",
        };

    const environmentFactors2 = {
        sun: "high",
        };

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
        expect(getYieldForPlant(corn, environmentFactors)).toBe(15);
        expect(getYieldForPlant(corn, environmentFactors2)).toBe(45);
    });
});

describe("getYieldForCrop", () => {
    test("Get yield for crop, with enviroment factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
            },
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "medium",
            };

        expect(getYieldForCrop(input)).toBe(30);
    });
});