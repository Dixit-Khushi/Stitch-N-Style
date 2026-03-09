import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    direction?: "up" | "left" | "right";
    delay?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ScrollReveal({
    children,
    direction = "up",
    delay = 0,
    className,
    style,
}: ScrollRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const transforms: Record<string, string> = {
        up: "rotateX(-6deg) translateY(60px) translateZ(-40px)",
        left: "rotateY(8deg) translateX(-60px) translateZ(-40px)",
        right: "rotateY(-8deg) translateX(60px) translateZ(-40px)",
    };

    return (
        <div
            ref={ref}
            className={className}
            style={{
                perspective: 1200,
                ...style,
            }}
        >
            <div
                style={{
                    transform: visible ? "none" : transforms[direction],
                    opacity: visible ? 1 : 0,
                    transition: `transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
                    transformOrigin: direction === "left" ? "right center" : direction === "right" ? "left center" : "center bottom",
                    willChange: "transform, opacity",
                }}
            >
                {children}
            </div>
        </div>
    );
}
