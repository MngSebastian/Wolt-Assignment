import React, { useState } from "react";
import surchargesCalc from "../utils/surchargesCalc";
import deliveryFeeCalc from "../utils/deliveryFeeCalc";

export default function DeliveryFeeCalculator() {
    const [cartValue, setCartValue] = useState<number>(0.0);
    const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
    const [amountItems, setAmountItems] = useState<number>(0);
    const [dateTime, setDateTime] = useState<string>("");
    let time: number = Number(dateTime.slice(11, 13));
    const [deliveryFee, setDeliveryFee] = useState<number>(0);
    const [surcharge, setSurcharge] = useState<number>(0);

    const handleClick = () => {
        // You should not be able to calculate the delivery price if cartValue,
        // deliveryDistance, amountItems is 0 or if time has not been inputed yet.
        if (
            cartValue < 1 ||
            deliveryDistance < 1 ||
            amountItems < 1 ||
            dateTime == ""
        ) {
            return null;
        }
        let surcharge: number = 0;
        let deliveryFee: number = 0;
        // Calculating Surcharges
        surcharge = surchargesCalc(cartValue, amountItems);
        // Calculating Delivery Fee.
        deliveryFee = deliveryFeeCalc(deliveryDistance);
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
                        // step="0.0"
                        required
                        onChange={(e) => setCartValue(e.target.valueAsNumber)}
                    />
                    <label> &euro;</label>
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
            <div className="btn-div">
                <button onClick={handleClick}>Calculate delivery price</button>

                <p>Delivery Price {(surcharge + deliveryFee).toFixed(2)} $</p>
            </div>
        </div>
    );
}
