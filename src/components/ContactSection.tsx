import { useState } from "react";

export default function ContactSection() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) return;
        setSent(true);
    };

    const inputStyle: React.CSSProperties = {
        width: "100%", padding: "14px 16px", fontSize: 14, fontFamily: "inherit",
        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--r-sm)", color: "var(--text-primary)", outline: "none",
        transition: "border-color 0.2s",
    };

    return (
        <section id="contact" className="section-pad" style={{ maxWidth: 600, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 50 }}>
                <p className="section-label">Get in Touch</p>
                <h2 className="section-title">Contact Us</h2>
                <p className="section-sub">Questions, custom orders, or feedback — we'd love to hear from you</p>
            </div>

            {!sent ? (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", gap: 12 }}>
                        <input
                            type="text" placeholder="Your Name *" value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                            required
                        />
                        <input
                            type="email" placeholder="Email Address *" value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            style={inputStyle}
                            onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                            required
                        />
                    </div>
                    <input
                        type="text" placeholder="Subject (optional)" value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                        style={inputStyle}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                    />
                    <textarea
                        placeholder="Your Message *" value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        rows={5}
                        style={{ ...inputStyle, resize: "vertical", minHeight: 120 }}
                        onFocus={e => (e.currentTarget.style.borderColor = "rgba(212,175,55,0.4)")}
                        onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
                        required
                    />

                    {/* Contact info */}
                    <div style={{
                        display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center",
                        padding: "12px 0", fontSize: 11, color: "var(--text-muted)",
                    }}>
                        <span>📧 hello@stitchstyle.in</span>
                        <span>📞 +91 98765 43210</span>
                        <span>📍 Udaipur, Rajasthan, India</span>
                    </div>

                    <button type="submit" className="btn-gold" style={{
                        alignSelf: "center", padding: "14px 48px", fontSize: 13,
                    }}>
                        Send Message
                    </button>
                </form>
            ) : (
                <div style={{ textAlign: "center", animation: "fadeInUp 0.5s" }}>
                    <div style={{ fontSize: 44, marginBottom: 14, animation: "popIn 0.4s var(--ease-spring)" }}>💌</div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Message Sent!</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                        We'll get back to you within 24 hours. Thank you, {form.name}!
                    </p>
                    <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                        className="btn-glass" style={{ marginTop: 20, fontSize: 12 }}>
                        Send Another Message
                    </button>
                </div>
            )}
        </section>
    );
}
