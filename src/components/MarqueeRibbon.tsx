export default function MarqueeRibbon() {
    const items = Array.from({ length: 8 }, (_, i) => i);

    return (
        <div style={{
            overflow: "hidden",
            padding: "28px 0",
            background: "linear-gradient(180deg, rgba(212,175,55,0.03) 0%, transparent 30%, transparent 70%, rgba(212,175,55,0.03) 100%)",
            borderTop: "1px solid rgba(212,175,55,0.08)",
            borderBottom: "1px solid rgba(212,175,55,0.08)",
            position: "relative",
            perspective: 800,
        }}>
            <div style={{
                display: "flex",
                animation: "marqueeScroll 25s linear infinite",
                width: "fit-content",
                transform: "rotateX(2deg)",
            }}>
                {[...items, ...items].map((_, i) => (
                    <span key={i} style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 28,
                        paddingRight: 28,
                        whiteSpace: "nowrap",
                        fontSize: "clamp(18px, 2.5vw, 28px)",
                        fontWeight: i % 2 === 0 ? 900 : 300,
                        letterSpacing: i % 2 === 0 ? "0.08em" : "0.15em",
                        textTransform: "uppercase" as const,
                        color: i % 2 === 0 ? "var(--gold)" : "transparent",
                        WebkitTextStroke: i % 2 === 0 ? "none" : "1px var(--gold)",
                    }}>
                        STITCH & STYLE
                        <span style={{
                            fontSize: "0.5em",
                            color: "var(--gold)",
                            opacity: 0.4,
                            WebkitTextStroke: "none",
                        }}>
                            ◆
                        </span>
                        PREMIUM FASHION
                        <span style={{
                            fontSize: "0.5em",
                            color: "var(--gold)",
                            opacity: 0.4,
                            WebkitTextStroke: "none",
                        }}>
                            ◆
                        </span>
                    </span>
                ))}
            </div>

            {/* Edge fades */}
            <div style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: "linear-gradient(90deg, var(--bg-primary) 0%, transparent 8%, transparent 92%, var(--bg-primary) 100%)",
            }} />
        </div>
    );
}
