import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Eye, EyeOff, Terminal, AlertTriangle, Zap, Network } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

export function LoginForm({ onLogin }) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate network latency & processing for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500)); 

    const success = onLogin(password);
    
    if (success) {
      toast({
        title: "SYSTEM_LINK::ESTABLISHED",
        description: "Operator Authenticated. Welcome to the Grid.",
        variant: "default",
        duration: 4000,
      });
    } else {
      setError("ACCESS_DENIED: Invalid Credentials. Attempt Logged. System Integrity Alert.");
      toast({
        title: "SECURITY_BREACH_ATTEMPT",
        description: "Invalid passcode. Threat level escalated. System integrity remains paramount.",
        variant: "destructive",
        duration: 5000,
      });
    }
    
    setIsLoading(false);
    if (!success) setPassword(''); 
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.6, y: 100, rotateX: -30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.7, type: "spring", stiffness: 100, damping: 12, delay: 0.1 }
    }
  };

  const inputGroupVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.03 },
    focus: { scale: 1.05, y: -2 }
  };

  return (
    <div className="login-form-container p-4 relative overflow-hidden cyberpunk-rp-bg">
      <div className="animated-circuit-bg enhanced-circuits"></div>
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Zap className="absolute top-1/4 left-1/4 w-32 h-32 text-primary/10 animate-pulse opacity-30" style={{animationDuration: '3s'}}/>
        <Network className="absolute bottom-1/4 right-1/4 w-40 h-40 text-secondary/10 animate-pulse opacity-20" style={{animationDuration: '4s'}}/>
      </motion.div>
      
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md sm:max-w-lg"
      >
        <Card className="cyberpunk-rp-card shadow-2xl shadow-primary/30 border-2 border-primary/60 login-card-glow">
          <CardHeader className="text-center border-b-2 border-primary/50 pb-6 pt-8">
            <motion.div
              initial={{ scale: 0, rotate: 180, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150, damping: 10 }}
              className="mx-auto mb-6 w-20 h-20 sm:w-24 sm:h-24 bg-card/70 border-2 border-primary rounded-full flex items-center justify-center shadow-xl shadow-primary/30"
            >
              <ShieldCheck className="w-10 h-10 sm:w-12 sm:h-12 text-primary animate-pulse" style={{animationDuration: '1.3s'}}/>
            </motion.div>
            <CardTitle className="text-3xl sm:text-4xl font-black uppercase text-neon-primary-strong tracking-wider gta-rp-text-stroke">System Authentication</CardTitle>
            <CardDescription className="text-muted-foreground/80 tracking-widest mt-1.5 text-sm sm:text-base">
              [ SECURE_CHANNEL_ACCESS ] // OPERATOR_VERIFICATION
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 pb-8 px-6 sm:px-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div 
                className="space-y-2"
                variants={inputGroupVariants}
                whileHover="hover"
                whileFocus="focus"
              >
                <Label htmlFor="password" className="text-secondary text-sm uppercase tracking-widest font-semibold">Encryption Key:</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="cyberpunk-rp-input pr-12 text-base sm:text-lg py-3"
                    placeholder="ENTER_PASSCODE_SEQUENCE"
                    required
                    aria-invalid={!!error}
                    aria-describedby={error ? "password-error" : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-secondary transition-colors p-1.5 focus:outline-none focus:ring-2 focus:ring-ring rounded-md"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {error && (
                  <motion.p 
                    id="password-error"
                    initial={{opacity: 0, y: -10, height: 0}}
                    animate={{opacity: 1, y: 0, height: 'auto'}}
                    exit={{opacity: 0, y: -10, height: 0}}
                    className="text-destructive text-sm flex items-center gap-2 pt-1.5 font-semibold tracking-wide"
                  >
                    <AlertTriangle className="w-4 h-4"/> {error}
                  </motion.p>
                )}
              </motion.div>
              <Button
                type="submit"
                className="w-full cyberpunk-rp-button py-3.5 text-base sm:text-lg"
                disabled={isLoading}
                aria-label="Initiate Connection"
              >
                {isLoading ? (
                  <motion.div 
                    className="flex items-center justify-center gap-2"
                    initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                    />
                    <span className="tracking-wider">VALIDATING...</span>
                  </motion.div>
                ) : (
                  <motion.span 
                    className="flex items-center justify-center"
                    initial={{opacity:0, y:5}} animate={{opacity:1, y:0}} transition={{delay:0.1}}
                  >
                    <Terminal className="w-5 h-5 mr-2.5" />
                    AUTHORIZE & CONNECT
                  </motion.span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <motion.p 
          initial={{opacity:0, y:20}}
          animate={{opacity:1, y:0}}
          transition={{delay:0.5, duration:0.5}}
          className="text-center mt-8 text-xs text-muted-foreground/70 tracking-widest uppercase px-4"
        >
          Unauthorized access is a violation of District Charter 7.3. All activities are logged and monitored by Cerberus Protocol.
        </motion.p>
      </motion.div>
    </div>
  );
}
