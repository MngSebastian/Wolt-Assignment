 // Surcharges
 function deliveryFeeCalc(deliveryDistance: number): number {
    let deliveryFee: number = 0;

    if (deliveryDistance <= 1000) {
        deliveryFee = 2;
    } else {
        deliveryFee = 2 + Math.ceil((deliveryDistance - 1000) / 500) * 1;
    }
    
     return deliveryFee
}


export default deliveryFeeCalc

