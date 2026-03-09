import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import JourneyBackground from "./components/StoryJourney";
import HeroSection from "./components/HeroSection";
import MarqueeRibbon from "./components/MarqueeRibbon";
import ScrollReveal from "./components/ScrollReveal";
import ProductGrid from "./components/ProductGrid";
import SizeGuide from "./components/SizeGuide";
import Checkout from "./components/Checkout";
import FAQSection from "./components/FAQSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";

export default function App() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <CartProvider>
            {/* Fixed 3D background */}
            <JourneyBackground />

            <Navbar onCartOpen={() => setCartOpen(true)} />
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
            <HeroSection />

            <MarqueeRibbon />

            <ScrollReveal direction="up">
                <ProductGrid />
            </ScrollReveal>

            <ScrollReveal direction="left" delay={100}>
                <SizeGuide />
            </ScrollReveal>

            <ScrollReveal direction="right" delay={100}>
                <Checkout />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
                <FAQSection />
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
                <ContactSection />
            </ScrollReveal>

            <MarqueeRibbon />

            <ScrollReveal direction="up">
                <Footer />
            </ScrollReveal>
        </CartProvider>
    );
}

