import { useState, useEffect } from "react";

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <footer style={{
            padding: "80px 6vw 32px", borderTop: "1px solid rgba(255,255,255,0.04)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 28,
        }}>
            <h3 style={{ fontSize: 24, fontWeight: 900, letterSpacing: 5, textTransform: "uppercase" }}>
                Stitch <span style={{ color: "var(--gold)" }}>&amp;</span> Style
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 300 }}>Premium Fashion, Redefined.</p>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
                {[
                    { label: "Shop", href: "#products" },
                    { label: "Size Guide", href: "#size-guide" },
                    { label: "Checkout", href: "#checkout" },
                    { label: "FAQs", href: "#faqs" },
                    { label: "Contact", href: "#contact" },
                ].map(l => (
                    <a key={l.label} href={l.href} style={{
                        fontSize: 11, color: "var(--text-secondary)", textDecoration: "none",
                        letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 500, transition: "color 0.2s",
                    }}
                        onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >{l.label}</a>
                ))}
            </div>

            <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 1 }}>
                © 2026 Stitch &amp; Style. All rights reserved.
            </p>

            {/* Back to Top */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                style={{
                    position: "fixed", bottom: 28, right: 28, zIndex: 90,
                    width: 44, height: 44, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                    color: "var(--bg-primary)", border: "none", cursor: "pointer",
                    fontSize: 18, fontWeight: 700, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    boxShadow: "0 4px 20px rgba(212,175,55,0.3)",
                    opacity: showTop ? 1 : 0,
                    pointerEvents: showTop ? "auto" : "none",
                    transform: showTop ? "translateY(0) scale(1)" : "translateY(20px) scale(0.8)",
                    transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}>
                ↑
            </button>
        </footer>
    );
}
