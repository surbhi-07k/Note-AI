import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <>
            <main>
                <Hero />
                <Features />
                <HowItWorks />
            </main>

            <Footer />
        </>
    );
};

export default Home;