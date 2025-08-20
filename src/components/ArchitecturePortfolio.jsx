import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Briefcase, User, Mail, Calendar, MapPin, Users, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Code2, Palette } from 'lucide-react';
import Aurora from './Aurora';

const NeonLoadingScreen = ({ onLoadingComplete, duration = 5000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const loadingMessages = [
    'INITIALIZING SECURE COMMUNICATION...',
    'RENDERING CODE...',
    'ACCESSING NEURAL NETWORK...',
    'DOWNLOADING MORE RAM...XD',
    'CALIBRATING FLUX CAPACITOR...',
    'SYNCING WITH SATELLITES...',
    'UNLEASHING THE ALGORITHMS...',
    'BOOTING UP THE FUTURE...',
    'CONNECTING TO THE GRID...',
    'CHARGING PHOTON TORPEDOES...',
    'ACTIVATING QUANTUM PROCESSORS...',
    'LOADING DIGITAL DREAMS...',
    'ESTABLISHING SECURE CONNECTION...',
    'WARMING UP THE SERVERS...',
    'PREPARING FOR LAUNCH...',
    'WELCOME TO THE STARLINK SYSTEMS'
  ];

  // Typing animation effect
useEffect(() => {
  let timeout;
  const currentMessage = loadingMessages[currentTextIndex];

  if (isTyping && displayText.length < currentMessage.length) {
    // keep typing
    timeout = setTimeout(() => {
      setDisplayText(currentMessage.slice(0, displayText.length + 1));
    }, 50 + Math.random() * 50);
  } else if (!isTyping && displayText.length === currentMessage.length) {
    // finished typing → wait before clearing
    timeout = setTimeout(() => {
      setIsTyping(true);
      setDisplayText('');
      setCurrentTextIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200); // wait a bit before next message
  } else if (displayText.length === currentMessage.length && isTyping) {
    // switch to "waiting" state once message is done
    setIsTyping(false);
  }

  return () => clearTimeout(timeout);
}, [displayText, currentTextIndex, isTyping]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Auto-complete after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onLoadingComplete && onLoadingComplete();
      }, 1000);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-all duration-1000 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Scanlines background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="scanlines"></div>
      </div>

      {/* Matrix-like falling characters background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 text-xs font-mono animate-fall"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Array.from({ length: 20 }, () => 
              String.fromCharCode(33 + Math.random() * 94)
            ).join('')}
          </div>
        ))}
      </div>

      {/* Main terminal container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Terminal header */}
        <div className="mb-8 text-center">
          <div className="inline-block border-2 border-green-400 rounded-lg p-6 bg-black/50 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse animation-delay-200"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse animation-delay-400"></div>
            </div>
            <div className="text-green-400 font-mono text-sm opacity-80">
              STARMAN SECURE COMS TERMINAL v2.4.7 - AUTHENTICATED
            </div>
          </div>
        </div>

        {/* Main terminal content */}
        <div className="bg-black border-2 border-green-400 rounded-lg p-8 shadow-2xl neon-glow">
          {/* Terminal prompt */}
          <div className="font-mono text-green-400 mb-6">
            <div className="text-sm opacity-80 mb-2">root@quantum:~$</div>
            <div className="h-0.5 bg-green-400 w-16 animate-pulse mb-4"></div>
          </div>

          {/* Loading animation area */}
          <div className="min-h-32 flex flex-col justify-center">
            {/* Progress bars */}
            <div className="mb-6">
              <div className="flex justify-between text-green-400 font-mono text-sm mb-2">
                <span>SYSTEM STATUS</span>
                <span>[OK]</span>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(40)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 w-1 bg-green-400 animate-pulse"
                    style={{
                      animationDelay: `${i * 50}ms`,
                      animationDuration: '1s'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Main loading text */}
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-mono text-green-400 neon-text tracking-wider min-h-16 flex items-center justify-center">
                <span className="animate-flicker">
                  {displayText}
                  <span 
                    className={`inline-block ml-1 transition-opacity duration-100 ${
                      showCursor ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    █
                  </span>
                </span>
              </div>
            </div>

            {/* Loading indicators */}
            <div className="mt-8 flex justify-center space-x-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-green-400 rounded-full animate-bounce neon-dot"
                  style={{
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>

            {/* System info */}
            <div className="mt-6 text-center">
              <div className="text-green-400 font-mono text-xs opacity-60">
                CPU: 98.7% | RAM: 15.2GB/16GB | NETWORK: SECURE
              </div>
            </div>
          </div>

          {/* Bottom status */}
          <div className="mt-8 flex justify-between text-green-400 font-mono text-xs opacity-40">
            <span>QUANTUM_OS v3.14.159</span>
            <span>{new Date().toISOString().slice(0, 19)}Z</span>
          </div>
        </div>

        {/* Warning message */}
        <div className="mt-6 text-center">
          <div className="inline-block text-green-400 font-mono text-xs opacity-60 border border-green-400 rounded px-3 py-1">
            ⚠ UNAUTHORIZED ACCESS DETECTED - SCANNING...
          </div>
        </div>
      </div>

      {/* CSS Styles */}
      <style jsx>{`
        .neon-glow {
          box-shadow: 
            0 0 20px rgba(74, 222, 128, 0.3),
            0 0 40px rgba(74, 222, 128, 0.2),
            0 0 60px rgba(74, 222, 128, 0.1),
            inset 0 0 20px rgba(74, 222, 128, 0.1);
        }

        .neon-text {
          text-shadow:
            0 0 10px #4ade80,
            0 0 20px #4ade80,
            0 0 30px #4ade80,
            0 0 40px #4ade80;
        }

        .neon-dot {
          box-shadow:
            0 0 10px #4ade80,
            0 0 20px #4ade80;
        }

        .scanlines {
          background: repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(74, 222, 128, 0.05) 2px,
            rgba(74, 222, 128, 0.05) 4px
          );
          animation: scanlines 2s linear infinite;
          height: 100%;
        }

        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes fall {
          0% { 
            transform: translateY(-100vh);
            opacity: 0;
          }
          10% { 
            opacity: 1;
          }
          90% { 
            opacity: 1;
          }
          100% { 
            transform: translateY(100vh);
            opacity: 0;
          }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
        }

        @keyframes bounce {
          0%, 80%, 100% { 
            transform: translateY(0);
            opacity: 0.7;
          }
          40% { 
            transform: translateY(-8px);
            opacity: 1;
          }
        }

        .animate-fall {
          animation: fall linear infinite;
        }

        .animate-flicker {
          animation: flicker 3s ease-in-out infinite;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

// TextType Component
const TextType = ({ 
  text = [], 
  typingSpeed = 100, 
  pauseDuration = 2000, 
  showCursor = true, 
  cursorCharacter = "|",
  color = "#fecaca"
}) => {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursorBlink, setShowCursorBlink] = useState(true);

  useEffect(() => {
    if (!text || text.length === 0) return;

    let timeout;
    const currentFullText = text[currentTextIndex];

    if (isTyping) {
      if (displayText.length < currentFullText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsTyping(false);
        timeout = setTimeout(() => {
          setIsTyping(true);
          setDisplayText("");
          setCurrentTextIndex((prev) => (prev + 1) % text.length);
        }, pauseDuration);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentTextIndex, isTyping, text, typingSpeed, pauseDuration]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursorBlink(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ color }}>
      {displayText}
      {showCursor && (
        <span style={{ opacity: showCursorBlink ? 1 : 0, transition: 'opacity 0.1s' }}>
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

// Animated Card Component
const AnimatedCard = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-10 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'projects', label: 'Projects', icon: Briefcase },
    { key: 'about', label: 'About', icon: User },
    { key: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <nav className={`fixed top-2 sm:top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out w-[calc(100%-2rem)] sm:w-auto max-w-[95vw] ${
      scrolled ? 'scale-95 sm:scale-90 md:scale-95' : 'scale-100'
    }`}>
      <div className="bg-black/50 backdrop-blur-2xl rounded-full px-3 sm:px-4 md:px-8 py-2 sm:py-3 md:py-4 flex items-center justify-between sm:space-x-2 md:space-x-8 shadow-2xl border border-amber-100/10 hover:bg-black/60 hover:shadow-3xl transition-all duration-500">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 md:space-x-3 group">
          <div className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-lime-600 to-lime-700 rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 group-hover:scale-110">
            <span className="text-black font-bold text-xs sm:text-sm md:text-base">P</span>
          </div>
          <span className="text-amber-100 text-base sm:text-lg md:text-2xl font-semibold transition-all duration-500 group-hover:tracking-wider hidden sm:block" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
            Portfolio
          </span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, index) => (
            <button 
              key={item.key}
              onClick={() => scrollToSection(item.key)}
              className="text-amber-100 hover:text-amber-50 transition-all duration-500 font-medium relative group px-3 py-2 rounded-full hover:bg-amber-100/10"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {item.label}
              <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-lime-500 to-lime-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Navigation - Icon based */}
        <div className="flex md:hidden items-center space-x-1">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={item.key}
                onClick={() => scrollToSection(item.key)}
                className="text-amber-100 hover:text-amber-50 transition-all duration-500 p-1.5 sm:p-2 rounded-full hover:bg-amber-100/20 group relative overflow-hidden"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <IconComponent size={16} className="sm:w-[18px] sm:h-[18px] transform group-hover:scale-110 transition-transform duration-300" />
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// Hero Showcase Component
const HeroShowcase = ({ projects, navigateToProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsTransitioning(false);
      }, 400);
    }, 5000);

    return () => clearInterval(interval);
  }, [projects.length, isHovered]);

  const currentProject = projects[currentIndex];

  return (
    <div 
      className="relative w-full max-w-3xl mx-auto px-4 sm:px-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
        {/* Left Image Bubble */}
        <div className="w-full lg:flex-1 relative h-48 sm:h-56 md:h-64 lg:h-80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-lime-400/30 backdrop-blur-md transition-all duration-700 hover:shadow-4xl hover:scale-[1.02] hover:border-lime-400/50 group">
          <div 
            className={`absolute inset-0 transition-all duration-1000 ${
              isTransitioning ? 'opacity-0 scale-110 blur-sm' : 'opacity-100 scale-100 blur-0'
            }`}
          >
            <img 
              src={currentProject.image} 
              alt={currentProject.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
            <span className="bg-gradient-to-r from-lime-500/30 to-lime-600/30 backdrop-blur-xl text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold tracking-wide border border-lime-400/40">
              {currentProject.category}
            </span>
          </div>

          {/* Progress indicators */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex space-x-1.5 sm:space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-lime-500 to-lime-600 w-4 sm:w-6 shadow-lg' 
                    : 'bg-lime-200/50 w-1 sm:w-1.5 hover:bg-lime-200/70'
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
            className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black/70 hover:scale-110"
          >
            <ChevronLeft size={14} className="sm:w-4 sm:h-4" />
          </button>
          
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % projects.length)}
            className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black/70 hover:scale-110"
          >
            <ChevronRight size={14} className="sm:w-4 sm:h-4" />
          </button>
        </div>

        {/* Right Detail Bubble */}
        <div className="w-full lg:w-80 bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl border border-lime-400/30 hover:border-lime-400/50 transition-all duration-700 hover:scale-105 group">
          <div className="mb-3 sm:mb-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-black text-amber-100 mb-1 sm:mb-2 leading-tight group-hover:text-amber-50 transition-colors duration-500">
              {currentProject.title}
            </h3>
            
            <p className="text-xs sm:text-sm text-amber-100/80 mb-2 sm:mb-3 opacity-90">
              {currentProject.subtitle} • {currentProject.location}
            </p>
            
            <p className="text-[11px] sm:text-xs text-amber-100/70 leading-relaxed mb-3 sm:mb-4">
              {currentProject.description.substring(0, 120)}...
            </p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4 text-xs">
            <div className="text-center p-1.5 sm:p-2 bg-black/20 rounded-lg">
              <div className="text-lime-400 font-bold text-[11px] sm:text-xs">{currentProject.year}</div>
              <div className="text-amber-100/60 text-[10px] sm:text-xs">Year</div>
            </div>
            <div className="text-center p-1.5 sm:p-2 bg-black/20 rounded-lg">
              <div className="text-lime-400 font-bold text-[11px] sm:text-xs">{currentProject.team}</div>
              <div className="text-amber-100/60 text-[10px] sm:text-xs">Team</div>
            </div>
          </div>

          {/* CTA Button */}
          <button 
            onClick={() => navigateToProject(currentProject)}
            className="w-full bg-gradient-to-r from-lime-600 to-lime-700 text-black px-3 sm:px-4 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm hover:from-lime-500 hover:to-lime-600 transition-all duration-500 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/btn"
          >
            <span>Explore Project</span>
            <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px] group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Project Info Card
const ProjectInfoCard = ({ selectedProject }) => {
  return (
    <AnimatedCard className="bg-gradient-to-br from-lime-600/90 to-lime-700/90 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 border border-lime-400/30 hover:border-lime-400/50 group">
      <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-black mb-6 sm:mb-8 group-hover:text-stone-900 transition-colors duration-500">
        PROJECT <span className="text-amber-100 group-hover:text-amber-50 transition-colors duration-500">INFO</span>
      </h3>
      <div className="space-y-4 sm:space-y-6">
        {[
          { label: 'Tech Stack', value: selectedProject.techInfo.techStack, icon: Code2 },
          { label: 'Tools Used', value: selectedProject.techInfo.tools, icon: Briefcase },
          { label: 'Project Type', value: selectedProject.category, icon: Palette },
          { label: 'Duration', value: selectedProject.techInfo.duration, icon: Calendar },
          { label: 'Team Size', value: selectedProject.team, icon: Users }
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.label}
              className="transform transition-all duration-500 hover:translate-x-3 hover:scale-105 p-2 sm:p-3 rounded-xl sm:rounded-2xl hover:bg-black/10 group/item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-2 sm:space-x-3 mb-1 sm:mb-2">
                <IconComponent size={14} className="sm:w-4 sm:h-4 text-black group-hover/item:text-amber-100 group-hover/item:rotate-12 transition-all duration-300" />
                <dt className="text-xs sm:text-sm font-bold text-black/80 uppercase tracking-wide group-hover/item:text-black transition-colors duration-300">{item.label}</dt>
              </div>
              <dd className="text-base sm:text-xl text-amber-100 font-medium group-hover/item:text-amber-50 transition-colors duration-300 ml-5 sm:ml-7">{item.value}</dd>
            </div>
          );
        })}
      </div>
    </AnimatedCard>
  );
};

