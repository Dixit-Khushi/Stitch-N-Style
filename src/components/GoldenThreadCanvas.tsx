import { useEffect, useRef } from "react";

interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    size: number; opacity: number;
}

export default function GoldenThreadCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouse = useRef({ x: -1000, y: -1000 });
    const particles = useRef<Particle[]>([]);
    const animRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = 0, h = 0;

        const resize = () => {
            w = canvas.width = canvas.offsetWidth * devicePixelRatio;
            h = canvas.height = canvas.offsetHeight * devicePixelRatio;
            ctx.scale(devicePixelRatio, devicePixelRatio);
        };

        const initParticles = () => {
            const count = Math.min(90, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 12000));
            particles.current = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.offsetWidth,
                y: Math.random() * canvas.offsetHeight,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            }));
        };

        const draw = () => {
            const cw = canvas.offsetWidth;
            const ch = canvas.offsetHeight;
            ctx.clearRect(0, 0, cw, ch);
            const pts = particles.current;
            const mx = mouse.current.x;
            const my = mouse.current.y;

            // Update positions
            for (const p of pts) {
                // Mouse attraction
                const dx = mx - p.x;
                const dy = my - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150 && dist > 1) {
                    p.vx += (dx / dist) * 0.03;
                    p.vy += (dy / dist) * 0.03;
                }

                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.99;
                p.vy *= 0.99;

                // Wrap
                if (p.x < 0) p.x = cw;
                if (p.x > cw) p.x = 0;
                if (p.y < 0) p.y = ch;
                if (p.y > ch) p.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 55, ${p.opacity * 0.08})`;
                ctx.fill();
            }

            // Draw thread connections
            const connDist = 130;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x;
                    const dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < connDist) {
                        const alpha = (1 - d / connDist) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Mouse glow
            if (mx > 0 && my > 0) {
                const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
                grad.addColorStop(0, "rgba(212, 175, 55, 0.06)");
                grad.addColorStop(1, "rgba(212, 175, 55, 0)");
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, cw, ch);
            }

            animRef.current = requestAnimationFrame(draw);
        };

        const handleMouse = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };

        const handleLeave = () => {
            mouse.current = { x: -1000, y: -1000 };
        };

        resize();
        initParticles();
        draw();

        window.addEventListener("resize", () => { resize(); initParticles(); });
        canvas.addEventListener("mousemove", handleMouse);
        canvas.addEventListener("mouseleave", handleLeave);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
            canvas.removeEventListener("mouseleave", handleLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%",
                pointerEvents: "auto", zIndex: 1,
            }}
        />
    );
}
