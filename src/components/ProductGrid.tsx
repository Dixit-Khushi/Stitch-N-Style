import { useState, useRef } from "react";
import { useCart } from "../context/CartContext";

interface Review {
    name: string;
    rating: number;
    text: string;
    date: string;
}

interface Product {
    id: number; name: string; price: number; priceLabel: string;
    image: string; tag?: string; sizes: string[];
    rating: number; reviewCount: number; reviews: Review[];
    description: string;
}

const sampleReviews: Record<number, Review[]> = {
    1: [
        { name: "Arjun S.", rating: 5, text: "Perfect fit, premium quality fabric. Worth every rupee.", date: "2 days ago" },
        { name: "Riya M.", rating: 4, text: "Great blazer, runs slightly large. Size down!", date: "1 week ago" },
        { name: "Karan P.", rating: 5, text: "Wore it to a wedding — got so many compliments.", date: "2 weeks ago" },
    ],
    2: [
        { name: "Dev K.", rating: 5, text: "Super comfortable cargo pants. The pockets are deep!", date: "3 days ago" },
        { name: "Priya R.", rating: 4, text: "Good quality denim, washes well.", date: "5 days ago" },
    ],
    3: [
        { name: "Amit D.", rating: 5, text: "Softest hoodie I've ever worn. Living in it.", date: "1 day ago" },
        { name: "Neha G.", rating: 5, text: "Love the phantom black color, so versatile.", date: "4 days ago" },
        { name: "Rohit B.", rating: 4, text: "Slightly thin for winter but perfect for spring.", date: "1 week ago" },
    ],
    4: [
        { name: "Vikram S.", rating: 5, text: "Real leather, amazing smell. Premium feel.", date: "1 week ago" },
        { name: "Ananya T.", rating: 5, text: "Statement piece. Best purchase this year.", date: "2 weeks ago" },
    ],
    5: [
        { name: "Meera J.", rating: 4, text: "Clean white, good cotton quality.", date: "3 days ago" },
        { name: "Rahul V.", rating: 5, text: "Basic but elevated. Goes with everything.", date: "6 days ago" },
    ],
    6: [
        { name: "Simran K.", rating: 5, text: "The wash on this denim is *chef's kiss*.", date: "2 days ago" },
        { name: "Aditya P.", rating: 4, text: "Fits perfectly, very comfortable stretch.", date: "1 week ago" },
    ],
    7: [
        { name: "Kavya N.", rating: 5, text: "Silk drape is beautiful. Feels luxurious.", date: "4 days ago" },
        { name: "Ishaan R.", rating: 5, text: "Wore it untucked — instant style upgrade.", date: "1 week ago" },
    ],
    8: [
        { name: "Zara F.", rating: 5, text: "The velvet is so plush! Lounging in style.", date: "1 day ago" },
        { name: "Manav S.", rating: 4, text: "Comfortable set, great for WFH days.", date: "5 days ago" },
    ],
};

