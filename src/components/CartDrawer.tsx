import { useCart } from "../context/CartContext";

interface CartDrawerProps {
    open: boolean;
    onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
    const { items, removeItem, updateQty, totalItems, totalLabel, clearCart } = useCart();

    return (
        <>
            {/* Backdrop */}
            {open && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
                        zIndex: 200, transition: "opacity 0.3s",
                    }}
                />
            )}

            {/* Drawer */}
            <div style={{
                position: "fixed", top: 0, right: 0, bottom: 0,
                width: "min(420px, 90vw)",
                background: "var(--bg-primary)",
                borderLeft: "1px solid rgba(255,255,255,0.06)",
                zIndex: 201,
                transform: open ? "translateX(0)" : "translateX(100%)",
                transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1)",
                display: "flex", flexDirection: "column",
            }}>
                {/* Header */}
                <div style={{
                    padding: "24px 24px 20px", display: "flex", alignItems: "center",
                    justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: 2, textTransform: "uppercase" }}>
                        Your Bag <span style={{ color: "var(--gold)", fontWeight: 500, fontSize: 14 }}>({totalItems})</span>
                    </h2>
                    <button onClick={onClose} style={{
                        background: "none", border: "none", color: "var(--text-secondary)",
                        fontSize: 24, cursor: "pointer", padding: 4, fontFamily: "inherit",
                    }}>✕</button>
                </div>

                {/* Items */}
                <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
                    {items.length === 0 ? (
                        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--text-muted)" }}>
                            <div style={{ fontSize: 40, marginBottom: 12 }}>🛍️</div>
                            <p style={{ fontSize: 15, fontWeight: 500 }}>Your bag is empty</p>
                            <p style={{ fontSize: 13, marginTop: 6, color: "var(--text-muted)" }}>
                                Browse our collection and add items
                            </p>
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {items.map(item => (
                                <div key={`${item.id}-${item.size}`} style={{
                                    display: "flex", gap: 16, padding: 16,
                                    background: "var(--bg-card)", borderRadius: "var(--r-md)",
                                    border: "1px solid rgba(255,255,255,0.04)",
                                }}>
                                    {/* Mini thumbnail */}
                                    <div style={{
                                        width: 64, height: 80, borderRadius: "var(--r-sm)", flexShrink: 0,
                                        background: "linear-gradient(135deg, #1a1510, #2a2015)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 10, color: "var(--text-muted)", letterSpacing: 1,
                                    }}>
                                        S&amp;S
                                    </div>

                                    {/* Info */}
                                    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                        <div>
                                            <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>
                                                {item.name}
                                            </p>
                                            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                                                Size: <span style={{ color: "var(--gold)", fontWeight: 600 }}>{item.size}</span>
                                            </p>
                                        </div>

                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                                            {/* Qty controls */}
                                            <div style={{ display: "flex", alignItems: "center", gap: 0, borderRadius: "var(--r-sm)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
                                                <button onClick={() => updateQty(item.id, item.size, item.qty - 1)} style={{
                                                    width: 32, height: 32, background: "rgba(255,255,255,0.04)",
                                                    border: "none", color: "var(--text-secondary)", fontSize: 16,
                                                    cursor: "pointer", fontFamily: "inherit",
                                                }}>−</button>
                                                <span style={{ width: 32, textAlign: "center", fontSize: 13, fontWeight: 700, color: "var(--text-primary)" }}>{item.qty}</span>
                                                <button onClick={() => updateQty(item.id, item.size, item.qty + 1)} style={{
                                                    width: 32, height: 32, background: "rgba(255,255,255,0.04)",
                                                    border: "none", color: "var(--text-secondary)", fontSize: 16,
                                                    cursor: "pointer", fontFamily: "inherit",
                                                }}>+</button>
                                            </div>

                                            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--gold)" }}>
                                                ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Remove */}
                                    <button onClick={() => removeItem(item.id, item.size)} style={{
                                        background: "none", border: "none", color: "var(--text-muted)",
                                        fontSize: 14, cursor: "pointer", alignSelf: "flex-start", padding: 2,
                                        fontFamily: "inherit",
                                    }}>✕</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                            <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>Subtotal</span>
                            <span style={{ fontSize: 20, fontWeight: 800, color: "var(--gold)" }}>{totalLabel}</span>
                        </div>
                        <a href="#checkout" onClick={onClose} className="btn-gold" style={{
                            width: "100%", textDecoration: "none", textAlign: "center",
                        }}>
                            Proceed to Checkout
                        </a>
                        <button onClick={clearCart} style={{
                            width: "100%", marginTop: 10, padding: "10px",
                            background: "none", border: "none", color: "var(--text-muted)",
                            fontSize: 12, cursor: "pointer", fontFamily: "inherit",
                            letterSpacing: 1, textTransform: "uppercase",
                        }}>
                            Clear Bag
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