// Main Component
const ArchitecturePortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particleCount, setParticleCount] = useState(30);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setParticleCount(window.innerWidth < 768 ? 15 : 30);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isLoading) {
    return (
      <NeonLoadingScreen 
        onLoadingComplete={() => setIsLoading(false)}
        duration={10000}
      />
    );
  }

  // Project data with image galleries
  const projects = [
    {
      id: 1,
      title: "BioInspired Canopy Design",
      subtitle: "Creation of form with Generative AI",
      year: "2022",
      location: "Bangalore, India",
      category: "Generative AI",
      team: "Solo Project",
      description:
        "The project focuses on how conventional design technique can be replaced with the use of machine learning algorithm. The particular Canopy is purely design by the machine with almost zero intervention of human, The sole purpose was to take a reference two dimensional image and then use machine learning algorithm to produce a three dimensional model, with varying capability of design.This voronoi fracture skeleton is created by mesh substraction using Grasshopper and Rhino and rendered on Cinema 4D. A stunning exploration of computational design that pushes the boundaries of traditional architectural visualization.",
      image: "/images/P0/1.1.jpg",
      gallery: [
        {
          image: "/images/P0/1.1.jpg",
          caption: "Initial Input Image",
          description: "The base reference image for the algorithm."
        },
        {
          image: "/images/P0/1.2.png",
          caption: "Main Grasshopper Algorithm + Combined with Python script",
          description: "This main Grasshopper Algorithm combines with the python script which uses Anaconda and openCV and generates variation of different design and finally the model is created in rhino."
        },
        {
          image: "/images/P0/1.3.jpg",
          caption: "Canopy 3D View",
          description: "3d View of the Canopy."
        },
        {
          image: "/images/P0/1.4.jpg",
          caption: "Inner Canopy View",
          description: "View from inside the canopy."
        },
        {
          image: "/images/P0/1.5.png",
          caption: "OpenCV and Anaconda + In Python code sample",
          description: "Contains the code that trained the entire variable canopy structure."
        },
        {
          image: "/images/P0/1.6.jpg",
          caption: "Canopy View",
          description: "Canopy render."
        },
        {
          image: "/images/P0/1.7.png",
          caption: "Different Infrared Spectrum Image sample",
          description: "These are the sample images that where trained on the model to generate the canopy design."
        },
        {
          image: "/images/P0/1.8.png",
          caption: "Final Output",
          description: `The design evolves on eight different stages: 
          STEP 1: The algorithm first takes the above image of six different types of nerves in human body and then runs a check on what images to combine it to, which will later be a basis of the three dimentional model it will generate. 
          STEP 2: Then it starts locating different points in three dimention space. 
          STEP 3: Further it starts interpreting the image and starts to form lines. 
          STEP 4: Lines combines in two dimentional space to form a surface. 
          STEP 5: Different surface points are then connected with each other to forms a solid mesh. 
          STEP 6: Then the algorithm figures out how to make variability in design. 
          STEP 7: Algorithm stores different types of permutation and combination occuring in design and just by a change of slider, gets projected on to the dashboard of the user. 
          STEP 8: Finally it runs a check for all the unconnected spaces and bad meshes it has and tries to eliminate it.`
        }
      ],
      techInfo: {
        techStack: "Python, Anaconda, OpenCV, GHPython",
        tools: "Grasshopper, Rhino, Cinema 4D",
        duration: "3 Weeks",
        features: "Parametric Design, Mesh Generation, 3D Rendering"
      },
      details: {
        area: "10 sq ft",
        floors: "none",
        sustainability:
          "In conclusion we achieved a design completely made by a machine and that could change shape and give a various choices of design as needed by the user. Further we were able to control the overall aspect of three dimensional shape of the model just by changing the input image we provided and this reduced significant amount of time from thinking to designing. We were also able to control various parameters of climatology like sun-shading and ventilation and were able to optimise the cost of the installation at same time. Hence we were able to analyse all the parameter and make a canopy that was stable enough and is well versed in all aspect completely made by a machine thinking and building itself.",
        concept:
          "Replacing conventional truss frame structure inside a cube, with a structure that is more close to nature and inspired by the curves of nature.",
        materials: "Carbon Fiber"
      }
    },
    {
      id: 2,
      title: "Voronoi Fracture",
      subtitle: "Digital Art",
      year: "2022",
      location: "Bangalore, India",
      category: "Computational Design",
      team: "Solo Project",
      description: "This voronoi fracture skeleton is created by mesh substraction using Grasshopper and Rhino and rendered on Cinema 4D. A stunning exploration of computational design that pushes the boundaries of traditional architectural visualization.",
      image: "/images/P1/2.1.png",
      gallery: [
        {
          image: "/images/P1/2.1.png",
          caption: "Front Elevation",
          description: "3D Render of the generated voronoi pattern."
        },
        {
          image: "images/P1/2.1.png",
          caption: "Zoomed in Texture view",
          description: "Zoomed in Texture view showing the lusturous and vivid color dynamics used."
        },
        {
          image: "images/P1/2.1.png",
          caption: "Zoomed in Texture view",
          description: "Zoomed in Texture view showing the lusturous and vivid color dynamics used."
        }
      ],
      techInfo: {
        techStack: "NIL",
        tools: "Grasshopper, Rhino, Cinema 4D",
        duration: "3 Weeks",
        features: "Parametric Design, Mesh Generation, 3D Rendering"
      },
      details: {
        area: "10 sq ft",
        floors: "none",
        sustainability: "Exploring alternative means of using biomimicry inspired structure.",
        concept: "Replacing conventional truss frame structure inside a cube, with a structure that is more close to nature and inspired by the curves of nature.",
        materials: "Metal"
      }
    },
    {
      id: 3,
      title: "Revit Vendor Design Automation",
      subtitle: "Revit Automation, Vendor Drawing",
      year: "2023",
      location: "NIL",
      category: "Revit Automation",
      team: "Software Engineers + Architects + Fabrication Line Experts",
      description:
        "This project uses Revit API and APS to create manually creation of Vendor drawing that usually takes days to months in project to merely a few clicks in seconds.",
      image: "/images/P2/3.1.png",
      videoUrl: "https://drive.google.com/file/d/1JYiKyPmHCKw3DKkE9gdLhQ1WB32tNDGn/preview", 
      gallery: [
        {
          image: "/images/P2/3.1.png",
          caption: "Intorduction",
          description: "The base reference model for the algorithm."
        },
        {
          image: "/images/P2/3.2.jpg",
          caption: "Wireframe view of the Model",
          description: "Showcases the complexity of the model and the elements within that would be crutial for the fabrication and hence each precision counts."
        },
        {
          image: "/images/P2/3.3.jpg",
          caption: "3D View",
          description: "3d View of the Elemnent."
        },
      ],
      techInfo: {
        techStack: "C#, Powershell, APS, HTML, CSS, Javascript, MERN Stack",
        tools: "Revit, APS/ BIM360 File Library",
        duration: "3 months",
        features: "Automation, Revit, Vendor Drawing, Fabrication"
      },
      details: {
        area: "100000 sq ft",
        floors: "5",
        sustainability:
          "Automation doesnt just saves time and business cost but also drastically reduces insite cost for the production team waiting for the fabrication drawing and since once developed the Automation could run from within the revit or on cloud its a huge stepup for the enviroment as less resources and less time is consumed, without comprimising the quality required.",
        concept:
          "Revit, specially the repititive vendor drawings are cruitial insite work that leads and impact directly to the level of how a building is created, by minimizing the repitive and mundane task, we give more time for creative profession to enhance there design and do last minute changes on the go.",
        materials: "Fabrication tool"
      }
    },
    {
      id: 4,
      title: "BIM 360 File & Folder Alerts with Webhooks.",
      subtitle: "Data Management in APS/BIM 360",
      year: "2023",
      location: "NIL",
      category: "Revit/APS Automation",
      team: "Software Engineer + Architects",
      description:
        "This project focuses on how webhooks are used as a way to trigger notification about a certain event as an when it happens, this helps in know how of the project changes in real-time without the need to physically watch and wait, useful for really large and complex project with multiple stackholders involved.",
      image: "/images/P3/4.3.png",
      gallery: [
        {
          image: "/images/P3/4.3.png",
          caption: "Initial Input Image",
          description: "Shows a sample UI of how a Data Managment platform would look like where user can then go ahead and chose to notify themselves with SMS, or email and these would be notified to user directly for any related changes whereever that webhook would be."
        },
        {
          image: "/images/P3/4.1.png",
          caption: "File Addition event trigger.",
          description: "Shows a File addition event been triggered when a file was uploaded by a user by a webhook listening for file change."
        },
        {
          image: "/images/P3/4.2.png",
          caption: "Actively Deployed website on Azure + Capability of creating new hooks",
          description: "UI Representation of new web hooks deployed in production for wider user to be used."
        },
      ],
      techInfo: {
        techStack: "C#, ASP .NET Core Web API, APS API, BIM 360 API, Webhook API, NGROK, HTML, CSS, JAVASCRIPT, NodeJS, Azure",
        tools: "APS/BIM 360, Revit sample files",
        duration: "2 Weeks",
        features: "Data Management, Event based trigger"
      },
      details: {
        area: "NIL",
        floors: "none",
        sustainability:
          "We forget that there are people who still track there download or a file change by opening and constantly monitoring there laptops with manual efforts for hours on end, the technological solution to this is use of Webhook, its a simple solution that differs from traditional web communication for APIs like REST or websockets where a handshake is needed everytime, webhook in short helps in triggering only when its needed and passes on the relevant information saving time and resources.",
        concept:
          "Data Management on larger project is a complex task and webhook inside APS and BIM 360 file platforms offer not only a comprehensive but resonable option for the Technology team.",
        materials: "NIL"
      }
    },
    {
      id: 5,
      title: "PowerBI Dashboard + APS Model View Integration",
      subtitle: "View and select different elements in Viewer and PowerBI",
      year: "2024",
      location: "NIL",
      category: "PowerBI, APS, Revit Automation",
      team: "Software Engineer + Architect",
      description:
        "This project showcases the use of powerBI and integration of it with a APS/BIM360 file upload platform where the user can view the revit files as well as select and specifically go down to the last bit of the information on the fly.",
      image: "/images/P4/5.2.png",
      gallery: [
        {
          image: "/images/P4/5.2.png",
          caption: "Initial UI Home Page",
          description: "The base reference image for the powerBI website that was created."
        },
      ],
      techInfo: {
        techStack: "C#, ASP .NET Core Web API, APS API, BIM 360 API, Webhook API, NGROK, HTML, CSS, JAVASCRIPT, NodeJS, Azure",
        tools: "Revit Files, BIM 360/APS, PowerBI",
        duration: "9 Weeks",
        features: "Data Visualization, On the Fly Model View + Component Visualization"
      },
      details: {
        area: "Depends on Model uploaded",
        floors: "none",
        sustainability:
          "The PowerBI + APS/BIM360 integration helps user to visualise the model on the web and also see the nesessary analytics on the component without the revit licence.",
        concept:
          "Data is the next oil and PowerBI Integration provides that with the capability of this on cloud.",
        materials: "Metal"
      }
    },
    {
      id: 6,
      title: "Comparitive Analysis Quantity Takeoff + Model Derivative + Data Exchange API - APS(Autodesk Platform Services)",
      subtitle: "Model Data Extraction Capability offered by Autodesk - Anslysis",
      year: "2025",
      location: "NIL",
      category: "APS + Data Extraction Capability",
      team: "Software Engineer",
      description:
        "This project focuses on what all are the different data extraction capability that are offered by the Autodesk and which all to be used and when",
      image: "/images/P5/6.0.png",
      gallery: [
        {
          image: "/images/P5/6.0.png",
          caption: "Showing Element Extraction Visually",
          description: "Diagram representation of model Data extraction in cloud."
        },
        {
          image: "/images/P5/6.1.png",
          caption: "Data Model API Landing Page",
          description: "Contains the landing page which will be used by used to do a 3-legged authentication."
        },
        {
          image: "/images/P5/6.2.png",
          caption: "Redirected Authentication screen from Autodesk",
          description: "Shows a redirected authentication screen."
        },
        {
          image: "/images/P5/6.3.png",
          caption: "Inner workings of the Data Model API showing hubs to the user for selection",
          description: "Hubs for user selection."
        },
        {
          image: "/images/P5/6.4.png",
          caption: "Quantity Takeoff Landing page",
          description: "Contains the landing page which will be used by used to do a 3-legged authentication."
        },
        {
          image: "/images/P5/6.5.png",
          caption: "Inner working of Quantity Takeoff",
          description: "Shows detail of element for quantity takeoff."
        },
      ],
      techInfo: {
        techStack: "MERN Stack, Azure",
        tools: "Revit, APS",
        duration: "2 Weeks",
        features: "Data Extraction"
      },
      details: {
        area: "NIL",
        floors: "none",
        sustainability:
          "1. Data Model API Purpose: Focuses on extracting specific elements from the model (not very detailed). ACC Compatibility: Yes, Multi-file Support: Yes. Response Time: Quick. Cost: Free. Special Feature: Extracts exactly the elements a user specifies. 2. Model Derivative API Purpose: Provides data for the entire model in detail, which can be customized but is inefficient for granular use. ACC Compatibility: No (requires individual Revit files to be uploaded). Multi-file Support: No. Response Time: Slower (depends on server processing). Cost: Token cost per transaction. Special Feature: Can extract all metadata, translate file formats, handle geometry extraction, and more. 3. Data Exchange API Purpose: Like Data Model API, it focuses on particular elements but not very detailed. ACC Compatibility: Yes (but requires a Data Exchange file to be created for a specific program). Multi-file Support: Yes. Response Time: Quick. Cost: Free. Special Feature: Extracts metadata and supports data exchange with external tools (e.g., Power BI, Rhino).",
        concept:
          "To Know more about the capabilities over by the different API offered by APS and which to use when.",
        materials: "Metal"
      }
    },
    {
      id: 7,
      title: "Desktop Application + Encryption based Defence project",
      subtitle: "Secure coms with touch based interface using SQL and C#",
      year: "2025",
      location: "NIL",
      category: "Database + Desktop Application",
      team: "Software Engineers",
      description:
        "This project uses touchscreen and desktop based approach to securely communicate between its own subnets and restricts anything or anyone trying to access it, we have used c# and sql for a simple yet powerful techonology solution for this.",
      image: "/images/P6/7.1.jpg",
      gallery: [
        {
          image: "/images/P6/7.1.jpg",
          caption: "Placeholder Image",
          description: "Just a placeholder image."
        },
      ],
      techInfo: {
        techStack: "C#, SQL",
        tools: "Desktop Application",
        duration: "10 Weeks",
        features: "Secure Communication, Subnets, Database Indexing"
      },
      details: {
        area: "NIL",
        floors: "none",
        sustainability:
          "NIL.",
        concept:
          "Creating a secure and reliable communication and managment platform for defence project that uses advance networking and database techniques to make it secure and scalable.",
        materials: "NIL"
      }
    }
  ];

  const navigateToProject = (project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (section) => {
    setIsMenuOpen(false);
    
    if (selectedProject) {
      setSelectedProject(null);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Project Detail Component
  const ProjectDetail = () => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);

    return (
      <div className="min-h-screen bg-black">
        <div className="relative h-screen">
          <div className="absolute inset-4 sm:inset-8 rounded-2xl sm:rounded-3xl overflow-hidden">
            <img 
              src={selectedProject.image} 
              alt={selectedProject.title}
              className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="text-center text-amber-100 animate-fadeIn">
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-9xl font-black mb-2 sm:mb-4 tracking-tight animate-slideUp">
                  {selectedProject.title}
                </h1>
                <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-light opacity-90 text-lime-400 animate-slideUp animation-delay-200">
                  {selectedProject.subtitle}
                </p>
              </div>
            </div>
          </div>
          
          <button 
            onClick={goBack}
            className="absolute top-8 sm:top-16 left-4 sm:left-16 flex items-center text-amber-100 hover:text-lime-400 transition-all duration-500 bg-black/50 px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl font-medium rounded-xl sm:rounded-2xl z-50 hover:scale-105 hover:bg-black/70 group text-sm sm:text-base"
          >
            <ChevronLeft size={16} className="sm:w-5 sm:h-5 mr-1 sm:mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Projects
          </button>
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-20">
          {/* Image Gallery Section */}
          <div className="mb-12 sm:mb-20">
            <AnimatedCard>
              <div className="bg-gradient-to-br from-black/90 to-stone-900/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-lime-400/30 hover:border-lime-400/50 transition-all duration-700">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-100 mb-6 sm:mb-10 text-center">
                  PROJECT <span className="text-lime-400">SHOWCASE</span>
                </h2>
                
                {/* Main Image Display */}
                <div className="relative mb-6 sm:mb-8 group">
                  <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black/50 border border-lime-400/20">
                    <img 
                      src={selectedProject.gallery[selectedImage].image}
                      alt={selectedProject.gallery[selectedImage].caption}
                      className="w-full h-full object-contain cursor-pointer transition-transform duration-500 hover:scale-105"
                      onClick={() => setIsImageModalOpen(true)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                    
                    {/* Expand icon */}
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-xl text-lime-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 3h6v6M14 10l6.1-6.1M9 21H3v-6M10 14l-6.1 6.1"/>
                      </svg>
                    </div>
                    
                    {/* Image Caption Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 sm:p-6">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-amber-100 mb-1">
                        {selectedProject.gallery[selectedImage].caption}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-100/80">
                        {selectedProject.gallery[selectedImage].description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Navigation Arrows for Main Display */}
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length)}
                    className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % selectedProject.gallery.length)}
                    className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/70 hover:scale-110"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                {/* Thumbnail Gallery */}
                <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {selectedProject.gallery.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-video rounded-lg sm:rounded-xl overflow-hidden cursor-pointer transition-all duration-300 group/thumb ${
                        selectedImage === index 
                          ? 'ring-2 ring-lime-400 scale-105' 
                          : 'hover:scale-105 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={item.image}
                        alt={item.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      
                      {/* View icon overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-xl rounded-full p-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-lime-400">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </div>
                      </div>
                      
                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 bg-gradient-to-t from-black/90 to-transparent">
                        <p className="text-[10px] sm:text-xs text-amber-100 font-medium truncate">
                          {item.caption}
                        </p>
                      </div>
                      
                      {/* Selected indicator */}
                      {selectedImage === index && (
                        <div className="absolute top-2 right-2 bg-lime-400 w-2 h-2 sm:w-3 sm:h-3 rounded-full animate-pulse"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Existing Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
            <div className="lg:col-span-2 space-y-8 sm:space-y-12">
              <AnimatedCard className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-amber-100 mb-4 sm:mb-6 md:mb-8 leading-tight">
                  PROJECT <span className="text-lime-400">OVERVIEW</span>
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-400 leading-relaxed mb-4 sm:mb-6 md:mb-8 font-light">
                  {selectedProject.description}
                </p>
                <p className="text-sm sm:text-base md:text-lg text-stone-400 leading-relaxed">
                  {selectedProject.details.concept}
                </p>
              </AnimatedCard>

              <AnimatedCard delay={200} className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-amber-100 mb-4 sm:mb-6 md:mb-8 leading-tight">
                  SUSTAINABILITY <span className="text-lime-400">APPROACH</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-stone-400 leading-relaxed">
                  {selectedProject.details.sustainability}
                </p>
              </AnimatedCard>

              <AnimatedCard delay={400} className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-amber-100 mb-4 sm:mb-6 md:mb-8 leading-tight">
                  MATERIALS & <span className="text-lime-400">CONSTRUCTION</span>
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-stone-400 leading-relaxed">
                  {selectedProject.details.materials}
                </p>
              </AnimatedCard>
            </div>

            <div className="space-y-8">
              <ProjectInfoCard selectedProject={selectedProject} />
            </div>
          </div>
        </div>

        {/* Fullscreen Image Modal */}
        {isImageModalOpen && (
          <div 
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100] flex items-center justify-center p-4"
            onClick={() => setIsImageModalOpen(false)}
          >
            <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsImageModalOpen(false);
                }}
                className="absolute top-4 right-4 bg-black/50 backdrop-blur-xl text-amber-100 p-3 rounded-full hover:bg-black/70 hover:scale-110 transition-all duration-300 z-10"
              >
                <X size={24} />
              </button>
              
              <img 
                src={selectedProject.gallery[selectedImage].image}
                alt={selectedProject.gallery[selectedImage].caption}
                className="max-w-full max-h-full object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Modal Navigation */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-3 rounded-full hover:bg-black/70 hover:scale-110 transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage((prev) => (prev + 1) % selectedProject.gallery.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-3 rounded-full hover:bg-black/70 hover:scale-110 transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
              
              {/* Modal Caption */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-xl p-4 rounded-xl">
                <h3 className="text-xl font-bold text-amber-100 mb-1">
                  {selectedProject.gallery[selectedImage].caption}
                </h3>
                <p className="text-sm text-amber-100/80">
                  {selectedProject.gallery[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-black overflow-x-hidden min-h-screen">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
      
      {selectedProject ? (
        <ProjectDetail />
      ) : (
        <div>
          {/* Landing Page */}
          <div id="home" className="min-h-screen bg-black relative overflow-hidden flex flex-col pt-16 sm:pt-20 md:pt-24">
            <Aurora
              colorStops={["#0006ad", "#7cff67", "#8b5cf6"]}
              blend={0.4}
              amplitude={1.0}
              speed={0.5}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(particleCount)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-amber-100/40 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${15 + Math.random() * 10}s`,
                    filter: 'blur(0.5px)'
                  }}
                />
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4 md:px-8 relative z-10">
              {/* Main Headline */}
              <div 
                className="text-center max-w-7xl mb-6 sm:mb-8"
                style={{
                  transform: !isMobile ? `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)` : 'none'
                }}
              >
                <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-100 mb-4 sm:mb-6 leading-tight tracking-tight animate-fadeIn px-2" 
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                  <span className="block mb-4 text-amber-100">
                    <TextType 
                      text={["Welcome, fellow explorer. To the Dark Side — or as I call it, the Architecture Side. Blended with flavours of technology. Happy Exploring (^ - ^)"]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      color="#fef3c7"
                    />
                  </span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12 z-10 w-full sm:w-auto px-4 sm:px-0">
                
                {/* Explore Projects button */}
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-lime-600 to-lime-700 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:from-lime-500 hover:to-lime-600 transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:rotate-1 shadow-2xl animate-slideUp transform hover:-translate-y-1 hover:shadow-lime-500/25 group w-full sm:w-auto"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="flex items-center justify-center space-x-2">
                    <span>Explore Projects</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px] group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <a 
                  href="https://drive.google.com/uc?export=download&id=1MoEbsxfONEISAQPuawpK9fsxP9sSjRH_" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-black/30 backdrop-blur-xl text-amber-100 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-medium border-2 border-amber-100/30 hover:bg-black/50 hover:border-amber-100/50 transition-all duration-500 hover:scale-105 sm:hover:scale-110 hover:-rotate-1 animate-slideUp animation-delay-100 transform hover:-translate-y-1 hover:shadow-2xl group w-full sm:w-auto flex items-center justify-center space-x-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <User className="sm:w-[18px] sm:h-[18px] group-hover:rotate-12 transition-transform duration-300" />
                  <span>Download Resume</span>
                </a>

              </div>

              {/* Architecture Showcase */}
              <div className="w-full px-2 sm:px-4 animate-fadeIn animation-delay-300">
                <div className="mb-6 sm:mb-8 text-center">
                  <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl text-amber-100/90 mb-3 sm:mb-4 font-semibold px-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore collection that is best of both worlds
                  </h3>
                  <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-amber-100/60">
                    <div className="flex items-center space-x-1 sm:space-x-2 group">
                      <Code2 size={14} className="sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Computational</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 group">
                      <Palette size={14} className="sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Creative</span>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 group">
                      <Sparkles size={14} className="sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Innovative</span>
                    </div>
                  </div>
                </div>
                <HeroShowcase projects={projects} navigateToProject={navigateToProject} />
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className="min-h-screen bg-black relative overflow-hidden flex flex-col py-12 sm:py-16 md:py-20">
            <Aurora
              colorStops={["#0F2027", "#2C5364", "#6EE7B7"]}
              blend={0.2}
              amplitude={0.6}
              speed={0.4}
            />
            
            <div className="flex-1 flex flex-col justify-center px-4 md:px-8 relative z-10">
              {/* Header */}
              <div className="mb-8 sm:mb-12 md:mb-16 text-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-48 sm:w-72 md:w-96 h-48 sm:h-72 md:h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-lime-400 mb-3 sm:mb-6 animate-slideUp relative z-10">
                  Projects
                </h2>
                <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-amber-100/80 max-w-4xl mx-auto leading-relaxed animate-slideUp animation-delay-200 relative z-10 px-4">
                  A curated collection showcasing the fusion of 
                  <span className="text-lime-400 font-semibold"> technological innovation</span> and 
                  <span className="text-amber-200 font-semibold"> architectural excellence</span>
                </p>
                
                {/* Decorative elements */}
                <div className="flex flex-wrap justify-center mt-4 sm:mt-6 md:mt-8 gap-3 sm:gap-6">
                  <div className="flex items-center space-x-1 sm:space-x-2 text-amber-100/60 animate-slideUp animation-delay-300 group">
                    <Code2 size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-xs sm:text-sm font-medium">Computational</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-amber-100/60 animate-slideUp animation-delay-400 group">
                    <Palette size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-xs sm:text-sm font-medium">Creative</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2 text-amber-100/60 animate-slideUp animation-delay-500 group">
                    <Sparkles size={16} className="sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-xs sm:text-sm font-medium">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Project Cards */}
              <div className="relative w-full overflow-hidden">
                <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 sm:pb-8 scrollbar-hide px-2 sm:px-4 snap-x snap-mandatory scroll-smooth">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      onClick={() => navigateToProject(project)}
                      className="group min-w-[260px] sm:min-w-[320px] w-[260px] sm:w-80 bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:shadow-3xl relative overflow-hidden rounded-2xl sm:rounded-3xl hover:scale-105 animate-slideUp border border-lime-400/30 hover:border-lime-400/60 flex-shrink-0 snap-start"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-100/0 via-transparent to-lime-400/0 group-hover:from-lime-100/3 group-hover:to-lime-400/5 transition-all duration-300 pointer-events-none"></div>
                      
                      <div className="relative h-36 sm:h-48 overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 opacity-90 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                          <span className="bg-black/70 backdrop-blur-xl text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-all duration-300 border border-lime-400/30 group-hover:bg-lime-500/80">
                            {project.category}
                          </span>
                        </div>
                        
                        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                          <span className="bg-lime-500/70 backdrop-blur-xl text-black px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 group-hover:opacity-100 opacity-0">
                            {project.year}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 sm:p-6 relative">
                        <h3 className="text-base sm:text-xl font-bold text-amber-100 mb-2 sm:mb-3 transition-colors duration-200 group-hover:text-amber-50">
                          {project.title}
                        </h3>
                        <p className="text-stone-300 mb-3 sm:mb-4 opacity-90 text-xs sm:text-sm font-medium transition-colors duration-200 group-hover:text-stone-200">
                          {project.subtitle}
                        </p>
                        
                        <div className="text-[10px] sm:text-xs text-stone-300/80 mb-3 sm:mb-4">
                          <div className="flex items-center transition-transform duration-200 group-hover:translate-x-1">
                            <MapPin size={10} className="sm:w-3 sm:h-3 mr-1.5 sm:mr-2 text-lime-400" />
                            <span>{project.location}</span>
                          </div>
                        </div>
                        
                        <p className="text-stone-300/90 leading-relaxed text-[11px] sm:text-xs mb-4 sm:mb-6 transition-colors duration-200 group-hover:text-stone-200">
                          {project.description.substring(0, 100)}...
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-amber-100 text-xs sm:text-sm font-bold transition-colors duration-200 group-hover:text-amber-50">
                            VIEW PROJECT
                            <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-1.5 sm:ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                          </div>
                          
                          <div className="flex items-center space-x-1 transition-all duration-200 opacity-0 group-hover:opacity-100">
                            <Users size={10} className="sm:w-3 sm:h-3 text-lime-400" />
                            <span className="text-[10px] sm:text-xs text-stone-300">{project.team}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-lime-100/0 via-lime-500 to-lime-100/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll indicator */}
              <div className="text-center mt-6 sm:mt-12 px-4">
                <div className="inline-flex items-center bg-gradient-to-r from-transparent via-amber-100/10 to-transparent backdrop-blur-xl px-4 sm:px-8 py-2 sm:py-4 rounded-full border border-amber-100/20 shadow-2xl animate-pulse hover:bg-amber-100/5 transition-all duration-500 group">
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 mr-2 sm:mr-3 text-lime-400 group-hover:translate-x-1 transition-transform duration-300 rotate-180" />
                  <div className="text-amber-100/80 text-[10px] sm:text-sm font-medium tracking-wide uppercase">Scroll to view more</div>
                  <ArrowRight size={14} className="sm:w-4 sm:h-4 ml-2 sm:ml-3 text-lime-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* About & Contact Section */}
          <div id="about" className="min-h-screen bg-black relative overflow-hidden flex flex-col">
            <Aurora
              colorStops={["#120136", "#B91372", "#FF6F61"]}
              blend={0.4}
              amplitude={0.7}
              speed={0.2}
            />
            
            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 border-2 border-amber-100/20 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-20 right-20 w-24 sm:w-40 h-24 sm:h-40 border-2 border-lime-400/20 rounded-lg animate-spin-reverse-slow"></div>
              <div className="absolute top-1/2 left-1/3 w-16 sm:w-24 h-16 sm:h-24 border-2 border-lime-400/20 rotate-45 animate-float"></div>
              <div className="absolute top-1/4 right-1/4 w-12 sm:w-16 h-12 sm:h-16 border border-lime-300/30 rounded-full animate-pulse"></div>
            </div>

            {/* About Section */}
            <div className="flex-grow flex flex-col justify-center px-4 md:px-8 relative z-10 py-12 sm:py-16 md:py-20">
              <div className="max-w-6xl mx-auto w-full relative">
                <AnimatedCard>
                  <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-lime-400 to-amber-100 mb-4 sm:mb-6 md:mb-8 animate-gradient">
                      ABOUT ME
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-amber-100/90 max-w-4xl mx-auto leading-relaxed px-4">
                      Pioneering the intersection of 
                      <span className="text-lime-400 font-semibold"> computational design</span> and 
                      <span className="text-amber-200 font-semibold"> architectural innovation</span>
                    </p>
                  </div>
                </AnimatedCard>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 md:mt-16 px-2 sm:px-0">
                  <AnimatedCard delay={100} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-105 md:hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-4 sm:mb-6 text-lime-400 relative z-10">
                        <Sparkles size={28} className="sm:w-9 sm:h-9 group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-3 sm:mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">INNOVATION</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10 text-sm sm:text-base">
                        Pushing boundaries with cutting-edge design technologies and methodologies
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={200} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-105 md:hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-4 sm:mb-6 text-lime-400 relative z-10">
                        <Code2 size={28} className="sm:w-9 sm:h-9 group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-3 sm:mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">TECHNOLOGY</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10 text-sm sm:text-base">
                        Integrating parametric design and automation in architectural practice
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={300} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-105 md:hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-4 sm:mb-6 text-lime-400 relative z-10">
                        <Palette size={28} className="sm:w-9 sm:h-9 group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-3 sm:mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">ARTISTRY</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10 text-sm sm:text-base">
                        Creating spaces that inspire through aesthetic excellence and functionality
                      </p>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="bg-amber-50 px-4 md:px-8 py-12 sm:py-16 relative z-10">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 items-center">
                  {/* Newsletter Section */}
                  <div className="lg:col-span-2">
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-black mb-4 sm:mb-6 leading-tight font-bold animate-slideUp">
                      Keep in the loop with Me.
                    </h2>
                    
                    <div className="relative group mb-3 sm:mb-4">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent border-b-2 border-black/60 py-2 sm:py-3 text-sm sm:text-base text-black placeholder-stone-600 focus:outline-none focus:border-lime-600 transition-all duration-500 focus:placeholder-stone-400 hover:border-black"
                      />
                      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black hover:text-lime-600 transition-all duration-500 hover:translate-x-1 hover:scale-110 p-1.5 sm:p-2 rounded-full hover:bg-lime-100">
                        <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                    
                    <p className="text-xs sm:text-sm text-stone-600 opacity-80">
                      Get updates on latest projects and architectural insights
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="lg:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
                    <div className="group bg-black/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-stone-700 text-center shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 sm:hover:scale-110 animate-slideUp animation-delay-100 hover:border-lime-500">
                      <Mail size={20} className="sm:w-6 sm:h-6 mx-auto mb-2 sm:mb-3 text-lime-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                      <h3 className="text-[10px] sm:text-sm text-amber-100 mb-1 sm:mb-2 font-bold group-hover:text-lime-100 transition-colors duration-300">EMAIL</h3>
                      <p className="text-stone-300 text-[10px] sm:text-xs group-hover:text-stone-200 transition-colors duration-300 break-all">mdk.ug18.ar@nitp.ac.in</p>
                    </div>
                    <div className="group bg-black/90 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border-2 border-stone-700 text-center shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 sm:hover:scale-110 animate-slideUp animation-delay-200 hover:border-lime-500">
                      <Home size={20} className="sm:w-6 sm:h-6 mx-auto mb-2 sm:mb-3 text-lime-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                      <h3 className="text-[10px] sm:text-sm text-amber-100 mb-1 sm:mb-2 font-bold group-hover:text-lime-100 transition-colors duration-300">LOCATION</h3>
                      <p className="text-stone-300 text-[10px] sm:text-xs group-hover:text-stone-200 transition-colors duration-300">Bangalore, India</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-stone-400/40">
                  <p className="text-stone-700 text-[10px] sm:text-sm animate-fadeIn mb-3 sm:mb-4 md:mb-0 text-center md:text-left">
                    ©2025 Designed and Developed by Saqlain Khan – All rights reserved.
                  </p>
                  <div className="flex items-center space-x-4 sm:space-x-8 animate-fadeIn animation-delay-200">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-lime-600 to-lime-700 rounded-full hover:rotate-180 hover:scale-110 transition-all duration-700 cursor-pointer shadow-lg hover:shadow-lime-500/50"></div>
                    <div className="flex space-x-3 sm:space-x-6 text-[10px] sm:text-sm">
                      <a href="https://www.linkedin.com/in/mdsaqlainkhan" className="text-stone-700 hover:text-lime-600 transition-all duration-500 hover:scale-110 font-medium hover:underline">LinkedIn</a>
                      <a href="https://github.com/starman011" className="text-stone-700 hover:text-lime-600 transition-all duration-500 hover:scale-110 font-medium hover:underline">GitHub</a>
                      <a href="#" className="text-stone-700 hover:text-lime-600 transition-all duration-500 hover:scale-110 font-medium hover:underline">Privacy</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes aurora {
          0% { transform: scale(1.2) rotate(0deg); }
          100% { transform: scale(1.4) rotate(180deg); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 25s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .shadow-4xl {
          box-shadow: 0 45px 80px -15px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 640px) {
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        }
      `}</style>
    </div>
  );
};

export default ArchitecturePortfolio;