const products: Product[] = [
    { id: 1, name: "Noir Oversized Blazer", price: 4999, priceLabel: "₹4,999", image: "/products/noir-blazer.png", tag: "BESTSELLER", sizes: ["S", "M", "L", "XL"], rating: 4.7, reviewCount: 128, reviews: sampleReviews[1], description: "Premium wool-blend oversized blazer. Relaxed fit, satin-lined interior. Dry clean only." },
    { id: 2, name: "Midnight Cargo Pants", price: 2499, priceLabel: "₹2,499", image: "/products/cargo-pants.png", sizes: ["S", "M", "L", "XL", "XXL"], rating: 4.5, reviewCount: 89, reviews: sampleReviews[2], description: "Heavy-duty cotton cargo with 6-pocket utility design. Tapered leg, drawstring hem." },
    { id: 3, name: "Phantom Hoodie", price: 3299, priceLabel: "₹3,299", image: "/products/phantom-hoodie.png", tag: "NEW", sizes: ["S", "M", "L"], rating: 4.8, reviewCount: 64, reviews: sampleReviews[3], description: "460 GSM French terry hoodie. Oversized fit, kangaroo pocket, ribbed cuffs." },
    { id: 4, name: "Obsidian Leather Jacket", price: 7999, priceLabel: "₹7,999", image: "/products/leather-jacket.png", tag: "PREMIUM", sizes: ["M", "L", "XL"], rating: 4.9, reviewCount: 42, reviews: sampleReviews[4], description: "Genuine leather biker jacket. YKK zippers, quilted lining, snap collar." },
    { id: 5, name: "Ghost White Tee", price: 1499, priceLabel: "₹1,499", image: "/products/white-tee.png", sizes: ["XS", "S", "M", "L", "XL"], rating: 4.3, reviewCount: 210, reviews: sampleReviews[5], description: "Supima cotton crew neck tee. 180 GSM, pre-shrunk, double-stitched hems." },
    { id: 6, name: "Eclipse Denim", price: 3799, priceLabel: "₹3,799", image: "/products/eclipse-denim.png", tag: "TRENDING", sizes: ["S", "M", "L", "XL"], rating: 4.6, reviewCount: 96, reviews: sampleReviews[6], description: "Japanese selvedge denim. Slim-straight fit, raw indigo wash, riveted pockets." },
    { id: 7, name: "Silk Draped Shirt", price: 5499, priceLabel: "₹5,499", image: "/products/silk-shirt.png", tag: "LUXE", sizes: ["S", "M", "L"], rating: 4.8, reviewCount: 37, reviews: sampleReviews[7], description: "100% mulberry silk shirt. Relaxed drape, mother-of-pearl buttons." },
    { id: 8, name: "Velvet Lounge Set", price: 6299, priceLabel: "₹6,299", image: "/products/velvet-lounge.png", sizes: ["M", "L", "XL"], rating: 4.7, reviewCount: 53, reviews: sampleReviews[8], description: "Plush velvet co-ord set. Elastic waist, oversized top, matching joggers." },
];

function Stars({ rating, size = 12 }: { rating: number; size?: number }) {
    return (
        <span style={{ display: "inline-flex", gap: 1 }}>
            {[1, 2, 3, 4, 5].map(i => (
                <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? "var(--gold)" : "rgba(255,255,255,0.15)" }}>★</span>
            ))}
        </span>
    );
}

