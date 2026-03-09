import { useState, useMemo } from "react";

function getSize(h: number, w: number) {
    const bmi = w / ((h / 100) ** 2);
    if (h < 160) return bmi < 20 ? { s: "XS", f: "Slim" } : bmi < 24 ? { s: "S", f: "Perfect" } : bmi < 28 ? { s: "M", f: "Comfort" } : { s: "L", f: "Relaxed" };
    if (h < 170) return bmi < 20 ? { s: "S", f: "Slim" } : bmi < 24 ? { s: "M", f: "Perfect" } : bmi < 28 ? { s: "L", f: "Comfort" } : { s: "XL", f: "Relaxed" };
    if (h < 180) return bmi < 20 ? { s: "M", f: "Slim" } : bmi < 24 ? { s: "L", f: "Perfect" } : bmi < 28 ? { s: "XL", f: "Comfort" } : { s: "XXL", f: "Relaxed" };
    return bmi < 20 ? { s: "L", f: "Slim" } : bmi < 24 ? { s: "XL", f: "Perfect" } : { s: "XXL", f: "Comfort" };
}

const sizeChart = [
    { size: "XS", chest: "34″", waist: "28″", hip: "34″" },
    { size: "S", chest: "36″", waist: "30″", hip: "36″" },
    { size: "M", chest: "38″", waist: "32″", hip: "38″" },
    { size: "L", chest: "40″", waist: "34″", hip: "40″" },
    { size: "XL", chest: "42″", waist: "36″", hip: "42″" },
    { size: "XXL", chest: "44″", waist: "38″", hip: "44″" },
];

export default function SizeGuide() {
    const [h, setH] = useState(170);
    const [w, setW] = useState(68);
    const [show, setShow] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const rec = useMemo(() => getSize(h, w), [h, w]);
    const fc = rec.f === "Perfect" ? "var(--gold)" : rec.f === "Slim" ? "#8B9DC3" : rec.f === "Comfort" ? "#C3A86B" : "#C38B8B";

    return (
        <section
            id="size-guide"
            className="section-pad"
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            onMouseMove={e => setMousePos({ x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 })}
        >
            <div style={{ textAlign: "center", marginBottom: 50 }}>
                <p className="section-label">Size Guide</p>
                <h2 className="section-title">Find Your Perfect Fit</h2>
                <p className="section-sub">Slide to your measurements — get your exact size before adding to bag</p>
            </div>

            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 900 }}>

                {/* Size Finder Card — 3D tilt */}
                <div
                    className="glass-strong"
                    style={{
                        flex: "1 1 320px", maxWidth: 520, borderRadius: "var(--r-xl)",
                        padding: "40px 32px", display: "flex", flexDirection: "column", gap: 28,
                        perspective: 800,
                        transform: `rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
                        transition: "transform 0.3s ease-out",
                        transformStyle: "preserve-3d",
                    }}
                >
                    <h3 style={{
                        fontSize: 18, fontWeight: 700, textAlign: "center",
                        transform: "translateZ(20px)",
                    }}>
                        📏 Size Calculator
                    </h3>

                    {/* Height */}
                    <div style={{ transform: "translateZ(10px)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-muted)" }}>Height</label>
                            <span style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}>
                                {h} <span style={{ fontSize: 11, fontWeight: 400, color: "var(--text-muted)" }}>cm</span>
                            </span>
                        </div>
                        <input type="range" min="140" max="210" value={h} onChange={e => { setH(+e.target.value); setShow(false); }} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: "var(--text-muted)" }}><span>140</span><span>210</span></div>
                    </div>

                    {/* Weight */}
                    <div style={{ transform: "translateZ(10px)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", color: "var(--text-muted)" }}>Weight</label>
                            <span style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: "var(--text-primary)" }}>
                                {w} <span style={{ fontSize: 11, fontWeight: 400, color: "var(--text-muted)" }}>kg</span>
                            </span>
                        </div>
                        <input type="range" min="35" max="130" value={w} onChange={e => { setW(+e.target.value); setShow(false); }} />
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, fontSize: 9, color: "var(--text-muted)" }}><span>35</span><span>130</span></div>
                    </div>

                    {!show && (
                        <button className="btn-gold" onClick={() => setShow(true)} style={{
                            alignSelf: "center", transform: "translateZ(25px)",
                        }}>
                            Find My Size
                        </button>
                    )}

                    {show && (
                        <div style={{
                            textAlign: "center", padding: "20px 14px",
                            background: "rgba(212,175,55,0.04)", borderRadius: "var(--r-lg)",
                            border: "1px solid rgba(212,175,55,0.12)", animation: "resultPop 0.5s var(--ease-spring)",
                            transform: "translateZ(30px)",
                        }}>
                            <p style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 4 }}>Your recommended size</p>
                            <div style={{
                                fontSize: 52, fontWeight: 900, color: "var(--gold)", lineHeight: 1, marginBottom: 6,
                                textShadow: "0 0 30px rgba(212,175,55,0.3)",
                            }}>{rec.s}</div>
                            <div style={{
                                display: "inline-block", padding: "4px 16px", borderRadius: "var(--r-full)",
                                fontSize: 11, fontWeight: 700, letterSpacing: 1,
                                background: `${fc}18`, color: fc, border: `1px solid ${fc}30`,
                            }}>{rec.f} Fit</div>
                            <p style={{ marginTop: 10, fontSize: 11, color: "var(--text-muted)" }}>{h} cm · {w} kg</p>
                            <a href="#products" style={{
                                display: "inline-block", marginTop: 12,
                                fontSize: 11, color: "var(--gold)", textDecoration: "none",
                                letterSpacing: 1, fontWeight: 600,
                            }}>
                                ↑ Now pick your {rec.s} above
                            </a>
                        </div>
                    )}
                </div>

                {/* Size Chart Table — 3D card */}
                <div
                    className="glass"
                    style={{
                        flex: "1 1 280px", maxWidth: 340, borderRadius: "var(--r-xl)",
                        padding: "32px 24px",
                        transform: `rotateX(${mousePos.y * -2}deg) rotateY(${mousePos.x * 2}deg)`,
                        transition: "transform 0.3s ease-out",
                    }}
                >
                    <h3 style={{ fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16, color: "var(--gold)", textAlign: "center" }}>
                        Size Chart
                    </h3>

                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr>
                                {["Size", "Chest", "Waist", "Hip"].map(h => (
                                    <th key={h} style={{
                                        padding: "8px 6px", fontSize: 9, fontWeight: 700,
                                        letterSpacing: 1.5, textTransform: "uppercase",
                                        color: "var(--text-muted)", borderBottom: "1px solid rgba(255,255,255,0.06)",
                                        textAlign: "left",
                                    }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sizeChart.map(row => (
                                <tr key={row.size} style={{
                                    background: show && rec.s === row.size ? "rgba(212,175,55,0.08)" : "transparent",
                                    transition: "background 0.3s",
                                }}>
                                    <td style={{
                                        padding: "8px 6px", fontSize: 13,
                                        fontWeight: show && rec.s === row.size ? 800 : 600,
                                        color: show && rec.s === row.size ? "var(--gold)" : "var(--text-primary)",
                                        transition: "all 0.3s",
                                    }}>{row.size}</td>
                                    <td style={{ padding: "8px 6px", fontSize: 12, color: "var(--text-secondary)" }}>{row.chest}</td>
                                    <td style={{ padding: "8px 6px", fontSize: 12, color: "var(--text-secondary)" }}>{row.waist}</td>
                                    <td style={{ padding: "8px 6px", fontSize: 12, color: "var(--text-secondary)" }}>{row.hip}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
