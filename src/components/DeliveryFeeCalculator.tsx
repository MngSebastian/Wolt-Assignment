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

    // Free delivery for Cart Values of 100 or more.
    // Calculate Delivery fee for cart values under 100 depending on the time of the day.
    // Calculate 'Outside Rush Hour' delivery fee and surcharges.
    const handleClick = () => {
        let difference: number = 10 - cartValue;
        let surcharge: number = 0;
        let deliveryFee: number = 0;
        // Surcharges
        if (cartValue < 10 && amountItems <= 4) {
            surcharge = difference;
        } else if (cartValue < 10 && amountItems > 4) {
            surcharge = difference + (amountItems - 4) / 2;
        } else if (cartValue >= 10 && amountItems > 4) {
            surcharge = (amountItems - 4) / 2;
        }
        // Delivery Fee.
        if (deliveryDistance <= 1000) {
            deliveryFee = 2;
        } else {
            deliveryFee = 2 + Math.ceil((deliveryDistance - 1000) / 500) * 1;
        }
        // Calculate delivery fee and surcharges outside 'Rush Hour'.
        if (time < 15 || time >= 19) {
            if (cartValue >= 100) {
                setDeliveryFee(0);
                setSurcharge(surcharge);
            } else if (cartValue < 100) {
                setDeliveryFee(deliveryFee);
                setSurcharge(surcharge);
            }
        }
        // Calculate delivery fee and surcharges during 'Rush Hour'.
        else if (time >= 15 && time < 19) {
            if (cartValue >= 100) {
                setDeliveryFee(0);
                setSurcharge(surcharge * 1.1);
            } else if (cartValue < 100) {
                setDeliveryFee(deliveryFee * 1.1);
                setSurcharge(surcharge * 1.1);
            }
        }

        setDeliveryPrice(
            deliveryPrice + cartValue + deliveryDistance + amountItems
        );
    };
    if (deliveryFee + surcharge > 15) {
        setSurcharge(0);
        setDeliveryFee(15);
    }
    return (
        <div className="main">
            <div className="label-input">
                <div className="labels">
                    <label>Cart value</label>
                    <label>Delivery distance</label>
                    <label>Amount of items</label>
                    <label>Time</label>
                </div>
                <div className="inputs">
                    <input
                        value={cartValue}
                        type="number"
                        required
                        onChange={(e) => setCartValue(e.target.valueAsNumber)}
                    />
                    <label>&euro;</label>
                    <input
                        value={deliveryDistance}
                        type="number"
                        required
                        onChange={(e) =>
                            setDeliveryDistance(e.target.valueAsNumber)
                        }
                    />

                    <label> m</label>
                    <input
                        value={amountItems}
                        type="number"
                        required
                        onChange={(e) => setAmountItems(e.target.valueAsNumber)}
                    />
                    <input
                        type="datetime-local"
                        value={dateTime}
                        required
                        onChange={(e) => setDateTime(e.target.value)}
                    />
                </div>
            </div>
            <div>
                <button onClick={handleClick}>Calculate delivery price</button>

                <p>Delivery Price {(surcharge + deliveryFee).toFixed(2)} $;</p>
            </div>
        </div>
    );
}
