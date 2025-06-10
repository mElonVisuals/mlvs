import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Code, ShieldCheck } from 'lucide-react';

export function LandingPage({ onLoginClick }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 10,
        duration: 0.8
      },
    },
  };
  
  const logoContainerVariants = {
    initial: { scale: 0, rotate: -90, opacity: 0 },
    animate: { 
      scale: 1, 
      rotate: 0, 
      opacity: 1, 
      transition: { 
        type: "spring", 
        stiffness: 150, 
        damping: 15, 
        delay: 0.4,
        duration: 0.7
      } 
    }
  };

  const GlitchText = ({ children, className }) => (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute inset-0 opacity-70 text-secondary blur-[1px] animate-pulse" style={{ animationDuration: '0.05s', animationDirection: 'alternate-reverse', animationTimingFunction: 'steps(2, jump-end)' }} aria-hidden="true">{children}</span>
      <span className="absolute inset-0 opacity-70 text-primary blur-[1px] animate-pulse" style={{ animationDuration: '0.07s', animationDirection: 'alternate', animationTimingFunction: 'steps(3, jump-start)' }} aria-hidden="true">{children}</span>
      {children}
    </span>
  );

  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/df88ad0e-10b3-4647-8edb-bb90fb8b340a/25a074fa8e4856c6e21231a9788f7e73.png";


  return (
    <div className="full-screen-section relative overflow-hidden cyberpunk-rp-bg p-4">
      <div className="animated-circuit-bg"></div>
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={logoContainerVariants}
          initial="initial"
          animate="animate"
          className="mb-6 md:mb-8" 
          style={{ width: '200px', height: 'auto' }} 
        >
          <img 
            src={logoUrl} 
            alt="MLVS District Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-3 header-tagline-rp rounded-full px-6 py-3 mb-6 md:mb-8"
        >
          <Code className="w-5 h-5 md:w-6 md:h-6 text-secondary animate-pulse" />
          <span className="text-foreground font-semibold tracking-wider text-sm md:text-base">
            SYSTEM_STATUS:: <GlitchText>OPERATIONAL</GlitchText>
          </span>
        </motion.div>
        
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 uppercase title-rp-main gta-rp-text-stroke"
        >
          MLVS <GlitchText className="text-primary title-rp-accent">DISTRICT</GlitchText>
        </motion.h1>
        
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed tracking-wide"
        >
          Your centralized command interface for the urban sprawl. Access restricted networks, manage assets, and dominate the digital frontier.
        </motion.p>
        
        <motion.div
          variants={itemVariants}
          className="flex flex-col justify-center items-center w-full sm:w-auto"
        >
          <Button
            onClick={onLoginClick}
            size="lg"
            className="cyberpunk-rp-button w-full max-w-xs sm:max-w-sm md:max-w-md text-base md:text-lg px-8 md:px-10 py-3 md:py-4"
          >
            <ShieldCheck className="mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 animate-calm-pulse-subtle" />
            AUTHORIZE_ACCESS
          </Button>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="mt-12 md:mt-16 text-xs text-muted-foreground/70 tracking-widest uppercase"
        >
          <p>Ver. 2.5.2 // Secure Connection Protocol v4.9 Engaged</p>
          <p>&copy; {new Date().getFullYear()} MLVS_Network_Admin // All Rights Reserved Under District Charter</p>
        </motion.div>
      </motion.div>
      <img-replace src="/placeholder.jpg" alt="Futuristic cityscape of MLVS District with towering skyscrapers and neon signs, viewed from a high vantage point." className="absolute inset-0 w-full h-full object-cover opacity-[0.1] -z-10 pointer-events-none" />
    </div>
  );
}
