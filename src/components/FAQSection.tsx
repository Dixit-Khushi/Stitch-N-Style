import { useState } from "react";

const faqs = [
    {
        q: "What is the return & exchange policy?",
        a: "We offer a 15-day hassle-free return and exchange policy. Items must be unworn, unwashed, and in original packaging with tags attached. Refunds are processed within 5-7 business days.",
    },
    {
        q: "How long does delivery take?",
        a: "Standard delivery takes 5-7 business days. Express delivery (available in metro cities) takes 2-3 business days. Free shipping on orders above ₹3,000.",
    },
    {
        q: "How do I find my size?",
        a: "Use our interactive Size Guide on this page — enter your height and weight for a personalized recommendation. You can also refer to the measurement chart for chest, waist, and hip dimensions.",
    },
    {
        q: "Are these products genuine/authentic?",
        a: "100% authentic. Every piece is designed in-house and crafted with premium materials — real leather, mulberry silk, Japanese selvedge denim, and Supima cotton. We never use synthetic substitutes.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept UPI (GPay, PhonePe, Paytm), Credit/Debit cards (Visa, Mastercard, RuPay), Net Banking, and Cash on Delivery (COD).",
    },
    {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 2 hours of placement. After that, the order enters processing and cannot be cancelled — but you can return it once delivered.",
    },
    {
        q: "Do you offer international shipping?",
        a: "Not yet — we currently ship across India only. International shipping is coming soon. Follow us for updates!",
    },
    {
        q: "How do I care for my garments?",
        a: "Each product comes with specific care instructions. In general: dry clean leather and silk, machine wash cotton on cold, and hang dry all garments to preserve shape and color.",
    },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            onClick={() => setOpen(!open)}
            style={{
                cursor: "pointer",
                padding: "18px 22px",
                background: open ? "rgba(212,175,55,0.04)" : "rgba(255,255,255,0.02)",
                border: open ? "1px solid rgba(212,175,55,0.15)" : "1px solid rgba(255,255,255,0.05)",
                borderRadius: "var(--r-md)",
                transition: "all 0.3s",
            }}
            onMouseEnter={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { if (!open) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4 style={{
                    fontSize: 14, fontWeight: 600, color: open ? "var(--gold)" : "var(--text-primary)",
                    transition: "color 0.2s", margin: 0,
                }}>{faq.q}</h4>
                <span style={{
                    fontSize: 18, color: "var(--gold)", fontWeight: 300,
                    transform: open ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    flexShrink: 0, marginLeft: 16,
                }}>+</span>
            </div>
            <div style={{
                maxHeight: open ? 200 : 0,
                overflow: "hidden",
                transition: "max-height 0.4s ease-in-out",
            }}>
                <p style={{
                    fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7,
                    marginTop: 12, marginBottom: 0,
                }}>{faq.a}</p>
            </div>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section id="faqs" className="section-pad" style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
                <p className="section-label">Support</p>
                <h2 className="section-title">Frequently Asked</h2>
                <p className="section-sub">Everything you need to know before you shop</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
            </div>
        </section>
    );
}
