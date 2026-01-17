import AnimatedBackground from '@/components/AnimatedBackground';
import Navbar from '@/components/Navbar';
import Hero from '../components/Hero';
import AISearchBar from '@/components/AISearchBar';

export default function Home() {
  return (
    <main>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <AISearchBar />
    </main>
  );
}