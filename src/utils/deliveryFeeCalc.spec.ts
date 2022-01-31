import deliveryFeeCalc from'./deliveryFeeCalc'

describe("Function must return deliveryFee", () => {
    test("Returns deliveryFee if deliveryDistance is 1000m or smaller", () => {
        // ARRANGE
        const deliveryDistance = 900; // fake data
        // ACT
        const result  = deliveryFeeCalc(deliveryDistance);

        // ASSERT
        expect(result).toBe(2)
    })

    test("Returns deliveryFee if deliveryDistance is bigger than 1000m", () => {
        // ARRANGE
        const deliveryDistance = 1501; // fake data
        // ACT
        const result  = deliveryFeeCalc(deliveryDistance);

        // ASSERT
        expect(result).toBe(2 + Math.ceil((deliveryDistance - 1000) / 500) * 1)
    })


})