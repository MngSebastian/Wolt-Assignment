import React, { useState } from "react";

export default function DeliveryFeeCalculator() {
    const [cartValue, setCartValue] = useState<number>(0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountItems, setAmountItems] = useState<number>(0);
    const [dateTime, setDateTime] = useState<string>("");
    const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
    let time: number = Number(dateTime.slice(11, 13));
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [surcharge, setSurcharge] = useState<number>(0);

    const handleClick = () => {
        // Free delivery for Cart Values of 100 or more.
        // Dont we still have to calculate surcharges for cart values over 100?
        if (cartValue >= 100) {
            setDeliveryFee(0);
            // add surcharge
        }
        // Calculate Delivery fee for cart values under 100 depending on the time of the day.
        else if (cartValue < 100) {
            // Calculate 'Outside Rush Hour' delivery fee and surcharges.
            let difference: number = 10 - cartValue;
            if (time < 15 || time >= 19) {
                // Surcharges based on Cart Value and amount of items.
                if (cartValue < 10 && amountItems <= 4) {
                    setSurcharge(difference);
                } else if (cartValue < 10 && amountItems > 4) {
                    console.log(surcharge);
                    setSurcharge(difference + (amountItems - 4) / 2);
                } else if (cartValue >= 10 && amountItems > 4) {
                    setSurcharge((amountItems - 4) / 2);
                }
                // Delivery Fee.
                if (deliveryDistance <= 1000) {
                    setDeliveryFee(2);
                } else {
                    setDeliveryFee(
                        2 + Math.ceil((deliveryDistance - 1000) / 500) * 1
                    );
                }
            }

            // Calculate delivery fee and surcharges during 'Rush Hour'.
            else if (time >= 15 && time < 19) {
                // Rush hour surcharges.
                if (cartValue < 10 && amountItems <= 4) {
                    setSurcharge(difference * 1.1);
                } else if (cartValue < 10 && amountItems > 4) {
                    setSurcharge((difference + (amountItems - 4) / 2) * 1.1);
                } else if (cartValue >= 10 && amountItems > 4) {
                    setSurcharge(((amountItems - 4) / 2) * 1.1);
                }
                // Rush Hour Delivery fee
                if (deliveryDistance <= 1000) {
                    setDeliveryFee(2 * 1.1);
                } else if (deliveryDistance > 1000) {
                    setDeliveryFee(
                        (2 + Math.ceil((deliveryDistance - 1000) / 500) * 1) *
                            1.1
                    );
                }
            }
            // console.log("Del fee + sur", deliveryFee + surcharge);
            //     console.log("Delivery fee ", deliveryFee);
            //     console.log("Surcharge", surcharge);
            //     console.log("amount items", amountItems);
        }

        // Delivery fee cannot be bigger than 15.
        // else if (deliveryFee + surcharge > 15) {

        // setSurcharge(0);
        // setDeliveryFee(15);
        // }

        // setDeliveryFee(surcharges);
        setDeliveryPrice(
            deliveryPrice + cartValue + deliveryDistance + amountItems
        );
    };
    if (deliveryFee + surcharge > 15) {
        setSurcharge(0);
        setDeliveryFee(15);
    }
    return (
        <div>
            <div>
                <label>Cart value </label>
                <input
                    value={cartValue}
                    type="number"
                    required
                    onChange={(e) => setCartValue(e.target.valueAsNumber)}
                />
                <label>&euro;</label>
            </div>
            <div>
                <label>Delivery distance </label>
                <input
                    value={deliveryDistance}
                    type="number"
                    required
                    onChange={(e) =>
                        setDeliveryDistance(e.target.valueAsNumber)
                    }
                />
                <label> m</label>
            </div>
            <div>
                <label>Amount of items </label>
                <input
                    value={amountItems}
                    type="number"
                    required
                    onChange={(e) => setAmountItems(e.target.valueAsNumber)}
                />
            </div>
            <div>
                <label>Time </label>
                <input
                    type="datetime-local"
                    value={dateTime}
                    required
                    onChange={(e) => setDateTime(e.target.value)}
                />
                <p>{dateTime}</p>
            </div>
            <button onClick={handleClick}>Calculate delivery price</button>

            <p>Delivery price: {deliveryPrice}$</p>
            {/* <p>del fee {deliveryFee}$</p> */}
            <p>total del fee {surcharge + deliveryFee.toPrecision(20)} $;</p>
            <p>total del fee {(surcharge + deliveryFee).toFixed(10)} $;</p>

            <p>total del fee {surcharge + deliveryFee} $;</p>

            {/* <p>sur {surcharge}</p>
            <p>end delivery fee {deliveryFee}$</p> */}
        </div>
    );
}
// if (cartValue >= 100) {
//     setDeliveryFee(0);
// }
// Calculate delivery fee for carts under 100.
// else {
//     // Calculate 'Outside Rush Hour' delivery fee.
//     if (time < 15 && time > 19) {
//         if (deliveryDistance <= 1000) {

