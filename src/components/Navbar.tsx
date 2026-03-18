import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

interface NavbarProps {
    onCartOpen: () => void;
}

const navLinks = [
    { href: "#products", label: "Shop" },
    { href: "#size-guide", label: "Size" },
    { href: "#checkout", label: "Checkout" },
    { href: "#faqs", label: "FAQs" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar({ onCartOpen }: NavbarProps) {
    const { totalItems } = useCart();
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const sections = navLinks.map(l => document.querySelector(l.href));

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection("#" + entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );

        sections.forEach(s => s && observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <nav className="glass nav-container" style={{
            position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)",
            zIndex: 100, display: "flex", alignItems: "center", gap: 28,
            padding: "12px 28px", borderRadius: "var(--r-full)",
            fontSize: 11, fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase",
        }}>
            <a href="#hero" onClick={e => scrollTo(e, "#hero")}
                style={{ fontWeight: 800, fontSize: 14, color: "var(--gold)", textDecoration: "none", letterSpacing: 3 }}>
                S&amp;S
            </a>
            {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={e => scrollTo(e, l.href)}
                    style={{
                        color: activeSection === l.href ? "var(--gold)" : "var(--text-secondary)",
                        textDecoration: "none", transition: "color 0.2s",
                        borderBottom: activeSection === l.href ? "1px solid var(--gold)" : "1px solid transparent",
                        paddingBottom: 2,
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                    onMouseLeave={e => { if (activeSection !== l.href) e.currentTarget.style.color = "var(--text-secondary)"; }}
                >{l.label}</a>
            ))}
            <button onClick={onCartOpen} style={{
                padding: "8px 18px",
                background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                color: "var(--bg-primary)", borderRadius: "var(--r-full)",
                border: "none", cursor: "pointer",
                fontWeight: 700, fontSize: 10, letterSpacing: 2,
                fontFamily: "inherit", textTransform: "uppercase",
                display: "flex", alignItems: "center", gap: 4,
                transition: "transform 0.2s",
                animation: totalItems > 0 ? "pulseGlow 2s ease-in-out infinite" : "none",
            }}>
                🛍️ Bag ({totalItems})
            </button>
        </nav>
    );
}
