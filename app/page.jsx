import Image from "next/image";
import Navbar from "../components/layout/Navbar";
export default function Home() {
  return (
    <>
  <Navbar />
     <section className="hero-section flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-5xl font-bold mb-6">Welcome to GymLedger</h1>
            <p className="text-xl mb-8 text-center px-4">
                Your ultimate solution for managing gym memberships, tracking workouts, and monitoring progress.
            </p>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">
                Get Started
            </button>
        </section>
    </>
    
  );
}