//             setDeliveryFee(2);
//         } else if (deliveryDistance > 1000) {
//             setDeliveryFee(
//                 2 + Math.ceil((deliveryDistance - 1000) / 500) * 1
//             );
//         }
//     }
// Multiply by 1.1 during rush hour.
// calculate multiplication only after you have all data such ass all possible surcharges.

// let difference: number = 0;
// if (cartValue < 10) {
//     difference = 10 - cartValue;
// } else if (cartValue >= 10) {
//     return cartValue;
// }
// // if the amount of items > 4, add 50 cents per item above 4
// if (amountItems <= 4) {
//     return amountItems;
// } else if (amountItems > 4) {
//     setSurcharge(difference + (amountItems - 4) / 2);
// }
// // Delivery Fee.
// if (deliveryDistance <= 1000) {
//     setDeliveryFee(2);
// } else {
//     setDeliveryFee(
//         2 + Math.ceil((deliveryDistance - 1000) / 500) * 1
//     );
// }

// const handleClick = () => {
//     // Free delivery for Cart Values of 100 or more.
//     if (cartValue >= 100) {
//         setDeliveryFee(0);
//     }
//     // Calculate Delivery fee for cart values under 100 depending on the time of the day.
//     else {
//         // Calculate 'Outside Rush Hour' delivery fee and surcharges.
//         if (time < 15 && time > 19) {
//             let difference: number = 0;
//             if (cartValue < 10) {
//                 difference = 10 - cartValue;
//             } else if (cartValue >= 10) {
//                 return cartValue;
//             }
//             // if the amount of items > 4, add 50 cents per item above 4
//             if (amountItems <= 4) {
//                 return amountItems;
//             } else if (amountItems > 4) {
//                 setSurcharge(difference + (amountItems - 4) / 2);
//             }
//             // Delivery Fee.
//             if (deliveryDistance <= 1000) {
//                 setDeliveryFee(2);
//             } else {
//                 setDeliveryFee(
//                     2 + Math.ceil((deliveryDistance - 1000) / 500) * 1
//                 );
//             }
//         }
//         // Multiply Total fee and surcharges by 1.1 during 'Rush Hour'.
//         else if (time > 15 && time < 19) {
//             // Rush hour surcharges.
//             // Rushhour delivery fee.
//             if (deliveryDistance <= 1000) {
//                 setDeliveryFee(2 * 1.1);
//             } else {
//                 setDeliveryFee(
//                     (2 + Math.ceil((deliveryDistance - 1000) / 500) * 1) *
//                         1.1
//                 );
//             }
//         }
//     }

//     // Delivery fee cannot be bigger than 15.
//     if (deliveryFee > 15) {
//         setDeliveryFee(15);
//     }

//     // setDeliveryFee(surcharges);
//     setDeliveryPrice(
//         deliveryPrice + cartValue + deliveryDistance + amountItems
//     );
// };

// // works
// if (amountItems <= 4 && cartValue < 10) {
//     setSurcharge(difference);
//     console.log("this sucka work");
// }
// // doesent work
// else if (amountItems > 4 && cartValue >= 10) {
//     setSurcharge(2);
//     console.log("worksssss");
// }
// // works
// else if (amountItems > 4 && cartValue < 10) {
//     setSurcharge(difference + (amountItems - 4) / 2);
//     console.log("this sucka also work");
// }
