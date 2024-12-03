import { useMemo } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";

type OrderTotalsProps = {
    order: OrderItem[]
}

export default function OrderTotals({ order }: OrderTotalsProps) {
    const subTotal = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])
    return (<>
        <div className="space-y-3">
            <h2 className="font-black text-2xl">Totales y propinas</h2>
            <p>Subtotal a pagar: {' '}
                <span className="font-bold">{formatCurrency(subTotal)}</span>
            </p>

            <p>Propina: {' '}
                <span className="font-bold">{formatCurrency(0)}</span>
            </p>

            <p>Total a pagar: {' '}
                <span className="font-bold">{formatCurrency(0)}</span>
            </p>

        </div>
        <button>

        </button>
    </>)
}