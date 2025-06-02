"use client";

import { getPrices } from "@/lib/db/actions/price.action";
import { IPriceData } from "@/type";
import { fadeInUp, staggerContainer } from "@/utils/motionEffect.util";
import { motion } from "framer-motion";
import { FC, useEffect, useState, useMemo } from "react";
import PriceCard from "./priceCard.component";
import { useMatriculaValue } from "@/hooks/useMatriculaValue";

const PricingComponent: FC = () => {
  const [prices, setPrices] = useState<IPriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const { value: matriculaValue, description: matriculaDescription } =
    useMatriculaValue();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const pricesData = JSON.parse(await getPrices(true)) as IPriceData[];
        setPrices(pricesData);
      } catch (error) {
        console.error("Error fetching prices:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchData();
  }, []);

  const { standardPrices, popularPrice, consultPrice } = useMemo(() => {
    const activePrices = prices.filter((item) => item.active);

    const standard = activePrices.filter((item) => !item.isPopular);

    const popular = activePrices.find((item) => item.isPopular);

    const standardPlan = standard.length > 0 ? standard[0] : null;
    const consultPlan = standard.length > 1 ? standard[1] : null;

    return {
      standardPrices: standardPlan ? [standardPlan] : [],
      popularPrice: popular || null,
      consultPrice: consultPlan || null,
    };
  }, [prices]);

  return (
    <section
      id="pricing"
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0f0f0f] via-accent-dark/60 to-[#0f0f0f] relative"
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 border-8 border-primary rounded-full"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 border-8 border-primary rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div className="flex flex-row justify-center items-center gap-3">
            <motion.div
              variants={fadeInUp}
              className="flex justify-center mb-4"
            >
              <div className="inline-block px-6 py-2 bg-primary/10 rounded-full">
                <span className="font-oswald text-primary text-sm tracking-widest">
                  MEMBRESÍAS
                </span>
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="font-bebas text-5xl md:text-6xl text-white mb-4 relative"
            >
              PLANES DE MEMBRESÍA
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
            </motion.h2>
          </motion.div>
          <motion.p
            variants={fadeInUp}
            className="font-montserrat text-accent-medium max-w-3xl mx-auto mt-6"
          >
            Elige el plan que mejor se adapte a tus objetivos y horario. Todas
            las membresías incluyen acceso a nuestras instalaciones de primer
            nivel y tu primera clase de prueba es totalmente GRATIS.
          </motion.p>
        </motion.div>

        <div className="w-full flex flex-row justify-center items-center my-14">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%]">
            {matriculaValue > 0 && (
              <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
                <h4 className="text-white text-sm font-oswald uppercase mb-1">
                  Matrícula
                </h4>
                <div className="flex items-center justify-center">
                  <span className="text-primary font-bebas text-3xl mr-1">
                    $
                  </span>
                  <span className="text-primary font-bebas text-4xl">
                    {matriculaValue}
                  </span>
                  <span className="text-accent-medium text-xs self-end mb-1 ml-1">
                    (pago único)
                  </span>
                </div>
                {matriculaDescription && (
                  <p className="text-xs text-accent-light text-center mt-1">
                    {matriculaDescription}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-8 lg:gap-10"
          >
            {standardPrices.length > 0 && (
              <PriceCard item={standardPrices[0]} />
            )}

            {popularPrice && <PriceCard item={popularPrice} isPopular={true} />}
            {consultPrice && (
              <PriceCard item={consultPrice} showConsultButton={true} />
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PricingComponent;
