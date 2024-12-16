import type { IdItem, MenuItem, OrderItem } from "../types"

export type OrderActions =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: IdItem } } |
    { type: 'place-order' } |
    { type: 'clear-order', payload: { persistent: boolean } } |
    { type: 'add-tip', payload: { value: number } }

export type OrderState = {
    order: OrderItem[],
    tip: number
}

const getFromLocalStorage = () => {
    const dataStr = localStorage.getItem('orders')
    return dataStr ? <OrderState>JSON.parse(dataStr) : { order: [], tip: 0 }
}

export const initialState: OrderState = getFromLocalStorage()

export const orderReducer = (state: OrderState = initialState, action: OrderActions) => {
    if (action.type === 'add-item') {
        const itemExist = state.order.find(orderItem => orderItem.id === action.payload.item.id)
        let order: OrderItem[] = []
        if (itemExist) {
            order = state.order.map(orderItem => orderItem.id === action.payload.item.id ? { ...orderItem, quantity: orderItem.quantity + 1 } : orderItem)
        }
        else {
            const newItem: OrderItem = { ...action.payload.item, quantity: 1 }
            order = [...state.order, newItem]
        }
        return {
            ...state,
            order
        }
    }

    if (action.type === 'remove-item') {
        const order: OrderItem[] = state.order.filter(item => item.id !== action.payload.id)
        return {
            ...state,
            order
        }
    }

    if (action.type === 'place-order') {
        localStorage.setItem('orders', JSON.stringify(state))
        return {
            ...state
        }
    }

    if (action.type === 'clear-order') {
        if (action.payload.persistent)
            localStorage.removeItem('orders')
        return {
            order: [], tip: 0
        }
    }

    if (action.type === 'add-tip') {
        const tip = action.payload.value
        return {
            ...state,
            tip
        }
    }
    return state

}