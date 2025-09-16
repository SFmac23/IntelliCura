import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { PhaseOneFeatures } from '@/entities/phaseonefeatures';
import { PhaseTwoFeatures } from '@/entities/phasetwofeatures';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import { 
  Clock, 
  Smartphone, 
  UserCheck, 
  Bell, 
  BarChart3, 
  TrendingUp,
  Brain,
  Users,
  AlertTriangle,
  Navigation,
  Calendar
} from 'lucide-react';

const iconMap = {
  'real-time-wait-times': Clock,
  'digital-check-in': Smartphone,
  'pre-registration': UserCheck,
  'patient-notifications': Bell,
  'hospital-dashboard': BarChart3,
  'analytics-insights': TrendingUp,
  'ai-symptom-triage': Brain,
  'dynamic-queue': Users,
  'emergency-alerts': AlertTriangle,
  'smart-redirects': Navigation,
  'predictive-staffing': Calendar
};

export default function HomePage() {
  const [phaseOneFeatures, setPhaseOneFeatures] = useState<PhaseOneFeatures[]>([]);
  const [phaseTwoFeatures, setPhaseTwoFeatures] = useState<PhaseTwoFeatures[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const [phaseOneData, phaseTwoData] = await Promise.all([
          BaseCrudService.getAll<PhaseOneFeatures>('phaseonefeatures'),
          BaseCrudService.getAll<PhaseTwoFeatures>('phasetwofeatures')
        ]);
        
        setPhaseOneFeatures(phaseOneData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
        setPhaseTwoFeatures(phaseTwoData.items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)));
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const getIconComponent = (featureName: string) => {
    const iconKey = featureName?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z-]/g, '') as keyof typeof iconMap;
    const IconComponent = iconMap[iconKey] || Clock;
    return IconComponent;
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradientstart to-gradientend">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-[120rem] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-heading font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              Venicura
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-primary hover:text-secondary transition-colors font-paragraph"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('phase-one')}
                className="text-primary hover:text-secondary transition-colors font-paragraph"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('phase-two')}
                className="text-primary hover:text-secondary transition-colors font-paragraph"
              >
                Future
              </button>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            {Array.from({ length: 50 }, (_, i) => (
              <motion.line
                key={i}
                x1={i * 24}
                y1="0"
                x2={i * 24}
                y2="800"
                stroke="currentColor"
                strokeWidth="1"
                className="text-graphline"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: i * 0.05 }}
              />
            ))}
          </svg>
        </div>

        <div className="max-w-[120rem] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="text-6xl lg:text-7xl font-heading font-bold text-primary leading-tight">
              Healthcare,
              <br />
              <span className="text-secondary">on your time.</span>
            </h1>
            
            <p className="text-xl text-primary/80 font-paragraph max-w-2xl leading-relaxed">
              Venicura makes healthcare faster, smarter, and easier for patients and hospitals. 
              Track wait times, check-in digitally, and get personalized care — all from one platform.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8 py-6 font-paragraph"
              >
                Experience the Future
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-primary/5 rounded-3xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-heading font-semibold text-primary mb-4">
                Transforming Patient Experience
              </h3>
              <p className="text-primary/70 font-paragraph leading-relaxed">
                Join thousands of patients and healthcare providers who are already experiencing 
                the future of healthcare management. Real-time updates, seamless digital workflows, 
                and intelligent care coordination.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Phase One Features */}
      <section id="phase-one" className="py-24 bg-background/50">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading font-bold text-primary mb-6">
              Phase One: <span className="text-secondary">Initials</span>
            </h2>
            <p className="text-xl text-primary/70 font-paragraph max-w-3xl mx-auto">
              Essential features that revolutionize the healthcare experience from day one
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="h-64 bg-primary/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {phaseOneFeatures.map((feature, index) => {
                const IconComponent = getIconComponent(feature.featureName || '');
                return (
                  <motion.div
                    key={feature._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className="h-full bg-background/80 backdrop-blur-sm border-primary/10 hover:border-secondary/30 transition-all duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          {feature.featureIcon ? (
                            <Image 
                              src={feature.featureIcon} 
                              alt={feature.featureName || 'Feature icon'}
                              width={48}
                              className="w-12 h-12 object-contain"
                            />
                          ) : (
                            <IconComponent className="w-12 h-12 text-secondary" />
                          )}
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                          {feature.featureName}
                        </h3>
                        <p className="text-primary/70 font-paragraph leading-relaxed">
                          {feature.featureDescription}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Phase Two Features */}
      <section id="phase-two" className="py-24 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-[120rem] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-heading font-bold text-primary mb-6">
              Phase Two: <span className="text-secondary">Beyond</span>
            </h2>
            <p className="text-xl text-primary/70 font-paragraph max-w-3xl mx-auto">
              Advanced AI-powered features that push the boundaries of healthcare innovation
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="h-64 bg-primary/5 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {phaseTwoFeatures.map((feature, index) => {
                const IconComponent = getIconComponent(feature.featureName || '');
                return (
                  <motion.div
                    key={feature._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <Card className={`h-full backdrop-blur-sm border-primary/10 hover:border-secondary/30 transition-all duration-300 ${
                      feature.isAvailable ? 'bg-secondary/10' : 'bg-background/80'
                    }`}>
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center">
                            {feature.featureIcon ? (
                              <Image 
                                src={feature.featureIcon} 
                                alt={feature.featureName || 'Feature icon'}
                                width={48}
                                className="w-12 h-12 object-contain"
                              />
                            ) : (
                              <IconComponent className="w-12 h-12 text-secondary" />
                            )}
                          </div>
                          {feature.isAvailable && (
                            <span className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-paragraph">
                              Available
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                          {feature.featureName}
                        </h3>
                        <p className="text-primary/70 font-paragraph leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-secondary/20 to-graphline/20">
        <div className="max-w-[120rem] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary">
              Ready to Transform Healthcare?
            </h2>
            <p className="text-xl text-primary/70 font-paragraph max-w-2xl mx-auto">
              Join the revolution in patient care and hospital efficiency. 
              Experience the future of healthcare management today.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-12 py-6 font-paragraph"
              >
                Get Early Access
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-16">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-heading font-bold">Venicura</h3>
              <p className="text-primary-foreground/70 font-paragraph">
                Healthcare, on your time.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold">Product</h4>
              <ul className="space-y-2 font-paragraph">
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Features</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold">Company</h4>
              <ul className="space-y-2 font-paragraph">
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">About</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-lg font-heading font-semibold">Support</h4>
              <ul className="space-y-2 font-paragraph">
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="text-primary-foreground/70 font-paragraph">
              © 2024 Venicura. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Under Construction Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-heading font-bold text-primary">
              Under Construction
            </DialogTitle>
          </DialogHeader>
          <motion.div 
            className="text-center py-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-6 border-4 border-secondary border-t-transparent rounded-full"
            />
            <p className="text-primary/70 font-paragraph mb-6">
              We're working hard to bring you the future of healthcare. 
              Stay tuned for updates!
            </p>
            <Button 
              onClick={() => setIsModalOpen(false)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-paragraph"
            >
              Close
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
