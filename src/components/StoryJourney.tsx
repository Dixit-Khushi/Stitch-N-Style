import { useEffect, useRef } from "react";

/*
  3D Ambient Background — A subtle, elegant animated canvas
  with golden particles and connecting lines that respond
  to mouse movement with 3D depth and perspective.
*/

interface Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;
    depth: number; // 0 = far, 1 = near — controls parallax intensity
    hue: number;
    opacity: number;
    phase: number;
}

export default function JourneyBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const animRef = useRef<number>(0);
    const particles = useRef<Particle[]>([]);
    const mouse = useRef({ x: 0.5, y: 0.5 });
    const smoothMouse = useRef({ x: 0.5, y: 0.5 });
    const time = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;
        let w = 0, h = 0;

        const init = () => {
            const dpr = Math.min(devicePixelRatio, 2);
            w = canvas.offsetWidth;
            h = canvas.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.min(120, Math.floor((w * h) / 12000));
            const result: Particle[] = [];
            for (let i = 0; i < count; i++) {
                const x = Math.random() * w;
                const y = Math.random() * h;
                result.push({
                    x, y,
                    baseX: x,
                    baseY: y,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: 1 + Math.random() * 2,
                    depth: 0.2 + Math.random() * 0.8,
                    hue: 36 + Math.random() * 14,
                    opacity: 0.15 + Math.random() * 0.35,
                    phase: Math.random() * Math.PI * 2,
                });
            }
            particles.current = result;
        };

        const draw = () => {
            time.current += 0.008;
            const t = time.current;

            // Smooth mouse
            smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
            smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;
            const mx = smoothMouse.current.x - 0.5;
            const my = smoothMouse.current.y - 0.5;

            // 3D perspective tilt on wrapper
            if (wrapperRef.current) {
                const tiltX = my * -8;
                const tiltY = mx * 8;
                wrapperRef.current.style.transform =
                    `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            // Clear
            ctx.fillStyle = "rgba(15, 15, 15, 1)";
            ctx.fillRect(0, 0, w, h);

            const pts = particles.current;

            // Update + draw particles
            for (const p of pts) {
                // Gentle autonomous drift
                p.baseX += p.vx;
                p.baseY += p.vy;

                // Bounce off edges (with padding)
                if (p.baseX < -20 || p.baseX > w + 20) p.vx *= -1;
                if (p.baseY < -20 || p.baseY > h + 20) p.vy *= -1;

                // 3D parallax shift based on depth
                p.x = p.baseX + mx * p.depth * 60;
                p.y = p.baseY + my * p.depth * 60;

                // Pulse
                const pulse = 0.7 + Math.sin(t * 1.5 + p.phase) * 0.3;
                const alpha = p.opacity * pulse * (0.4 + p.depth * 0.6);

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * (0.5 + p.depth * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 65%, 55%, ${alpha})`;
                ctx.fill();

                // Glow
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3 * p.depth, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${alpha * 0.1})`;
                ctx.fill();
            }

            // Draw connecting lines between nearby particles
            ctx.lineCap = "round";
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x;
                    const dy = pts[i].y - pts[j].y;
                    const dist = dx * dx + dy * dy;
                    const maxDist = 18000; // ~134px

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.06 *
                            Math.min(pts[i].depth, pts[j].depth);
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.strokeStyle = `rgba(212, 175, 55, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Mouse spotlight
            const spotX = smoothMouse.current.x * w;
            const spotY = smoothMouse.current.y * h;
            const spot = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 280);
            spot.addColorStop(0, "rgba(212, 175, 55, 0.04)");
            spot.addColorStop(0.5, "rgba(212, 175, 55, 0.012)");
            spot.addColorStop(1, "rgba(212, 175, 55, 0)");
            ctx.fillStyle = spot;
            ctx.fillRect(spotX - 280, spotY - 280, 560, 560);

            animRef.current = requestAnimationFrame(draw);
        };

        const handleMouse = (e: MouseEvent) => {
            mouse.current = {
                x: e.clientX / window.innerWidth,
                y: e.clientY / window.innerHeight,
            };
        };

        init();
        draw();

        window.addEventListener("resize", init);
        window.addEventListener("mousemove", handleMouse);

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", init);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "fixed",
                inset: "-30px",
                zIndex: -1,
                pointerEvents: "none",
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease-out",
                willChange: "transform",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    width: "calc(100% + 60px)",
                    height: "calc(100% + 60px)",
                    background: "var(--bg-primary)",
                }}
            />
        </div>
    );
}
