import { useEffect, useRef, useState } from "react";
import GoldenThreadCanvas from "./GoldenThreadCanvas";
import MagneticButton from "./MagneticButton";

export default function HeroSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY);
        const handleMouse = (e: MouseEvent) => {
            setMouse({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouse);
        return () => { window.removeEventListener("scroll", handleScroll); window.removeEventListener("mousemove", handleMouse); };
    }, []);

    return (
        <section ref={sectionRef} id="hero" className="hero-bg" style={{
            position: "relative", width: "100%", height: "100vh", display: "flex",
            flexDirection: "column", alignItems: "center", justifyContent: "center",
            overflow: "hidden",
        }}>
            <GoldenThreadCanvas />
            <div className="fabric-overlay" />

            {/* Parallax floating fabric shapes */}
            {[0, 1, 2].map(i => (
                <div key={i} style={{
                    position: "absolute", pointerEvents: "none",
                    width: [300, 200, 160][i], height: [300, 200, 160][i],
                    borderRadius: "50%",
                    background: `radial-gradient(circle, rgba(212,175,55,${[0.04, 0.03, 0.05][i]}) 0%, transparent 70%)`,
                    left: [`15%`, `70%`, `40%`][i],
                    top: [`20%`, `60%`, `10%`][i],
                    transform: `translate(${mouse.x * (20 + i * 15)}px, ${-offset * (0.1 + i * 0.05) + mouse.y * (15 + i * 10)}px)`,
                    transition: "transform 0.3s ease-out",
                    animation: `float${i} ${8 + i * 3}s ease-in-out infinite`,
                }} />
            ))}

            {/* Tagline */}
            <p style={{
                fontSize: 11, letterSpacing: 6, textTransform: "uppercase",
                color: "var(--gold)", fontWeight: 600, marginBottom: 20,
                position: "relative", zIndex: 2,
                transform: `translateY(${-offset * 0.15}px)`,
            }}>
                Est. 2026 — Premium Fashion House
            </p>

            {/* Title */}
            <h1 style={{
                fontSize: "clamp(52px, 11vw, 140px)", fontWeight: 900,
                lineHeight: 0.95, letterSpacing: "-0.04em", textAlign: "center",
                position: "relative", zIndex: 2, userSelect: "none",
                transform: `translateY(${-offset * 0.3}px)`,
            }}>
                <span style={{ color: "var(--text-primary)", display: "block" }}>Stitch</span>
                <span style={{
                    display: "block", fontSize: "0.35em", fontWeight: 300,
                    letterSpacing: 8, color: "var(--gold)", margin: "8px 0",
                }}>&amp;</span>
                <span style={{
                    background: "linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold))",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 4s linear infinite",
                }}>Style</span>
            </h1>

            {/* Subtitle */}
            <p style={{
                marginTop: 28, fontSize: "clamp(14px, 1.4vw, 18px)",
                color: "var(--text-secondary)", fontWeight: 300,
                textAlign: "center", maxWidth: 440, lineHeight: 1.7,
                position: "relative", zIndex: 2,
                transform: `translateY(${-offset * 0.2}px)`,
            }}>
                Where sophisticated craftsmanship meets
                <br />modern elegance. Curated for the discerning.
            </p>

            {/* CTA Buttons */}
            <div style={{
                display: "flex", gap: 16, marginTop: 40,
                position: "relative", zIndex: 2,
                transform: `translateY(${-offset * 0.1}px)`,
            }}>
                <MagneticButton href="#products" className="btn-gold">Shop Collection</MagneticButton>
                <MagneticButton href="#size-guide" className="btn-glass">Find Your Size</MagneticButton>
            </div>

            {/* Scroll line */}
            <div style={{
                position: "absolute", bottom: 40, display: "flex",
                flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.35,
            }}>
                <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--gold), transparent)" }} />
                <span style={{ fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: "var(--gold)" }}>Scroll</span>
            </div>
        </section>
    );
}
