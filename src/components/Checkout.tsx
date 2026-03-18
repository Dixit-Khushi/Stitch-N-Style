import { useState } from "react";
import { useCart } from "../context/CartContext";

// Demo UPI ID — replace with real one for production
const DEMO_UPI_ID = "stitchstyle@upi";
const MERCHANT_NAME = "Stitch & Style";

function buildUPILink(amount: number, txnId: string) {
    const params = new URLSearchParams({
        pa: DEMO_UPI_ID,
        pn: MERCHANT_NAME,
        am: amount.toFixed(2),
        cu: "INR",
        tn: `Order ${txnId}`,
        tr: txnId,
    });
    return `upi://pay?${params.toString()}`;
}

function generateTxnId() {
    return "SS" + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase();
}

export default function Checkout() {
    const { items, totalLabel, totalPrice, clearCart } = useCart();
    const [step, setStep] = useState(1);
    const [ordered, setOrdered] = useState(false);
    const [truckAnim, setTruckAnim] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "cod" | null>(null);
    const [verifying, setVerifying] = useState(false);
    const [txnId] = useState(() => generateTxnId());

    const upiLink = buildUPILink(totalPrice, txnId);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}&bgcolor=0f0f0f&color=D4AF37&format=png`;

    const placeOrder = () => { setTruckAnim(true); setTimeout(() => { setOrdered(true); clearCart(); }, 1600); };

    const handleVerifyPayment = () => {
        setVerifying(true);
        // Simulate payment verification delay
        setTimeout(() => {
            setVerifying(false);
            placeOrder();
        }, 2000);
    };

    return (
        <section id="checkout" className="section-pad" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
                <p className="section-label">Checkout</p>
                <h2 className="section-title">Seamless Experience</h2>
                {items.length === 0 && !ordered && (
                    <p className="section-sub">Add items to your bag first, then checkout here</p>
                )}
            </div>

            {/* Cart summary strip */}
            {items.length > 0 && !ordered && (
                <div className="glass" style={{
                    width: "100%", maxWidth: 480, borderRadius: "var(--r-md)",
                    padding: "16px 20px", marginBottom: 24,
                    display: "flex", flexDirection: "column", gap: 10,
                }}>
                    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)" }}>
                        Your Order ({items.reduce((s, i) => s + i.qty, 0)} items)
                    </p>
                    {items.map(item => (
                        <div key={`${item.id}-${item.size}`} style={{
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                            padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)",
                        }}>
                            <div>
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{item.name}</span>
                                <span style={{ fontSize: 11, color: "var(--text-muted)", marginLeft: 8 }}>×{item.qty} · {item.size}</span>
                            </div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--gold)" }}>
                                ₹{(item.price * item.qty).toLocaleString("en-IN")}
                            </span>
                        </div>
                    ))}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 6 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Total</span>
                        <span style={{ fontSize: 18, fontWeight: 800, color: "var(--gold)" }}>{totalLabel}</span>
                    </div>
                </div>
            )}

            {/* Steps */}
            {items.length > 0 && !ordered && (
                <>
                    <div className="checkout-steps" style={{ display: "flex", gap: 28, marginBottom: 36 }}>
                        {[{ n: 1, l: "Login" }, { n: 2, l: "Shipping" }, { n: 3, l: "Pay" }].map(s => (
                            <div key={s.n} style={{ display: "flex", alignItems: "center", gap: 8, cursor: s.n <= step ? "pointer" : "default", opacity: s.n <= step ? 1 : 0.3 }}
                                onClick={() => { if (s.n <= step) { setStep(s.n); setPaymentMethod(null); } }}>
                                <div style={{
                                    width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 12, fontWeight: 700,
                                    background: s.n === step ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(255,255,255,0.06)",
                                    color: s.n === step ? "var(--bg-primary)" : "var(--text-secondary)",
                                }}>{s.n < step ? "✓" : s.n}</div>
                                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: s.n === step ? "var(--text-primary)" : "var(--text-muted)" }}>{s.l}</span>
                            </div>
                        ))}
                    </div>

                    <div className="glass-strong checkout-card" style={{ width: "100%", maxWidth: 480, minHeight: 280, borderRadius: "var(--r-xl)", padding: "40px 36px", overflow: "hidden" }}>
                        {/* Step 1 — Social Login */}
                        {step === 1 && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, animation: "fadeInUp 0.4s" }}>
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Quick Login</h3>
                                    <p style={{ color: "var(--text-secondary)", fontSize: 13 }}>One tap — no passwords</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                                    {[
                                        { name: "Continue with Google", icon: "G", bg: "#FFFFFF", color: "#333" },
                                        { name: "Continue with Apple", icon: "", bg: "#000000", color: "#FFF" },
                                    ].map(m => (
                                        <button key={m.name} onClick={() => setStep(2)} style={{
                                            width: "100%", padding: "13px 20px", fontSize: 14, fontWeight: 600, fontFamily: "inherit",
                                            background: m.bg, color: m.color, border: "none", borderRadius: "var(--r-sm)",
                                            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                            transition: "transform 0.2s",
                                        }}
                                            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                                            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                                        >
                                            <span style={{ fontSize: 18 }}>{m.icon}</span>{m.name}
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", color: "var(--text-muted)", fontSize: 12 }}>
                                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />or<div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
                                </div>
                                <button onClick={() => setStep(2)} className="btn-glass" style={{ width: "100%", fontSize: 12 }}>Continue with Email Only</button>
                            </div>
                        )}

                        {/* Step 2 — Shipping */}
                        {step === 2 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeInUp 0.4s" }}>
                                <div style={{ textAlign: "center" }}>
                                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>Shipping Details</h3>
                                </div>
                                {["Email for updates", "Full name", "Address", "City, PIN code"].map(ph => (
                                    <input key={ph} type="text" placeholder={ph} style={{
                                        width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: "inherit",
                                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: "var(--r-sm)", color: "var(--text-primary)", outline: "none",
                                    }}
                                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                                    />
                                ))}
                                <button className="btn-gold" onClick={() => setStep(3)} style={{ alignSelf: "center", marginTop: 4 }}>Continue to Payment</button>
                            </div>
                        )}

                        {/* Step 3 — Payment */}
                        {step === 3 && !paymentMethod && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, animation: "fadeInUp 0.4s" }}>
                                <h3 style={{ fontSize: 20, fontWeight: 700 }}>Choose Payment Method</h3>
                                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                                    {([
                                        { n: "upi" as const, label: "UPI", i: "₹", desc: "GPay · PhonePe · Paytm" },
                                        { n: "card" as const, label: "Card", i: "💳", desc: "Credit / Debit" },
                                        { n: "cod" as const, label: "COD", i: "📦", desc: "Cash on Delivery" },
                                    ]).map(m => (
                                        <button key={m.n} onClick={() => setPaymentMethod(m.n)}
                                            style={{
                                                padding: "20px 24px", fontSize: 13, fontFamily: "inherit",
                                                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                                borderRadius: "var(--r-md)", color: "var(--text-primary)",
                                                cursor: "pointer", display: "flex", flexDirection: "column",
                                                alignItems: "center", gap: 6, minWidth: 120,
                                                transition: "all 0.2s",
                                            }}
                                            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                                            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                                        >
                                            <span style={{ fontSize: 28 }}>{m.i}</span>
                                            <span style={{ fontWeight: 700, fontSize: 14 }}>{m.label}</span>
                                            <span style={{ fontSize: 10, color: "var(--text-muted)" }}>{m.desc}</span>
                                        </button>
                                    ))}
                                </div>
                                <div style={{ width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--r-sm)", display: "flex", justifyContent: "space-between" }}>
                                    <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>Total</span>
                                    <span style={{ fontSize: 20, fontWeight: 800, color: "var(--gold)" }}>{totalLabel}</span>
                                </div>
                            </div>
                        )}

                        {/* UPI Payment Screen */}
                        {step === 3 && paymentMethod === "upi" && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "fadeInUp 0.4s" }}>
                                <button onClick={() => setPaymentMethod(null)}
                                    style={{
                                        alignSelf: "flex-start", background: "none", border: "none",
                                        color: "var(--text-muted)", cursor: "pointer", fontSize: 12,
                                        fontFamily: "inherit", padding: 0, display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                    ← Back
                                </button>

                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Pay via UPI</h3>
                                <p style={{ fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>
                                    Scan the QR code or tap the button to pay with your UPI app
                                </p>

                                {/* QR Code */}
                                <div style={{
                                    padding: 12, borderRadius: "var(--r-md)",
                                    background: "#1a1a1a", border: "1px solid rgba(212,175,55,0.2)",
                                    position: "relative",
                                }}>
                                    <img
                                        src={qrUrl}
                                        alt="UPI QR Code"
                                        width={180} height={180}
                                        style={{ display: "block", borderRadius: 8 }}
                                    />
                                    <div style={{
                                        position: "absolute", top: "50%", left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background: "#1a1a1a", padding: "4px 8px",
                                        borderRadius: 4, fontSize: 10, fontWeight: 800,
                                        color: "var(--gold)", letterSpacing: 1,
                                    }}>S&S</div>
                                </div>

                                {/* Amount */}
                                <div style={{
                                    width: "100%", padding: "10px 16px",
                                    background: "rgba(212,175,55,0.06)", borderRadius: "var(--r-sm)",
                                    display: "flex", justifyContent: "space-between", alignItems: "center",
                                    border: "1px solid rgba(212,175,55,0.15)",
                                }}>
                                    <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>Amount</span>
                                    <span style={{ fontSize: 22, fontWeight: 800, color: "var(--gold)" }}>{totalLabel}</span>
                                </div>

                                {/* UPI ID display */}
                                <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 1 }}>
                                    UPI ID: <span style={{ color: "var(--gold)", fontWeight: 600 }}>{DEMO_UPI_ID}</span>
                                </p>

                                {/* Open UPI App button (deep link) */}
                                <a href={upiLink}
                                    style={{
                                        width: "100%", padding: "14px 20px", fontSize: 14,
                                        fontWeight: 700, fontFamily: "inherit", textAlign: "center",
                                        background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                                        color: "var(--bg-primary)", border: "none",
                                        borderRadius: "var(--r-sm)", cursor: "pointer",
                                        textDecoration: "none", display: "block",
                                        transition: "transform 0.2s",
                                    }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-1px)")}
                                    onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
                                >
                                    Open UPI App to Pay
                                </a>

                                {/* Divider */}
                                <div style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", color: "var(--text-muted)", fontSize: 11 }}>
                                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                                    after payment
                                    <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                                </div>

                                {/* Verify button */}
                                <button onClick={handleVerifyPayment}
                                    disabled={verifying || truckAnim}
                                    className="btn-glass"
                                    style={{
                                        width: "100%", fontSize: 13,
                                        opacity: verifying ? 0.6 : 1,
                                    }}>
                                    {verifying ? "Verifying Payment..." : truckAnim ? "🚚 Dispatching..." : "I've Made the Payment ✓"}
                                </button>

                                <p style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center", lineHeight: 1.5 }}>
                                    Transaction ID: <span style={{ fontFamily: "monospace", color: "var(--text-secondary)" }}>{txnId}</span>
                                </p>
                            </div>
                        )}

                        {/* Card Payment (placeholder) */}
                        {step === 3 && paymentMethod === "card" && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, animation: "fadeInUp 0.4s" }}>
                                <button onClick={() => setPaymentMethod(null)} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 12, fontFamily: "inherit", padding: 0 }}>← Back</button>
                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Card Payment</h3>
                                {["Card Number", "Name on Card", "Expiry (MM/YY)", "CVV"].map(ph => (
                                    <input key={ph} type="text" placeholder={ph} style={{
                                        width: "100%", padding: "13px 16px", fontSize: 14, fontFamily: "inherit",
                                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                                        borderRadius: "var(--r-sm)", color: "var(--text-primary)", outline: "none",
                                    }}
                                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                                    />
                                ))}
                                <button className="btn-gold" onClick={placeOrder} disabled={truckAnim} style={{ width: "100%" }}>
                                    {truckAnim ? "Processing..." : `Pay ${totalLabel}`}
                                </button>
                            </div>
                        )}

                        {/* COD */}
                        {step === 3 && paymentMethod === "cod" && (
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, animation: "fadeInUp 0.4s" }}>
                                <button onClick={() => setPaymentMethod(null)} style={{ alignSelf: "flex-start", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 12, fontFamily: "inherit", padding: 0 }}>← Back</button>
                                <div style={{ fontSize: 40 }}>📦</div>
                                <h3 style={{ fontSize: 18, fontWeight: 700 }}>Cash on Delivery</h3>
                                <p style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
                                    Pay <span style={{ color: "var(--gold)", fontWeight: 700 }}>{totalLabel}</span> when your order arrives
                                </p>
                                <button className="btn-gold" onClick={placeOrder} disabled={truckAnim} style={{
                                    width: "100%",
                                    transform: truckAnim ? "translateX(300%) scale(0.8)" : "translateX(0)",
                                    transition: "transform 1.2s cubic-bezier(0.4,0,0.2,1)", opacity: truckAnim ? 0 : 1,
                                }}>
                                    {truckAnim ? "🚚 ..." : "Confirm Order"}
                                </button>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Order confirmed */}
            {ordered && (
                <div style={{ textAlign: "center", animation: "fadeInUp 0.5s" }}>
                    <div style={{ fontSize: 44, marginBottom: 14, animation: "popIn 0.4s var(--ease-spring)" }}>✨</div>
                    <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 6 }}>Order Confirmed</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Your style is being prepared. Thank you.</p>
                </div>
            )}

            {/* Empty state */}
            {items.length === 0 && !ordered && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>🛍️</div>
                    <p style={{ fontSize: 15, color: "var(--text-muted)" }}>Your bag is empty — browse and add items above</p>
                    <a href="#products" className="btn-glass" style={{ marginTop: 20, display: "inline-flex", textDecoration: "none" }}>
                        Browse Collection
                    </a>
                </div>
            )}
        </section>
    );
}
