import { useState } from "react"
import { MenuItem, OrderItem } from "../types"

export default function useOrder() {
    const [order, setOrder] = useState<OrderItem[]>([])
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
    return { addItem }
}