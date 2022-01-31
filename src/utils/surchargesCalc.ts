 // Surcharges
 function surchargeCalc(cartValue: number, amountItems: number): number {
    let difference: number = 10 - cartValue;
    let surcharge: number = 0;

     if (cartValue < 10 && amountItems <= 4) {
        surcharge = difference;
    } else if (cartValue < 10 && amountItems > 4) {
        surcharge = difference + (amountItems - 4) / 2;
    } else if (cartValue >= 10 && amountItems > 4) {
        surcharge = (amountItems - 4) / 2;
    }
    return surcharge
}


export default surchargeCalc