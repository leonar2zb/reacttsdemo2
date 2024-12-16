import MenuItem from "./components/MenuItem"
import { menuItems } from "./data/db"
import useOrder from "./hooks/useOrder"
import OrderContents from "./components/OrderContents"
import OrderTotals from "./components/OrderTotals"
import TipPercentageForm from "./components/TipPercentageForm"
import { useEffect, useReducer } from "react"
import { initialState, orderReducer } from "./reducers/order-reducer"

function App() {
  const { order, addItem, removeItem, tip, setTip, placeOrder } = useOrder()

  const [state, dispatch] = useReducer(orderReducer, initialState)

  useEffect(() => {
    if (order.length === 0)
      setTip(0)
    /*return () => {
      // Cleanup opcional: Esto se ejecuta antes del siguiente efecto o cuando el componente se desmonta 
      console.log('Cleanup');
    };*/
  }, [order]);

  return (
    <>
      <header className="bg-teal-400 py-5">
        <h1 className="text-center text-4xl font-black">Calculadora de Propinas</h1>
      </header>
      <main className="max-w-7xl mx-auto py-20 grid md:grid-cols-2">
        <div className="p-5">
          <h2 className="text-4xl font-black">Menú</h2>
          <div className="space-y-3 mt-10">
            {menuItems.map(item => <MenuItem key={item.id} item={item} dispatch={dispatch} />)}
          </div>
        </div>
        <div className="border border-dashed border-slate-300 p-5 rounded-lg space-y-10">
          {order.length > 0 ? (<>
            <OrderContents order={order} removeItem={removeItem} />
            <TipPercentageForm setTip={setTip} tip={tip} />
            <OrderTotals order={order} tip={tip} placeOrder={placeOrder} />
          </>) : (<p className="text-center">La orden está vacía. Seleccione sus productos</p>)}
        </div>
      </main>
    </>
  )
}

export default App
