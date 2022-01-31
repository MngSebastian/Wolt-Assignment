import surchargesCalc from'./surchargesCalc'

describe("Function must return surcharge sum", () => {
    test("Returns difference between cartValue and 10", () => {
        // ARRANGE
        const cartValue = 6; // fake data
        const amountItems = 3;
        // ACT
        const result  = surchargesCalc(cartValue, amountItems);

        // ASSERT
        expect(result).toBe(10 - cartValue)
    })

    test("Returns difference between cartValue and 10 + (amount of Items above 4) / 2", () => {
        // ARRANGE
        const cartValue = 7; // fake object / data
        const amountItems = 6;
        // ACT
        const result  = surchargesCalc(cartValue, amountItems);

        // ASSERT
        expect(result).toBe(10 - cartValue + (amountItems - 4) / 2)
    })

    test("Returns  (amount of Items above 4) / 2", () => {
        // ARRANGE
        const cartValue = 10; // fake object / data
        const amountItems = 7;
        // ACT
        const result  = surchargesCalc(cartValue, amountItems);

        // ASSERT
        expect(result).toBe((amountItems - 4) / 2)
    })
})