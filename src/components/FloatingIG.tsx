export default function FloatingIG() {
    return (
        <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
                position: "fixed",
                right: 20,
                bottom: 20,
                zIndex: 90,
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #833AB4, #E1306C, #F77737)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 20px rgba(225, 48, 108, 0.3)",
                transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s",
                textDecoration: "none",
                color: "#FFF",
                fontSize: 22,
            }}
            onMouseEnter={e => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.boxShadow = "0 6px 30px rgba(225, 48, 108, 0.5)";
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(225, 48, 108, 0.3)";
            }}
        >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
            </svg>
        </a>
    );
}
