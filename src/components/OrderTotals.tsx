import { useMemo } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    placeOrder: () => void
}

export default function OrderTotals({ order, tip, placeOrder }: OrderTotalsProps) {
    const subTotal = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    const tipAmount = useMemo(() => subTotal * tip, [tip, order])
    // en este tercer caso se pudiera utilizar useMemo de forma similar a tipAmount, sin embargo considero innecesario pues depende de valores ya controlados
    const totalAmount = subTotal + tipAmount
    return (<>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y propinas</h2>
            <p>Subtotal a pagar: {' '}
                <span className="font-bold">{formatCurrency(subTotal)}</span>
            </p>

            <p>Propina: {' '}
                <span className="font-bold">{formatCurrency(tipAmount)}</span>
            </p>

            <p>Total a pagar: {' '}
                <span className="font-bold">{formatCurrency(totalAmount)}</span>
            </p>

        </div>
        <button className="w-full bg-black text-white uppercase rounded-md font-bold mt-10 p-3 disabled:opacity-30" disabled={totalAmount === 0} onClick={placeOrder}>
            Guardar orden
        </button>
    </>)
}