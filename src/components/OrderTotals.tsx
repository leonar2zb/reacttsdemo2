import { Dispatch, useMemo, MouseEvent, useState } from "react";
import { formatCurrency } from "../helpers";
import { OrderItem } from "../types";
import { OrderActions } from "../reducers/order-reducer";

type OrderTotalsProps = {
    order: OrderItem[],
    tip: number,
    dispatch: Dispatch<OrderActions>
}

export default function OrderTotals({ order, tip, dispatch }: OrderTotalsProps) {
    const handleCheckboxChange = () => setPersistent(!persistent);
    const handleStopPropagation = (event: MouseEvent<HTMLInputElement> | MouseEvent<HTMLLabelElement>) => { event.stopPropagation(); };

    const [persistent, setPersistent] = useState<boolean>(false)

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
        <div>
            <button className="w-full bg-green-500 text-white uppercase rounded-md font-bold mt-1 p-3 disabled:opacity-30" disabled={totalAmount === 0} onClick={() => dispatch({ type: 'place-order' })}>
                Guardar orden
            </button>
            <button className="w-full bg-red-600 text-white uppercase rounded-md font-bold mt-3 p-3 disabled:opacity-30" disabled={totalAmount === 0}
                onClick={() => dispatch({ type: 'clear-order', payload: { persistent } })} title={`Eliminará en ${persistent ? 'almacenamiento y memoria' : ' la memoria solamente'}`} >
                Vaciar la orden
                <label htmlFor="emptyStorage" className="text-xs normal-case ml-1 float-end" onClick={handleStopPropagation} title="Marque para eliminar también en el almacenamiento" >Permanente</label>
                <input type="checkbox" className="float-end" name="emptyStorage" id="emptyStorage" onChange={handleCheckboxChange} checked={persistent} onClick={handleStopPropagation} />
            </button>
        </div>
    </>)
}