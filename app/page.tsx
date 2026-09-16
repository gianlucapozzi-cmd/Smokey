import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Benefits } from "@/components/Benefits";
import { TwoWays } from "@/components/TwoWays";
import { CommunityForm } from "@/components/CommunityForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Benefits />
        <TwoWays />
        <CommunityForm />
      </main>
      <Footer />
    </>
  );
}
