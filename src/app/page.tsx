import { FC } from "react";
import HomeComponent from "@/components/home/hero.component";
import AboutComponent from "@/components/home/about.component";
import ClassComponent from "@/components/home/class.component";
import TrainersComponent from "@/components/home/trainers.component";
import PricingComponent from "@/components/home/pricing.component";
import CallComponent from "@/components/home/call.component";

const Home: FC = () => {
  return (
    <>
      <HomeComponent />
      <AboutComponent />
      <ClassComponent />
      <TrainersComponent />
      <PricingComponent />
      <CallComponent />
    </>
  );
};

export default Home;