// Quick View Modal
function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        if (!selectedSize) return;
        addItem({ id: product.id, name: product.name, price: product.price, priceLabel: product.priceLabel, size: selectedSize });
        setAdded(true);
        setTimeout(() => { setAdded(false); onClose(); }, 1200);
    };

    return (
        <div onClick={onClose} style={{
            position: "fixed", inset: 0, zIndex: 1000,
            background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "fadeInUp 0.3s ease-out",
        }}>
            <div onClick={e => e.stopPropagation()} className="quickview-modal" style={{
                width: "90%", maxWidth: 720, maxHeight: "85vh",
                background: "var(--bg-card)", borderRadius: "var(--r-xl)",
                border: "1px solid rgba(212,175,55,0.15)",
                display: "flex", overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
            }}>
                {/* Image */}
                <div className="quickview-img" style={{ width: "50%", minHeight: 400, position: "relative" }}>
                    <img src={product.image} alt={product.name} style={{
                        width: "100%", height: "100%",
                        objectFit: "cover", objectPosition: "center",
                    }} />
                    {product.tag && (
                        <div style={{
                            position: "absolute", top: 16, left: 16, padding: "4px 12px",
                            fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                            background: product.tag === "PREMIUM" || product.tag === "LUXE"
                                ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(0,0,0,0.6)",
                            color: product.tag === "PREMIUM" || product.tag === "LUXE" ? "var(--bg-primary)" : "var(--gold)",
                            borderRadius: "var(--r-full)",
                        }}>{product.tag}</div>
                    )}
                </div>

                {/* Details */}
                <div className="quickview-details" style={{ width: "50%", padding: "32px 28px", display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
                    <button onClick={onClose} style={{
                        alignSelf: "flex-end", background: "none", border: "none",
                        color: "var(--text-muted)", cursor: "pointer", fontSize: 20, fontFamily: "inherit",
                    }}>✕</button>

                    <h2 style={{ fontSize: 22, fontWeight: 700 }}>{product.name}</h2>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <Stars rating={product.rating} size={14} />
                        <span style={{ fontSize: 13, color: "var(--gold)", fontWeight: 700 }}>{product.rating}</span>
                        <span style={{ fontSize: 11, color: "var(--text-muted)" }}>({product.reviewCount} reviews)</span>
                    </div>

                    <span style={{ fontSize: 24, fontWeight: 800, color: "var(--gold)" }}>{product.priceLabel}</span>

                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7 }}>{product.description}</p>

                    {/* Size selector */}
                    <div>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>Select Size</p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {product.sizes.map(s => (
                                <button key={s} onClick={() => setSelectedSize(s)} style={{
                                    padding: "10px 18px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", cursor: "pointer",
                                    background: selectedSize === s ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(255,255,255,0.04)",
                                    color: selectedSize === s ? "var(--bg-primary)" : "var(--text-primary)",
                                    border: selectedSize === s ? "none" : "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "var(--r-sm)", transition: "all 0.2s",
                                }}>{s}</button>
                            ))}
                        </div>
                    </div>

                    <button onClick={handleAdd} disabled={!selectedSize}
                        style={{
                            width: "100%", padding: "14px 0", fontSize: 13, fontWeight: 700, fontFamily: "inherit",
                            letterSpacing: 2, textTransform: "uppercase", cursor: selectedSize ? "pointer" : "not-allowed",
                            background: added ? "rgba(76,175,80,0.15)" : selectedSize ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(255,255,255,0.06)",
                            color: added ? "#4CAF50" : selectedSize ? "var(--bg-primary)" : "var(--text-muted)",
                            border: added ? "1px solid #4CAF50" : "none",
                            borderRadius: "var(--r-sm)", transition: "all 0.3s",
                        }}>
                        {added ? "✓ Added!" : selectedSize ? "🛍️ Add to Bag" : "Select a Size"}
                    </button>

                    {/* Sample reviews */}
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 16, marginTop: 4 }}>
                        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
                            Top Reviews
                        </p>
                        {product.reviews.slice(0, 3).map((r, i) => (
                            <div key={i} style={{ marginBottom: 14 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                    <Stars rating={r.rating} size={10} />
                                    <span style={{ fontSize: 11, fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</span>
                                    <span style={{ fontSize: 9, color: "var(--text-muted)" }}>{r.date}</span>
                                </div>
                                <p style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 1.5 }}>{r.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


function ProductCard({ product, onQuickView }: { product: Product; onQuickView: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [rot, setRot] = useState({ x: 0, y: 0 });
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [addedFeedback, setAddedFeedback] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [wishlisted, setWishlisted] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [userReview, setUserReview] = useState({ rating: 0, text: "", submitted: false });
    const { addItem } = useCart();

    const handleAdd = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 1500);
            return;
        }
        addItem({ id: product.id, name: product.name, price: product.price, priceLabel: product.priceLabel, size: selectedSize });
        setAddedFeedback(true);
        setTimeout(() => setAddedFeedback(false), 1800);
    };

    return (
        <div
            ref={ref}
            style={{ perspective: 900 }}
            onMouseMove={e => {
                const r = ref.current!.getBoundingClientRect();
                setRot({
                    x: ((e.clientY - r.top) / r.height - 0.5) * -12,
                    y: ((e.clientX - r.left) / r.width - 0.5) * 12,
                });
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => { setRot({ x: 0, y: 0 }); setHovered(false); }}
        >
            <div style={{
                width: "100%", borderRadius: "var(--r-md)",
                overflow: "hidden", position: "relative",
                background: "var(--bg-card)",
                transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale(${hovered ? 1.02 : 1})`,
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                border: hovered ? "1px solid rgba(212,175,55,0.25)" : "1px solid rgba(255,255,255,0.04)",
                boxShadow: hovered
                    ? `0 ${30 + rot.x * 2}px ${50 + Math.abs(rot.y) * 3}px rgba(0,0,0,0.55), 0 0 60px rgba(212,175,55,0.12), ${rot.y * -1.5}px ${rot.x * 1.5}px 30px rgba(212,175,55,0.06)`
                    : "0 4px 12px rgba(0,0,0,0.2)",
            }}>

                {/* Product Image */}
                <div style={{ width: "100%", height: 340, overflow: "hidden", position: "relative", cursor: "pointer" }}
                    onClick={onQuickView}>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            width: "100%", height: "100%",
                            objectFit: "cover", objectPosition: "center",
                            transform: `scale(${hovered ? 1.08 : 1})`,
                            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                        }}
                    />

                    {/* Dark overlay */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.3) 100%)",
                    }} />

                    {/* Gold light reflection */}
                    <div style={{
                        position: "absolute", inset: 0, pointerEvents: "none",
                        background: hovered
                            ? `linear-gradient(${120 + rot.y * 6}deg, transparent 10%, rgba(212,175,55,0.08) 40%, rgba(255,255,255,0.04) 50%, rgba(212,175,55,0.08) 60%, transparent 90%)`
                            : "none",
                        transition: "background 0.15s ease-out",
                    }} />

                    {/* Specular highlight */}
                    {hovered && (
                        <div style={{
                            position: "absolute", width: 120, height: 120, borderRadius: "50%",
                            background: "radial-gradient(circle, rgba(212,175,55,0.1) 0%, transparent 70%)",
                            left: `calc(${50 + rot.y * 4}% - 60px)`, top: `calc(${50 + rot.x * 4}% - 60px)`,
                            pointerEvents: "none",
                        }} />
                    )}

                    {/* Tag */}
                    {product.tag && (
                        <div style={{
                            position: "absolute", top: 12, left: 12, padding: "4px 12px",
                            fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", zIndex: 3,
                            background: product.tag === "PREMIUM" || product.tag === "LUXE"
                                ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(0,0,0,0.5)",
                            color: product.tag === "PREMIUM" || product.tag === "LUXE" ? "var(--bg-primary)" : "var(--gold)",
                            borderRadius: "var(--r-full)",
                            border: product.tag === "PREMIUM" || product.tag === "LUXE" ? "none" : "1px solid rgba(212,175,55,0.3)",
                            backdropFilter: "blur(10px)",
                        }}>{product.tag}</div>
                    )}

                    {/* Wishlist heart */}
                    <button onClick={e => { e.stopPropagation(); setWishlisted(!wishlisted); }}
                        style={{
                            position: "absolute", top: 12, right: 12, zIndex: 3,
                            width: 34, height: 34, borderRadius: "50%",
                            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                            border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 16,
                            transition: "all 0.3s",
                            transform: wishlisted ? "scale(1.15)" : "scale(1)",
                        }}>
                        {wishlisted ? "❤️" : "🤍"}
                    </button>

                    {/* Quick view hint */}
                    {hovered && (
                        <div style={{
                            position: "absolute", bottom: 12, left: "50%", transform: "translateX(-50%)",
                            padding: "6px 16px", fontSize: 9, fontWeight: 700, letterSpacing: 2,
                            textTransform: "uppercase", color: "#fff",
                            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                            borderRadius: "var(--r-full)", pointerEvents: "none",
                            animation: "fadeInUp 0.2s",
                        }}>Quick View</div>
                    )}
                </div>

                {/* Info + Controls */}
                <div style={{
                    padding: "16px 18px 18px",
                    background: "var(--bg-card)",
                    display: "flex", flexDirection: "column", gap: 8,
                    position: "relative", zIndex: 10,
                }}>
                    {/* Name + Price */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--text-primary)" }}>{product.name}</h3>
                        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--gold)", whiteSpace: "nowrap" }}>{product.priceLabel}</span>
                    </div>

                    {/* Stars + Review count */}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}
                        onClick={() => setShowReviews(!showReviews)}>
                        <Stars rating={product.rating} />
                        <span style={{ fontSize: 11, fontWeight: 600, color: "var(--gold)" }}>{product.rating}</span>
                        <span style={{ fontSize: 10, color: "var(--text-muted)" }}>({product.reviewCount})</span>
                        <span style={{ fontSize: 9, color: "var(--text-muted)", marginLeft: "auto" }}>
                            {showReviews ? "▲ Hide" : "▼ Reviews"}
                        </span>
                    </div>

                    {/* Expandable reviews */}
                    <div style={{
                        maxHeight: showReviews ? 300 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.4s ease-in-out",
                    }}>
                        <div style={{ padding: "8px 0", display: "flex", flexDirection: "column", gap: 10 }}>
                            {product.reviews.slice(0, 3).map((r, i) => (
                                <div key={i} style={{ padding: "8px 10px", background: "rgba(255,255,255,0.02)", borderRadius: "var(--r-sm)" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                                        <Stars rating={r.rating} size={9} />
                                        <span style={{ fontSize: 10, fontWeight: 600, color: "var(--text-primary)" }}>{r.name}</span>
                                        <span style={{ fontSize: 8, color: "var(--text-muted)", marginLeft: "auto" }}>{r.date}</span>
                                    </div>
                                    <p style={{ fontSize: 11, color: "var(--text-secondary)", lineHeight: 1.4, margin: 0 }}>{r.text}</p>
                                </div>
                            ))}

                            {/* Write a review */}
                            {!userReview.submitted ? (
                                <div style={{ padding: "8px 0", display: "flex", flexDirection: "column", gap: 6 }}>
                                    <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)" }}>Write a Review</p>
                                    <div style={{ display: "flex", gap: 4 }}>
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <span key={i} onClick={() => setUserReview(r => ({ ...r, rating: i }))}
                                                style={{ cursor: "pointer", fontSize: 16, color: i <= userReview.rating ? "var(--gold)" : "rgba(255,255,255,0.15)", transition: "color 0.15s" }}>★</span>
                                        ))}
                                    </div>
                                    <textarea
                                        placeholder="Share your experience..."
                                        value={userReview.text}
                                        onChange={e => setUserReview(r => ({ ...r, text: e.target.value }))}
                                        style={{
                                            width: "100%", padding: "8px 10px", fontSize: 11, fontFamily: "inherit",
                                            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                                            borderRadius: "var(--r-sm)", color: "var(--text-primary)", outline: "none",
                                            resize: "none", minHeight: 50,
                                        }}
                                    />
                                    <button
                                        onClick={() => { if (userReview.rating > 0 && userReview.text.trim()) setUserReview(r => ({ ...r, submitted: true })); }}
                                        style={{
                                            padding: "8px 16px", fontSize: 10, fontWeight: 700, fontFamily: "inherit",
                                            letterSpacing: 1, textTransform: "uppercase", cursor: "pointer",
                                            background: userReview.rating > 0 && userReview.text.trim() ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "rgba(255,255,255,0.04)",
                                            color: userReview.rating > 0 && userReview.text.trim() ? "var(--bg-primary)" : "var(--text-muted)",
                                            border: "none", borderRadius: "var(--r-sm)", transition: "all 0.2s",
                                        }}>Submit Review</button>
                                </div>
                            ) : (
                                <div style={{ padding: "10px 0", textAlign: "center" }}>
                                    <span style={{ fontSize: 11, color: "#4CAF50", fontWeight: 600 }}>✓ Thank you for your review!</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Size selector */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{
                            fontSize: 10, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
                            color: sizeError ? "#FF6B6B" : selectedSize ? "var(--gold)" : "var(--text-muted)",
                            transition: "color 0.2s",
                            animation: sizeError ? "shake 0.4s ease-in-out" : "none",
                        }}>
                            {sizeError ? "⚠ Pick a size first!" : selectedSize ? `Size: ${selectedSize} ✓` : "Select Size"}
                        </span>
                        <a href="#size-guide" style={{
                            fontSize: 9, color: "var(--gold)", textDecoration: "none",
                            letterSpacing: 1, textTransform: "uppercase", fontWeight: 600, opacity: 0.6,
                        }}>Size Guide →</a>
                    </div>

                    <div style={{ display: "flex", gap: 5 }}>
                        {product.sizes.map(s => (
                            <button key={s}
                                onClick={e => { e.stopPropagation(); setSelectedSize(s); setSizeError(false); }}
                                style={{
                                    flex: 1, padding: "9px 0", fontSize: 12, fontWeight: 700, fontFamily: "inherit",
                                    cursor: "pointer",
                                    background: selectedSize === s
                                        ? "linear-gradient(135deg, var(--gold), var(--gold-light))"
                                        : "rgba(255,255,255,0.04)",
                                    color: selectedSize === s ? "var(--bg-primary)" : "var(--text-primary)",
                                    border: selectedSize === s ? "none" : sizeError
                                        ? "1px solid rgba(255,107,107,0.5)" : "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: "var(--r-sm)",
                                    transition: "all 0.2s",
                                    transform: selectedSize === s ? "scale(1.05)" : "scale(1)",
                                    boxShadow: selectedSize === s ? "0 4px 12px rgba(212,175,55,0.3)" : "none",
                                }}>
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Add to Bag */}
                    <button
                        onClick={e => { e.stopPropagation(); handleAdd(); }}
                        style={{
                            width: "100%", padding: "12px 0", fontSize: 12, fontWeight: 700, fontFamily: "inherit",
                            letterSpacing: 2, textTransform: "uppercase", cursor: "pointer",
                            background: addedFeedback ? "rgba(76,175,80,0.15)"
                                : !selectedSize ? "rgba(255,255,255,0.04)" : "linear-gradient(135deg, var(--gold), var(--gold-light))",
                            color: addedFeedback ? "#4CAF50" : !selectedSize ? "var(--text-muted)" : "var(--bg-primary)",
                            border: addedFeedback ? "1px solid #4CAF50" : !selectedSize ? "1px solid rgba(255,255,255,0.08)" : "none",
                            borderRadius: "var(--r-sm)",
                            transition: "all 0.3s",
                            boxShadow: selectedSize && !addedFeedback ? "0 4px 16px rgba(212,175,55,0.3)" : "none",
                            animation: sizeError ? "shake 0.4s ease-in-out" : "none",
                        }}
                    >
                        {addedFeedback ? "✓ Added to Bag!" : !selectedSize ? "Select Size to Add" : "🛍️ Add to Bag"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function ProductGrid() {
    const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

    return (
        <>
            <section id="products" className="section-pad">
                <div style={{ textAlign: "center", marginBottom: 50 }}>
                    <p className="section-label">Collections</p>
                    <h2 className="section-title">Curated For You</h2>
                    <p className="section-sub">Pick your size & add to bag — <a href="#size-guide" style={{ color: "var(--gold)", textDecoration: "none" }}>need help? Size Guide ↓</a></p>
                </div>
                <div className="product-grid">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} onQuickView={() => setQuickViewProduct(p)} />
                    ))}
                </div>
            </section>

            {quickViewProduct && (
                <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
            )}
        </>
    );
}
