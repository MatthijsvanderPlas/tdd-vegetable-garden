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
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                lots: -60,
                medium: -30,
                little: 100,
                },
            }
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
            wind: {
                lots: -60,
                medium: -30,
                little: 100,
            },
        },
    };

    const environmentFactors = {
        sun: "low",
        wind: "lots"
        };

    const environmentFactors2 = {
        sun: "high",
        wind: "little",
        };

    test("Get yield for plant with environment factors", () => {
        expect(getYieldForPlant(corn)).toBe(30);
        expect(getYieldForPlant(corn, environmentFactors)).toBe(6);
        expect(getYieldForPlant(corn, environmentFactors2)).toBe(90);
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
                high: 100,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };

        const input = {
            crop: corn,
            numCrops: 10,
        };

        const environmentFactors = {
            sun: "low",
            wind: "medium",
            };
        
        const environmentFactors2 = {
            sun: "high",
            wind: "lots",
            };

        expect(getYieldForCrop(input, environmentFactors)).toBe(10.5); // 3 * .5 * .7 * 10
        expect(getYieldForCrop(input, environmentFactors2)).toBe(24); // 3 * 2 * .4 * 10
    });
});

describe("getTotalYield", () => {
    test("Calculate total yield with multiple crops and enviromental factors", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 100,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };
        const pumpkin = {
            name: "pumpkin",
            yield: 4,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 100,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            wind: "little"
            };
        
        const environmentFactors2 = {
            sun: "high",
            wind: "lots"
            };

        const crops = [
            { crop: corn, numCrops: 5, factor: environmentFactors},
            { crop: pumpkin, numCrops: 2, factor: environmentFactors2 },
        ];
        expect(getTotalYield({ crops })).toBe(21.4); // Corn: 3 *.5 * 2 *5 = 15 Pumpkin: 4 * 2 * .4 * 2 = 6.4 Total: 21.4
    });

    test("Calculate total yield with 0 amount", () => {
        const corn = {
            name: "corn",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 100,
                },
            },
        };

        const environmentFactors = {
            sun: "low",
            };
        
        const crops = [{ crop: corn, numCrops: 0, factor: environmentFactors}];
        expect(getTotalYield({ crops })).toBe(0);
    });
});

describe("getRevenueForCrop", () => {
    test("Get revenue for crop, with enviromental factors", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                lots: -60,
                medium: -30,
                little: 100,
                },
            },
        }

        const environmentFactors = {
            sun: "low",
            wind: "medium"
            };
  
        const environmentFactors2 = {
            sun: "high",
            wind: "little"
            };

        const input = {
            crop: brocolli,
            numCrops: 15,
            cost: .5,
            sale: 1.5,
        }

        expect(getRevenueForCrop(input, environmentFactors)).toBe(39.375)
        expect(getRevenueForCrop(input, environmentFactors2)).toBe(337.5)
    })
})

describe("getProfitForCrop", () => {
    test("Get profit for crop, with enviromental factors", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 50,
                },
                wind: {
                lots: -60,
                medium: -30,
                little: 100,
                },
            }
        }
        const input = {
            crop: brocolli,
            numCrops: 15,
            cost: .5,
            sale: 1.5, 
        }

        const factor = {
            sun: "high",
            wind: "little"
        }
        // Profit Brocolli: (5*1.5*2*15*1.5)-(15*.5)
        expect(getProfitForCrop(input, factor)).toBe(330)
    })
})

describe("getTotalProfit", () => {
    test("Get profit for crop, with enviromental factors", () => {
        const brocolli = {
            name: "brocolli",
            yield: 5,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 100,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        }

        const pumpkin = {
            name: "pumpkin",
            yield: 3,
            factor: {
                sun: {
                low: -50,
                medium: 0,
                high: 100,
                },
                wind: {
                    lots: -60,
                    medium: -30,
                    little: 100,
                },
            },
        }

        const crops = [
            { crop: brocolli, numCrops: 15, cost: .5, sale: 1.5, factor: { sun: "low", wind: "lots"}},
            { crop: pumpkin, numCrops: 22, cost: 1, sale: 2, factor: { sun: "high", wind: "little"}}
        ]
        // Brocolli should profit 15: (5*.5*.4*15*1.5) - (15*.5) 
        // Pumpkin should profit  506  : (3*2*2*22*2) - (22*1)
        expect(getTotalProfit(crops)).toBe(521) 
    })
})

