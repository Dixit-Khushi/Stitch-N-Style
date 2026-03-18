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

            <p style={{ fontSize: 11, color: "var(--text-muted)", letterSpacing: 1, position: "relative" }}>
                © 2026 Stitch &amp; Style. All rights reserved. 
                <span style={{ opacity: 0.04, fontSize: 8, display: "block", marginTop: 4 }}>This website is strictly to showcase our frontend skills</span>
            </p>

            {/* Founders Section */}
            <div style={{ marginTop: 12, textAlign: "center", display: "flex", flexDirection: "column", gap: 16 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase" }}>Founders</p>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 32 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                        <h4 style={{ fontSize: 14, color: "var(--text-primary)", margin: 0, fontWeight: 600 }}>Khushi</h4>
                        <div style={{ display: "flex", gap: 12, fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>
                            <a href="mailto:dixitkhushi288@gmail.com" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>Email</a>
                            <a href="https://www.linkedin.com/in/dixit-khushi" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>LinkedIn</a>
                            <a href="https://github.com/Dixit-Khushi" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>GitHub</a>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
                        <h4 style={{ fontSize: 14, color: "var(--text-primary)", margin: 0, fontWeight: 600 }}>Divyam Chauhan</h4>
                        <div style={{ display: "flex", gap: 12, fontSize: 11, fontWeight: 500, letterSpacing: 1, textTransform: "uppercase" }}>
                            <a href="mailto:divyaprakashsinghchauhan1234@gmail.com" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>Email</a>
                            <a href="https://www.linkedin.com/in/divyamchauhan2" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>LinkedIn</a>
                            <a href="https://github.com/Divyam-Chauhan" target="_blank" rel="noreferrer" style={{ color: "var(--text-secondary)", textDecoration: "none", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color="var(--gold)"} onMouseLeave={e => e.currentTarget.style.color="var(--text-secondary)"}>GitHub</a>
                        </div>
                    </div>
                </div>
            </div>

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
