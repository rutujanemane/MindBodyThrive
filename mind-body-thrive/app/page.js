import Hero from "./Components/Hero";
import Features from "./Components/Features";
import Navbar from "./Components/NavBar";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen   ">
      <Navbar />
      <Hero />
    <Features />
  </div>
  
  );
}
