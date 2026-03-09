import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
    id: number;
    name: string;
    price: number;
    priceLabel: string;
    size: string;
    qty: number;
}

interface CartContextType {
    items: CartItem[];
    addItem: (item: Omit<CartItem, "qty">) => void;
    removeItem: (id: number, size: string) => void;
    updateQty: (id: number, size: string, qty: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    totalLabel: string;
}

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be inside CartProvider");
    return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (item: Omit<CartItem, "qty">) => {
        setItems(prev => {
            const existing = prev.find(i => i.id === item.id && i.size === item.size);
            if (existing) {
                return prev.map(i =>
                    i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i
                );
            }
            return [...prev, { ...item, qty: 1 }];
        });
    };

    const removeItem = (id: number, size: string) => {
        setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
    };

    const updateQty = (id: number, size: string, qty: number) => {
        if (qty <= 0) return removeItem(id, size);
        setItems(prev => prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const totalLabel = `₹${totalPrice.toLocaleString("en-IN")}`;

    return (
        <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, totalLabel }}>
            {children}
        </CartContext.Provider>
    );
}
