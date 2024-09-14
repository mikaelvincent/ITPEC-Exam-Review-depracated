import Features from "@/components/home/features";
import MainHeader from "@/components/home/main-header";
import Pricing from "@/components/home/pricing";

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <MainHeader />
      <Features />
      <Pricing />
    </div>
  );
}
