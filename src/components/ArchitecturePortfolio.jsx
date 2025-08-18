import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Briefcase, User, Mail, Calendar, MapPin, Users, ArrowRight, ChevronLeft, Sparkles, Code2, Palette } from 'lucide-react';
import Aurora from './Aurora';

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
    <nav className={`fixed top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
      scrolled ? 'scale-90 md:scale-95' : 'scale-100'
    }`}>
              <div className="bg-black/50 backdrop-blur-2xl rounded-full px-4 md:px-8 py-3 md:py-4 flex items-center space-x-2 md:space-x-8 shadow-2xl border border-amber-100/10 hover:bg-black/60 hover:shadow-3xl transition-all duration-500">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-2 md:space-x-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-lime-600 to-lime-700 rounded-full flex items-center justify-center transform group-hover:rotate-180 transition-transform duration-700 group-hover:scale-110">
            <span className="text-black font-bold text-sm md:text-base">P</span>
          </div>
          <span className="text-amber-100 text-lg md:text-2xl font-semibold transition-all duration-500 group-hover:tracking-wider hidden sm:block" 
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
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500/20 to-lime-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-0 group-hover:scale-100"></div>
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
                className="text-amber-100 hover:text-amber-50 transition-all duration-500 p-2 rounded-full hover:bg-amber-100/20 group relative overflow-hidden"
                style={{ 
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <IconComponent size={18} className="transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500/30 to-lime-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-0 group-hover:scale-100"></div>
              </button>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="sm:hidden text-amber-100 hover:text-amber-50 transition-all duration-500 p-2 rounded-full hover:bg-amber-100/20 group ml-2"
        >
          <div className="transition-transform duration-500 group-hover:scale-110">
            {isMenuOpen ? 
              <X size={20} className="transform group-hover:rotate-90 transition-transform duration-300" /> : 
              <Menu size={20} className="transform group-hover:rotate-180 transition-transform duration-300" />
            }
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`sm:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black/90 backdrop-blur-2xl border border-amber-100/20 rounded-3xl p-6 min-w-64 transition-all duration-500 ${
        isMenuOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-4">
          {navItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button 
                key={item.key}
                onClick={() => {
                  scrollToSection(item.key);
                  setIsMenuOpen(false);
                }}
                className="text-amber-100 hover:text-amber-50 transition-all duration-500 font-medium text-left py-3 px-4 hover:translate-x-2 rounded-2xl hover:bg-amber-100/10 flex items-center space-x-3 group"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  animation: isMenuOpen ? `slideInLeft 0.4s ease-out ${index * 0.1}s both` : ''
                }}
              >
                <IconComponent size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

// Hero Showcase Component
const HeroShowcase = ({ projects }) => {
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
      className="relative w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-6">
        {/* Left Image Bubble - Large Round Rectangle */}
        <div className="flex-1 relative h-64 md:h-80 rounded-3xl overflow-hidden shadow-2xl border border-lime-400/30 backdrop-blur-md transition-all duration-700 hover:shadow-4xl hover:scale-[1.02] hover:border-lime-400/50 group">
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
            <div className="absolute inset-0 bg-gradient-to-r from-lime-500/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="bg-gradient-to-r from-lime-500/30 to-lime-600/30 backdrop-blur-xl text-black px-3 py-1 rounded-full text-xs font-bold tracking-wide border border-lime-400/40 transition-all duration-500">
              {currentProject.category}
            </span>
          </div>

          {/* Progress indicators */}
          <div className="absolute top-4 right-4 flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-500 hover:scale-125 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-lime-500 to-lime-600 w-6 shadow-lg' 
                    : 'bg-lime-200/50 w-1.5 hover:bg-lime-200/70'
                }`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button 
            onClick={() => setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black/70 hover:scale-110"
          >
            <ChevronLeft size={16} />
          </button>
          
          <button 
            onClick={() => setCurrentIndex((prev) => (prev + 1) % projects.length)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-xl text-lime-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black/70 hover:scale-110"
          >
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Right Detail Bubble - Small Solid Color */}
        <div className="w-80 bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-lime-400/30 hover:border-lime-400/50 transition-all duration-700 hover:scale-105 group">
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl font-black text-amber-100 mb-2 leading-tight group-hover:text-amber-50 transition-colors duration-500">
              {currentProject.title}
            </h3>
            
            <p className="text-sm text-amber-100/80 mb-3 opacity-90">
              {currentProject.subtitle} • {currentProject.location}
            </p>
            
            <p className="text-xs text-amber-100/70 leading-relaxed mb-4">
              {currentProject.description.substring(0, 120)}...
            </p>
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div className="text-center p-2 bg-black/20 rounded-lg">
              <div className="text-lime-400 font-bold">{currentProject.year}</div>
              <div className="text-amber-100/60">Year</div>
            </div>
            <div className="text-center p-2 bg-black/20 rounded-lg">
              <div className="text-lime-400 font-bold">{currentProject.team}</div>
              <div className="text-amber-100/60">Team</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-lime-600 to-lime-700 text-black px-4 py-3 rounded-xl font-semibold text-sm hover:from-lime-500 hover:to-lime-600 transition-all duration-500 hover:scale-105 hover:shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 group/btn">
            <span>Explore Project</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Project Info Card
const ProjectInfoCard = ({ selectedProject }) => {
  return (
    <AnimatedCard className="bg-gradient-to-br from-purple-600/90 to-purple-700/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 border border-purple-400/30 hover:border-purple-400/50 group">
      <h3 className="text-2xl md:text-3xl font-black text-amber-100 mb-8 group-hover:text-lime-100 transition-colors duration-500">
        PROJECT <span className="text-black group-hover:text-lime-200 transition-colors duration-500">INFO</span>
      </h3>
      <div className="space-y-6">
        {[
          { label: 'Location', value: selectedProject.location, icon: MapPin },
          { label: 'Year', value: selectedProject.year, icon: Calendar },
          { label: 'Area', value: selectedProject.details.area, icon: Home },
          { label: 'Floors', value: selectedProject.details.floors, icon: Briefcase },
          { label: 'Team Size', value: selectedProject.team, icon: Users }
        ].map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={item.label}
              className="transform transition-all duration-500 hover:translate-x-3 hover:scale-105 p-3 rounded-2xl hover:bg-amber-100/10 group/item"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 mb-2">
                <IconComponent size={16} className="text-lime-300 group-hover/item:text-lime-400 group-hover/item:rotate-12 transition-all duration-300" />
                <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide group-hover/item:text-amber-100 transition-colors duration-300">{item.label}</dt>
              </div>
              <dd className="text-xl text-amber-100 font-medium group-hover/item:text-lime-100 transition-colors duration-300 ml-7">{item.value}</dd>
            </div>
          );
        })}
      </div>
    </AnimatedCard>
  );
};

const ArchitecturePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Project data
  const projects = [
    {
      id: 1,
      title: "Voronoi Fracture",
      subtitle: "Digital Art",
      year: "2022",
      location: "Bangalore, India",
      category: "Digital Art",
      team: "One man Army",
      description: "This voronoi fracture skeleton is created by mesh extrusion using Grasshopper and Rhino and rendered on Cinema 4D. A stunning exploration of computational design that pushes the boundaries of traditional architectural visualization.",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
      details: {
        area: "10 sq ft",
        floors: "none",
        sustainability: "Exploring alternative means of using biomimicry inspired structure.",
        concept: "Replacing conventional truss frame structure inside a cube, with a structure that is more close to nature and inspired by the curves of nature.",
        materials: "Metal"
      }
    },
    {
      id: 2,
      title: "MINIMAL HOUSE",
      subtitle: "Residential Villa",
      year: "2023",
      location: "Copenhagen, Denmark",
      category: "Residential",
      team: "6 Architects",
      description: "An award-winning residential villa that embodies the principles of minimalism while maximizing comfort and functionality. Clean lines and open spaces create a serene living environment that connects inhabitants with nature.",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      details: {
        area: "4,200 sq ft",
        floors: "2 floors",
        sustainability: "Net-zero energy consumption achieved through solar integration and passive house design principles.",
        concept: "Every element serves a purpose in this carefully curated space. The design eliminates unnecessary complexity while enhancing the connection between indoor and outdoor living.",
        materials: "Exposed concrete, natural oak flooring, and floor-to-ceiling glass create a seamless flow between interior and exterior spaces."
      }
    },
    {
      id: 3,
      title: "CULTURE HUB",
      subtitle: "Museum & Gallery",
      year: "2023",
      location: "Berlin, Germany",
      category: "Cultural",
      team: "18 Architects",
      description: "A groundbreaking cultural center that serves as a bridge between contemporary art and historical preservation. The building seamlessly integrates with the urban fabric while creating dynamic exhibition spaces.",
      image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
      details: {
        area: "85,000 sq ft",
        floors: "4 floors",
        sustainability: "Restored heritage building with modern sustainable systems, achieving 60% reduction in energy consumption.",
        concept: "The design celebrates the dialogue between old and new, creating flexible spaces that adapt to various artistic expressions while respecting the historical context.",
        materials: "Restored brick facades, contemporary steel and glass additions, and sustainable interior materials create a harmonious architectural narrative."
      }
    },
    {
      id: 4,
      title: "URBAN OASIS",
      subtitle: "Mixed-Use Development",
      year: "2022",
      location: "Singapore",
      category: "Mixed-Use",
      team: "24 Architects",
      description: "A visionary mixed-use development that transforms urban density into a vertical garden. The project integrates residential, commercial, and recreational spaces within a sustainable ecosystem.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
      details: {
        area: "200,000 sq ft",
        floors: "35 floors",
        sustainability: "First carbon-neutral mixed-use development in Southeast Asia, featuring integrated urban farming and rainwater harvesting systems.",
        concept: "Vertical urbanism redefined through biophilic design principles, creating a self-sustaining community that enhances urban biodiversity.",
        materials: "Living facade systems, recycled steel structure, and bio-based composite materials demonstrate the future of sustainable construction."
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
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ProjectDetail = () => (
    <div className="min-h-screen bg-black">
      <div className="relative h-screen">
        <div className="absolute inset-8 rounded-3xl overflow-hidden">
          <img 
            src={selectedProject.image} 
            alt={selectedProject.title}
            className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-amber-100 animate-fadeIn">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight animate-slideUp">
                {selectedProject.title}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light opacity-90 text-purple-400 animate-slideUp animation-delay-200">
                {selectedProject.subtitle}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={goBack}
          className="absolute top-16 left-16 flex items-center text-amber-100 hover:text-purple-400 transition-all duration-500 bg-black/50 px-6 py-3 backdrop-blur-xl font-medium rounded-2xl z-50 hover:scale-105 hover:bg-black/70 group"
        >
          <ChevronLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </button>
      </div>

      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <AnimatedCard className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
              <h2 className="text-4xl md:text-5xl font-black text-amber-100 mb-8 leading-tight">
                PROJECT <span className="text-purple-400">OVERVIEW</span>
              </h2>
              <p className="text-xl md:text-2xl text-stone-400 leading-relaxed mb-8 font-light">
                {selectedProject.description}
              </p>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.concept}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={200} className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
              <h3 className="text-3xl md:text-4xl font-black text-amber-100 mb-8 leading-tight">
                SUSTAINABILITY <span className="text-purple-400">APPROACH</span>
              </h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.sustainability}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={400} className="bg-gradient-to-br from-stone-900/90 to-stone-800/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-700 border border-stone-700/50 hover:border-stone-600/50">
              <h3 className="text-3xl md:text-4xl font-black text-amber-100 mb-8 leading-tight">
                MATERIALS & <span className="text-purple-400">CONSTRUCTION</span>
              </h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.materials}
              </p>
            </AnimatedCard>
          </div>

          <div className="space-y-8">
            <ProjectInfoCard selectedProject={selectedProject} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black overflow-x-hidden" style={{ height: '100vh', overflowY: 'scroll', scrollSnapType: 'y mandatory' }}>
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
      
      {selectedProject ? (
        <ProjectDetail />
      ) : (
        <div>
          {/* Landing Page */}
          <div id="home" className="h-screen bg-black relative overflow-hidden flex flex-col pt-24" style={{ scrollSnapAlign: 'start' }}>
            <Aurora
              colorStops={["#0006ad", "#7cff67", "#8b5cf6"]}
              blend={0.4}
              amplitude={1.0}
              speed={0.5}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-amber-100/40 rounded-full animate-float"
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
                className="text-center max-w-7xl mb-8"
                style={{
                  transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 20}px)`
                }}
              >
                <h1 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl text-amber-100 mb-6 leading-tight tracking-tight animate-fadeIn" 
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                  <span className="block mb-4 text-amber-100" style={{ height: 'auto', padding: '0' }}>
                    <TextType 
                      text={["Welcome, fellow explorer. To the Dark Side — or as I call it, the Architecture Side. Blended with a flavour of technology. Happy Exploring (^ - ^)"]}
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
              <div className="flex flex-col sm:flex-row gap-4 mb-12 z-10">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-gradient-to-r from-lime-600 to-lime-700 text-black px-8 py-4 rounded-full text-base font-semibold hover:from-lime-500 hover:to-lime-600 transition-all duration-500 hover:scale-110 hover:rotate-1 shadow-2xl animate-slideUp transform hover:-translate-y-1 hover:shadow-lime-500/25 group"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="flex items-center space-x-2">
                    <span>Explore Projects</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-black/30 backdrop-blur-xl text-amber-100 px-8 py-4 rounded-full text-base font-medium border-2 border-amber-100/30 hover:bg-black/50 hover:border-amber-100/50 transition-all duration-500 hover:scale-110 hover:-rotate-1 animate-slideUp animation-delay-100 transform hover:-translate-y-1 hover:shadow-2xl group"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <span className="flex items-center space-x-2">
                    <User size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    <span>Learn More</span>
                  </span>
                </button>
              </div>

              {/* Architecture Showcase */}
              <div className="w-full px-4 animate-fadeIn animation-delay-300">
                <div className="mb-8 text-center">
                  <h3 className="text-xl md:text-2xl lg:text-3xl text-amber-100/90 mb-4 font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore collection that is best of both worlds
                  </h3>
                  <div className="flex justify-center space-x-8 text-sm text-amber-100/60">
                    <div className="flex items-center space-x-2 group">
                      <Code2 size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Computational</span>
                    </div>
                    <div className="flex items-center space-x-2 group">
                      <Palette size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Creative</span>
                    </div>
                    <div className="flex items-center space-x-2 group">
                      <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                      <span>Innovative</span>
                    </div>
                  </div>
                </div>
                <HeroShowcase projects={projects} />
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div id="projects" className="min-h-screen bg-black relative overflow-hidden flex flex-col py-20" style={{ scrollSnapAlign: 'start' }}>
            <Aurora
              colorStops={["#0F2027", "#2C5364", "#6EE7B7"]}
              blend={0.2}
              amplitude={0.6}
              speed={0.4}
            />
            
            <div className="flex-1 flex flex-col justify-center px-4 md:px-8 relative z-10">
              {/* Header */}
              <div className="mb-16 text-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 to-lime-400 mb-6 animate-slideUp relative z-10">
                  Projects
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-amber-100/80 max-w-4xl mx-auto leading-relaxed animate-slideUp animation-delay-200 relative z-10">
                  A curated collection showcasing the fusion of 
                  <span className="text-lime-400 font-semibold"> technological innovation</span> and 
                  <span className="text-amber-200 font-semibold"> architectural excellence</span>
                </p>
                
                {/* Decorative elements */}
                <div className="flex flex-wrap justify-center mt-8 gap-6">
                  <div className="flex items-center space-x-2 text-amber-100/60 animate-slideUp animation-delay-300 group">
                    <Code2 size={20} className="group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-sm font-medium">Computational Design</span>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-100/60 animate-slideUp animation-delay-400 group">
                    <Palette size={20} className="group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-sm font-medium">Creative Vision</span>
                  </div>
                  <div className="flex items-center space-x-2 text-amber-100/60 animate-slideUp animation-delay-500 group">
                    <Sparkles size={20} className="group-hover:rotate-180 transition-transform duration-500 text-lime-400" />
                    <span className="text-sm font-medium">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Project Cards */}
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide px-4 justify-center">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => navigateToProject(project)}
                    className="group min-w-72 max-w-80 bg-gradient-to-br from-black/80 to-black/90 backdrop-blur-xl cursor-pointer transition-all duration-700 hover:shadow-3xl relative overflow-hidden rounded-3xl hover:scale-110 animate-slideUp border border-lime-400/30 hover:border-lime-400/60"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-lime-100/5 via-transparent to-lime-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 backdrop-blur-xl text-black px-4 py-2 rounded-full text-xs font-bold tracking-wide group-hover:scale-110 group-hover:bg-lime-500/80 transition-all duration-500 border border-lime-400/30">
                          {project.category}
                        </span>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <span className="bg-lime-500/70 backdrop-blur-xl text-black px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold text-amber-100 mb-3 group-hover:text-amber-50 transition-colors duration-500">
                        {project.title}
                      </h3>
                      <p className="text-stone-300 mb-4 opacity-90 text-sm font-medium group-hover:text-stone-200 transition-colors duration-300">
                        {project.subtitle}
                      </p>
                      
                      <div className="text-xs text-stone-300/80 mb-4">
                        <div className="flex items-center group-hover:translate-x-1 transition-transform duration-500">
                          <MapPin size={12} className="mr-2 text-lime-400" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-stone-300/90 leading-relaxed text-xs mb-6 group-hover:text-stone-200 transition-colors duration-300">
                        {project.description.substring(0, 100)}...
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-amber-100 text-sm font-bold group-hover:text-amber-50 transition-colors duration-300">
                          VIEW PROJECT
                          <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-500" />
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-500">
                          <Users size={12} className="text-lime-400" />
                          <span className="text-xs text-stone-300">{project.team}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-lime-100/0 via-lime-500 to-lime-100/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                    <div className="absolute top-0 right-0 w-0 h-0 border-l-20 border-l-transparent border-t-20 border-t-lime-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                ))}
              </div>

              {/* Scroll indicator */}
              <div className="text-center mt-12">
                <div className="inline-flex items-center bg-gradient-to-r from-transparent via-amber-100/10 to-transparent backdrop-blur-xl px-8 py-4 rounded-full border border-amber-100/20 shadow-2xl animate-pulse hover:bg-amber-100/5 transition-all duration-500 group">
                  <ArrowRight size={16} className="mr-3 text-lime-400 group-hover:translate-x-1 transition-transform duration-300 rotate-180" />
                  <div className="text-amber-100/80 text-sm font-medium tracking-wide">SCROLL HORIZONTALLY TO VIEW MORE PROJECTS</div>
                  <ArrowRight size={16} className="ml-3 text-lime-400 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>

          {/* About & Contact Section */}
          <div id="about" className="min-h-screen bg-black relative overflow-hidden flex flex-col" style={{ scrollSnapAlign: 'start' }}>
            <Aurora
              colorStops={["#120136", "#B91372", "#FF6F61"]}
              blend={0.4}
              amplitude={0.7}
              speed={0.2}
            />
            
            {/* Floating geometric shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-10 left-10 w-32 h-32 border-2 border-amber-100/20 rounded-full animate-spin-slow"></div>
              <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-lime-400/20 rounded-lg animate-spin-reverse-slow"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-lime-400/20 rotate-45 animate-float"></div>
              <div className="absolute top-1/4 right-1/4 w-16 h-16 border border-lime-300/30 rounded-full animate-pulse"></div>
            </div>

            {/* About Section */}
            <div className="flex-grow flex flex-col justify-center px-4 md:px-8 relative z-10 py-20">
              <div className="max-w-6xl mx-auto w-full relative">
                <AnimatedCard>
                  <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-lime-400 to-amber-100 mb-8 animate-gradient">
                      ABOUT ME
                    </h2>
                    <p className="text-lg md:text-xl lg:text-2xl text-amber-100/90 max-w-4xl mx-auto leading-relaxed">
                      Pioneering the intersection of 
                      <span className="text-lime-400 font-semibold"> computational design</span> and 
                      <span className="text-amber-200 font-semibold"> architectural innovation</span>
                    </p>
                  </div>
                </AnimatedCard>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                  <AnimatedCard delay={100} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-6 text-lime-400 relative z-10">
                        <Sparkles size={36} className="group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">INNOVATION</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10">
                        Pushing boundaries with cutting-edge design technologies and methodologies
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={200} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-6 text-lime-400 relative z-10">
                        <Code2 size={36} className="group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">TECHNOLOGY</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10">
                        Integrating parametric design and automation in architectural practice
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={300} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-amber-100/30 hover:border-amber-100/60 transition-all duration-700 hover:scale-110 hover:shadow-2xl relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="mb-6 text-lime-400 relative z-10">
                        <Palette size={36} className="group-hover:rotate-180 group-hover:scale-110 transition-all duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-100 mb-4 group-hover:text-lime-100 transition-colors duration-500 relative z-10">ARTISTRY</h3>
                      <p className="text-amber-100/70 leading-relaxed group-hover:text-amber-100/90 transition-colors duration-500 relative z-10">
                        Creating spaces that inspire through aesthetic excellence and functionality
                      </p>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div id="contact" className="bg-amber-50 px-4 md:px-8 py-16 relative z-10">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                  {/* Newsletter Section */}
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl text-black mb-6 leading-tight font-bold animate-slideUp">
                      Keep in the loop with Me.
                    </h2>
                    
                    <div className="relative group mb-4">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full bg-transparent border-b-2 border-black/60 py-3 text-base text-black placeholder-stone-600 focus:outline-none focus:border-lime-600 transition-all duration-500 focus:placeholder-stone-400 hover:border-black"
                      />
                      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black hover:text-lime-600 transition-all duration-500 hover:translate-x-1 hover:scale-110 p-2 rounded-full hover:bg-lime-100">
                        <ArrowRight size={20} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-stone-600 opacity-80">
                      Get updates on latest projects and architectural insights
                    </p>
                  </div>

                  {/* Contact Cards */}
                  <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group bg-black/90 backdrop-blur-xl p-6 rounded-3xl border-2 border-stone-700 text-center shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 animate-slideUp animation-delay-100 hover:border-lime-500">
                      <Mail size={24} className="mx-auto mb-3 text-lime-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                      <h3 className="text-sm text-amber-100 mb-2 font-bold group-hover:text-lime-100 transition-colors duration-300">EMAIL</h3>
                      <p className="text-stone-300 text-xs group-hover:text-stone-200 transition-colors duration-300">mdk.ug18.ar@nitp.ac.in</p>
                    </div>
                    <div className="group bg-black/90 backdrop-blur-xl p-6 rounded-3xl border-2 border-stone-700 text-center shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 animate-slideUp animation-delay-200 hover:border-lime-500">
                      <Home size={24} className="mx-auto mb-3 text-lime-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                      <h3 className="text-sm text-amber-100 mb-2 font-bold group-hover:text-lime-100 transition-colors duration-300">LOCATION</h3>
                      <p className="text-stone-300 text-xs group-hover:text-stone-200 transition-colors duration-300">Bangalore, India</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t border-stone-400/40">
                  <p className="text-stone-700 text-sm animate-fadeIn mb-4 md:mb-0">
                    ©2025 Designed and Developed by Saqlain Khan – All rights reserved.
                  </p>
                  <div className="flex items-center space-x-8 animate-fadeIn animation-delay-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-lime-600 to-lime-700 rounded-full hover:rotate-180 hover:scale-110 transition-all duration-700 cursor-pointer shadow-lg hover:shadow-lime-500/50"></div>
                    <div className="flex space-x-6 text-sm">
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

        .border-l-20 {
          border-left-width: 20px;
        }
        
        .border-t-20 {
          border-top-width: 20px;
        }
      `}</style>
    </div>
  );
};

export default ArchitecturePortfolio;