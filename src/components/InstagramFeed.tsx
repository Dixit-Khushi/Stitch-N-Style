const igPosts = [
    { id: 1, gradient: "linear-gradient(135deg, #2a1f0f, #3a2a15)", likes: "2.4k" },
    { id: 2, gradient: "linear-gradient(135deg, #1a1a2e, #16213e)", likes: "1.8k" },
    { id: 3, gradient: "linear-gradient(135deg, #1f1510, #2e2015)", likes: "3.1k" },
    { id: 4, gradient: "linear-gradient(135deg, #0f1a15, #152e20)", likes: "856" },
    { id: 5, gradient: "linear-gradient(135deg, #1a0f18, #2e1528)", likes: "4.2k" },
    { id: 6, gradient: "linear-gradient(135deg, #15150f, #28281a)", likes: "1.1k" },
    { id: 7, gradient: "linear-gradient(135deg, #0f1520, #152030)", likes: "2.7k" },
    { id: 8, gradient: "linear-gradient(135deg, #1a1510, #2e2515)", likes: "990" },
];

export default function InstagramFeed() {
    return (
        <section className="section-pad" style={{ paddingTop: 60 }}>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
                <p className="section-label">@stitchandstyle</p>
                <h2 className="section-title">Follow the Thread</h2>
                <p className="section-sub">Our latest looks, straight from the feed</p>
            </div>

            <div className="ig-grid">
                {igPosts.map(p => (
                    <div key={p.id} style={{
                        aspectRatio: "1", background: p.gradient,
                        position: "relative", cursor: "pointer", overflow: "hidden",
                    }}
                        onMouseEnter={e => {
                            const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                            if (overlay) overlay.style.opacity = "1";
                        }}
                        onMouseLeave={e => {
                            const overlay = e.currentTarget.querySelector("[data-overlay]") as HTMLElement;
                            if (overlay) overlay.style.opacity = "0";
                        }}
                    >
                        {/* Hover overlay */}
                        <div data-overlay="" style={{
                            position: "absolute", inset: 0,
                            background: "rgba(0,0,0,0.5)",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            opacity: 0, transition: "opacity 0.3s",
                            fontSize: 14, fontWeight: 600, color: "var(--text-primary)",
                        }}>
                            ❤️ {p.likes}
                        </div>
                    </div>
                ))}
            </div>

            {/* Follow CTA */}
            <div style={{ textAlign: "center", marginTop: 32 }}>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn-glass" style={{ fontSize: 11, padding: "12px 28px" }}>
                    Follow on Instagram →
                </a>
            </div>
        </section>
    );
}
