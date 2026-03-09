import { useRef, useState, ReactNode } from "react";

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    href?: string;
    onClick?: () => void;
    style?: React.CSSProperties;
    strength?: number;
}

export default function MagneticButton({
    children,
    className,
    href,
    onClick,
    style,
    strength = 0.3,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [transform, setTransform] = useState("translate(0px, 0px)");
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
    const [hovered, setHovered] = useState(false);

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        setTransform(`translate(${dx * strength}px, ${dy * strength}px)`);
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    const handleLeave = () => {
        setTransform("translate(0px, 0px)");
        setHovered(false);
    };

    const inner = (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={handleLeave}
            onClick={onClick}
            style={{
                display: "inline-block",
                position: "relative",
                transform,
                transition: hovered ? "transform 0.15s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
            }}
        >
            {/* Glow overlay */}
            {hovered && (
                <div style={{
                    position: "absolute", inset: -2,
                    borderRadius: "inherit",
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,175,55,0.2) 0%, transparent 60%)`,
                    pointerEvents: "none",
                    zIndex: 1,
                    transition: "opacity 0.3s",
                }} />
            )}
            {href ? (
                <a href={href} className={className} style={{ ...style, position: "relative", zIndex: 2, display: "inline-flex" }}>
                    {children}
                </a>
            ) : (
                <span className={className} style={{ ...style, position: "relative", zIndex: 2, display: "inline-flex" }}>
                    {children}
                </span>
            )}
        </div>
    );

    return inner;
}
