import { useState } from "react"
import { IdItem, MenuItem, OrderItem } from "../types"

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)
    const addItem = (item: MenuItem) => {
        let newList = [...order]
        const p = newList.findIndex(currentItem => currentItem.id === item.id)
        if (p >= 0) {
            newList[p].quantity++;
        } else {
            newList.push({ ...item, quantity: 1 })
        }
        setOrder(newList)
    }

    const removeItem = (id: IdItem) => setOrder(order.filter(item => item.id !== id))

    return {
        order,
        addItem,
        removeItem,
        tip,
        setTip
    }
}