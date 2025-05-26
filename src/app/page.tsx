import { FC } from "react";
import HomeComponent from "@/components/home/hero.component";
import AboutComponent from "@/components/home/about.component";
import ClassComponent from "@/components/home/class.component";
import TrainersComponent from "@/components/home/trainers.component";
import PricingComponent from "@/components/home/pricing.component";
import CallComponent from "@/components/home/call.component";
import CuerdaSharedComponent from "@/components/shared/cuerda.shared.component";

const Home: FC = () => {
  return (
    <>
      <HomeComponent />
      <AboutComponent />
      <CuerdaSharedComponent src="/cuerda.webp" />
      <ClassComponent />
      <CuerdaSharedComponent src="/cuerda2.webp" />
      <TrainersComponent />
      <CuerdaSharedComponent src="/cuerda3.webp" />
      <PricingComponent />
      <CallComponent />
    </>
  );
};

export default Home;
