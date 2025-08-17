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
  color = "beige"
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

// Navigation Component with animations
const Navigation = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ${
      scrolled ? 'scale-95' : 'scale-100'
    }`}>
      <div className="bg-black bg-opacity-40 backdrop-blur-xl rounded-full px-8 py-4 flex items-center space-x-8 shadow-lg">
        {/* Logo/Brand with hover animation */}
        <div className="flex items-center space-x-3 group">
          <span className="text-orange-100 text-2xl font-semibold transition-all duration-300 group-hover:tracking-wider" 
                style={{ fontFamily: 'Inter, sans-serif' }}>
            Portfolio
          </span>
        </div>
        
        {/* Navigation Items with stagger animation */}
        <div className="hidden md:flex items-center space-x-6">
          {['home', 'projects', 'about', 'contact'].map((item, index) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-orange-100 hover:text-stone-300 transition-all duration-300 font-medium relative group"
              style={{ 
                fontFamily: 'Inter, sans-serif',
                animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-100 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-orange-100 hover:text-stone-300 transition-all duration-300 p-2 rounded-full hover:bg-orange-100 hover:bg-opacity-10"
        >
          <div className="transition-transform duration-300">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </div>
        </button>
      </div>

      {/* Mobile Menu Dropdown with animation */}
      <div className={`md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black bg-opacity-80 backdrop-blur-xl border border-orange-100 border-opacity-30 rounded-2xl p-4 min-w-48 transition-all duration-300 ${
        isMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
        <div className="flex flex-col space-y-3">
          {['home', 'projects', 'about', 'contact'].map((item, index) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-orange-100 hover:text-stone-300 transition-all duration-300 font-medium text-left py-2 hover:translate-x-2"
              style={{ 
                fontFamily: 'Noto Sans, sans-serif',
                animation: isMenuOpen ? `slideInLeft 0.3s ease-out ${index * 0.05}s both` : ''
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

// Hero Showcase Component with enhanced animations
const HeroShowcase = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);

    return () => clearInterval(interval);
  }, [projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <div className="relative h-80 md:h-96 lg:h-[28rem] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-orange-100 border-opacity-30 backdrop-blur-md hover:shadow-3xl transition-shadow duration-500">
      <div 
        className={`absolute inset-0 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      >
        <img 
          src={currentProject.image} 
          alt={currentProject.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent rounded-3xl"></div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
        <div className="mb-4 animate-slideUp">
          <span className="bg-orange-100 bg-opacity-20 backdrop-blur-md text-orange-100 px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-orange-100 border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
            {currentProject.category}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-orange-100 mb-3 leading-tight drop-shadow-lg animate-slideUp animation-delay-100">
          {currentProject.title}
        </h3>
        <p className="text-lg md:text-xl text-orange-100 mb-4 opacity-90 max-w-2xl drop-shadow-md animate-slideUp animation-delay-200">
          {currentProject.subtitle} • {currentProject.location}
        </p>
        <p className="text-orange-100 opacity-80 max-w-2xl leading-relaxed drop-shadow-md animate-slideUp animation-delay-300">
          {currentProject.description.substring(0, 150)}...
        </p>
      </div>

      <div className="absolute top-6 right-6 flex space-x-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-orange-100 w-8' : 'bg-orange-100 bg-opacity-50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Enhanced Project Info Card
const ProjectInfoCard = ({ selectedProject }) => {
  return (
    <AnimatedCard className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <h3 className="text-2xl md:text-3xl font-black text-orange-100 mb-8">
        PROJECT <span className="text-black">INFO</span>
      </h3>
      <div className="space-y-6">
        {[
          { label: 'Location', value: selectedProject.location },
          { label: 'Year', value: selectedProject.year },
          { label: 'Area', value: selectedProject.details.area },
          { label: 'Floors', value: selectedProject.details.floors },
          { label: 'Team Size', value: selectedProject.team }
        ].map((item, index) => (
          <div 
            key={item.label}
            className="transform transition-all duration-300 hover:translate-x-2"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">{item.label}</dt>
            <dd className="text-xl text-orange-100 font-medium">{item.value}</dd>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
};

const ArchitecturePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse for parallax effects
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
      description: "This voronoi fracture skeleton is created by mesh extrusion using Grasshopper and Rhino and rendered on Cinema 4D",
      image: "images/Project1.png",
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
      description: "An award-winning residential villa that embodies the principles of minimalism while maximizing comfort and functionality. Clean lines and open spaces create a serene living environment.",
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

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="text-center text-orange-100 animate-fadeIn">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight animate-slideUp">
                {selectedProject.title}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light opacity-90 text-blue-400 animate-slideUp animation-delay-200">
                {selectedProject.subtitle}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={goBack}
          className="absolute top-16 left-16 flex items-center text-orange-100 hover:text-blue-400 transition-all duration-300 bg-black bg-opacity-50 px-6 py-3 backdrop-blur-sm font-medium rounded-2xl z-50 hover:scale-105 hover:bg-opacity-70"
        >
          <ChevronLeft size={20} className="mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Projects
        </button>
      </div>

      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <AnimatedCard className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-300">
              <h2 className="text-4xl md:text-5xl font-black text-orange-100 mb-8 leading-tight">
                PROJECT <span className="text-blue-400">OVERVIEW</span>
              </h2>
              <p className="text-xl md:text-2xl text-stone-400 leading-relaxed mb-8 font-light">
                {selectedProject.description}
              </p>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.concept}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={200} className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-black text-orange-100 mb-8 leading-tight">
                SUSTAINABILITY <span className="text-blue-400">APPROACH</span>
              </h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.sustainability}
              </p>
            </AnimatedCard>

            <AnimatedCard delay={400} className="bg-gradient-to-br from-stone-900 to-stone-800 p-8 md:p-12 rounded-3xl hover:shadow-2xl transition-all duration-300">
              <h3 className="text-3xl md:text-4xl font-black text-orange-100 mb-8 leading-tight">
                MATERIALS & <span className="text-blue-400">CONSTRUCTION</span>
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
          <div id="home" className="h-screen bg-black relative overflow-hidden flex flex-col" style={{ scrollSnapAlign: 'start' }}>
            {/* Aurora Background */}
            <Aurora
              colorStops={["#0006ad", "#7cff67", "#8b5cf6"]}
              blend={0.4}
              amplitude={1.0}
              speed={0.5}
            />

            {/* Floating particles animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-100 rounded-full opacity-30 animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${15 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
              {/* Main Headline with parallax */}
              <div 
                className="text-center max-w-6xl mb-8"
                style={{
                  transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
                }}
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl text-orange-100 mb-6 leading-tight tracking-tight animate-fadeIn" 
                    style={{ fontFamily: 'Inter, sans-serif', fontWeight: '800' }}>
                  <span className="block mb-4 text-orange-100" style={{ height: 'auto', padding: '0', color: 'beige' }}>
                    <TextType 
                      text={["Welcome, fellow explorer. To the Dark Side — or as I call it, the Architecture Side. Blended with a flavour of technology. Happy Exploring (^ - ^)"]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                      color="beige"
                    />
                  </span>
                </h1>
              </div>

              {/* CTA Buttons with hover animations */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 m-0">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-orange-100 text-black px-6 py-3 rounded-full text-base hover:bg-orange-200 transition-all duration-300 hover:scale-110 hover:rotate-1 shadow-lg animate-slideUp"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}
                >
                  Explore Projects
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-black bg-opacity-30 backdrop-blur-md text-orange-100 px-6 py-3 rounded-full text-base border border-orange-100 border-opacity-30 hover:bg-opacity-40 transition-all duration-300 hover:scale-110 hover:-rotate-1 animate-slideUp animation-delay-100"
                  style={{ fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
                >
                  Learn More
                </button>
              </div>

              {/* Rotating Architecture Showcase */}
              <div className="w-full max-w-5xl px-4 animate-fadeIn animation-delay-300">
                <div className="mb-4 text-center">
                  <h3 className="text-2xl md:text-3xl text-orange-100 opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', color: 'beige' }}>
                    Explore collection that is best of both worlds
                  </h3>
                </div>
                <div className="relative h-64 md:h-80 w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-orange-100 border-opacity-30 backdrop-blur-md hover:scale-105 transition-transform duration-500">
                  <HeroShowcase projects={projects} />
                </div>
              </div>
            </div>
          </div>

          {/* Projects Timeline Section - Redesigned */}
          <div id="projects" className="h-screen bg-black relative overflow-hidden flex flex-col" style={{ scrollSnapAlign: 'start' }}>
            {/* Aurora Background for Projects */}
            <Aurora
              colorStops={["#0F2027", "#2C5364", "#6EE7B7"]}
              blend={0.2}
              amplitude={0.6}
              speed={0.4}
            />
            
            <div className="flex-1 flex flex-col justify-center px-8 relative z-10 py-20">
              {/* Redesigned Selected Works Header */}
              <div className="mb-16 text-center relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                </div>
                <h2 className="text-6xl md:text-7xl lg:text-8xl leading-[2] font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-100 to-blue-400 mb-6 animate-slideUp relative z-10">
                  Projects
                </h2>
                <p className="text-xl md:text-2xl text-orange-100 opacity-80 max-w-3xl mx-auto leading-relaxed animate-slideUp animation-delay-200 relative z-10">
                  A curated collection showcasing the fusion of 
                  <span className="text-blue-400 font-semibold"> technological innovation</span> and 
                  <span className="text-orange-200 font-semibold"> architectural excellence</span>
                </p>
                
                {/* Decorative elements */}
                <div className="flex justify-center mt-8 space-x-4">
                  <div className="flex items-center space-x-2 text-orange-100 opacity-60 animate-slideUp animation-delay-300">
                    <Code2 size={20} />
                    <span className="text-sm">Computational Design</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-100 opacity-60 animate-slideUp animation-delay-400">
                    <Palette size={20} />
                    <span className="text-sm">Creative Vision</span>
                  </div>
                  <div className="flex items-center space-x-2 text-orange-100 opacity-60 animate-slideUp animation-delay-500">
                    <Sparkles size={20} />
                    <span className="text-sm">Innovation</span>
                  </div>
                </div>
              </div>

              {/* Project Cards with enhanced animations */}
              <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide px-4 justify-center">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    onClick={() => navigateToProject(project)}
                    className="group min-w-72 max-w-80 bg-gradient-to-br from-blue-600/90 to-blue-700/90 backdrop-blur-lg cursor-pointer transition-all duration-500 hover:shadow-2xl relative overflow-hidden rounded-3xl hover:scale-105 hover:rotate-1 animate-slideUp"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-orange-100/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                    
                    <div className="relative h-48 overflow-hidden rounded-t-3xl">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/70 backdrop-blur-md text-orange-100 px-3 py-1 rounded-full text-xs font-bold tracking-wide group-hover:scale-110 transition-transform duration-300">
                          {project.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 relative">
                      <h3 className="text-lg text-orange-100 mb-2 group-hover:text-orange-50 transition-colors duration-300 font-bold">
                        {project.title}
                      </h3>
                      <p className="text-stone-300 mb-3 opacity-90 text-sm font-medium">{project.subtitle}</p>
                      
                      <div className="text-xs text-stone-300 mb-4 opacity-80">
                        <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                          <MapPin size={12} className="mr-2" />
                          <span>{project.location}</span>
                        </div>
                      </div>
                      
                      <p className="text-stone-300 leading-relaxed text-xs opacity-90 mb-4">
                        {project.description.substring(0, 80)}...
                      </p>

                      <div className="flex items-center text-orange-100 text-xs font-bold group-hover:text-orange-50">
                        VIEW PROJECT
                        <ArrowRight size={14} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-100/0 via-orange-100 to-orange-100/0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <div className="inline-block bg-gradient-to-r from-transparent via-orange-100/20 to-transparent backdrop-blur-xl px-8 py-3 rounded-full border border-orange-100/30 shadow-lg animate-pulse">
                  <div className="text-orange-100 text-sm font-medium tracking-wide">← SCROLL HORIZONTALLY TO VIEW MORE PROJECTS →</div>
                </div>
              </div>
            </div>
          </div>

          {/* About & Contact Section - Redesigned */}
          <div id="about" className="h-screen bg-black relative overflow-hidden flex flex-col" style={{ scrollSnapAlign: 'start' }}>
            {/* Aurora Background for About/Contact */}
            <Aurora
              colorStops={["#120136", "#B91372", "#FF6F61"]}
              blend={0.4}
              amplitude={0.7}
              speed={0.2}
            />
            
            {/* Top 2/3 - About Section Redesigned */}
            <div className="h-2/3 flex flex-col justify-center px-8 relative z-10">
              {/* Floating geometric shapes */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-orange-100/20 rounded-full animate-spin-slow"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 border-2 border-blue-400/20 rounded-lg animate-spin-reverse-slow"></div>
                <div className="absolute top-1/2 left-1/3 w-24 h-24 border-2 border-purple-400/20 rotate-45 animate-float"></div>
              </div>

              <div className="max-w-5xl mx-auto w-full relative">
                <AnimatedCard>
                  <div className="text-center mb-12">
                    <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-100 via-blue-400 to-orange-100 mb-6 animate-gradient">
                      ABOUT ME
                    </h2>
                    <p className="text-xl md:text-2xl text-orange-100/90 max-w-3xl mx-auto leading-relaxed">
                      Pioneering the intersection of 
                      <span className="text-blue-400 font-semibold"> computational design</span> and 
                      <span className="text-orange-200 font-semibold"> architectural innovation</span>
                    </p>
                  </div>
                </AnimatedCard>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <AnimatedCard delay={100} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-orange-100/30 hover:border-orange-100/50 transition-all duration-500 hover:scale-105 hover:-rotate-1">
                      <div className="mb-4 text-blue-400">
                        <Sparkles size={32} className="group-hover:rotate-180 transition-transform duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-100 mb-3">INNOVATION</h3>
                      <p className="text-orange-100/70 leading-relaxed">
                        Pushing boundaries with cutting-edge design technologies and methodologies
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={200} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-orange-100/30 hover:border-orange-100/50 transition-all duration-500 hover:scale-105">
                      <div className="mb-4 text-blue-400">
                        <Code2 size={32} className="group-hover:rotate-180 transition-transform duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-100 mb-3">TECHNOLOGY</h3>
                      <p className="text-orange-100/70 leading-relaxed">
                        Integrating parametric design and automation in architectural practice
                      </p>
                    </div>
                  </AnimatedCard>

                  <AnimatedCard delay={300} className="group">
                    <div className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-xl p-8 rounded-3xl border border-orange-100/30 hover:border-orange-100/50 transition-all duration-500 hover:scale-105 hover:rotate-1">
                      <div className="mb-4 text-blue-400">
                        <Palette size={32} className="group-hover:rotate-180 transition-transform duration-700" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-100 mb-3">ARTISTRY</h3>
                      <p className="text-orange-100/70 leading-relaxed">
                        Creating spaces that inspire through aesthetic excellence and functionality
                      </p>
                    </div>
                  </AnimatedCard>
                </div>
              </div>
            </div>

            {/* Bottom 1/3 - Contact Section */}
            <div id="contact" className="h-1/3 bg-orange-100 flex flex-col justify-center px-8 relative z-10">
              <div className="max-w-6xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
                  {/* Newsletter Section */}
                  <div className="md:col-span-2">
                    <h2 className="text-3xl md:text-4xl text-black mb-4 leading-tight font-bold animate-slideUp">
                      Keep in the loop with the Me.
                    </h2>
                    
                    <div className="relative group">
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b-2 border-black py-2 text-base text-black placeholder-stone-600 focus:outline-none focus:border-blue-600 transition-all duration-300 focus:placeholder-stone-400"
                      />
                      <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-600 transition-all duration-300 hover:translate-x-1">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Contact Cards with animations */}
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="group bg-black/90 backdrop-blur-md p-4 rounded-3xl border-2 border-stone-700 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-rotate-1 animate-slideUp animation-delay-100">
                      <Mail size={20} className="mx-auto mb-2 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                      <h3 className="text-sm text-orange-100 mb-1 font-bold">EMAIL</h3>
                      <p className="text-stone-300 text-xs">mdk.ug18.ar@nitp.ac.in</p>
                    </div>
                    <div className="group bg-black/90 backdrop-blur-md p-4 rounded-3xl border-2 border-stone-700 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1 animate-slideUp animation-delay-200">
                      <Home size={20} className="mx-auto mb-2 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                      <h3 className="text-sm text-orange-100 mb-1 font-bold">LOCATION</h3>
                      <p className="text-stone-300 text-xs">Bangalore, India</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-4 mt-4 border-t border-stone-600">
                  <p className="text-stone-700 text-sm animate-fadeIn">©2025 Designed and Developed by Saqlain Khan – All rights reserved.</p>
                  <div className="flex items-center space-x-6 animate-fadeIn animation-delay-200">
                    <div className="w-6 h-6 bg-blue-600 rounded hover:rotate-180 transition-transform duration-500 cursor-pointer"></div>
                    <div className="flex space-x-3 text-sm">
                      <a href="https://www.linkedin.com/in/mdsaqlainkhan" className="text-stone-700 hover:text-black transition-colors duration-300 hover:scale-110">LinkedIn</a>
                      <a href="https://github.com/starman011" className="text-stone-700 hover:text-black transition-colors duration-300 hover:scale-110">GitHub</a>
                      <a href="#" className="text-stone-700 hover:text-black transition-colors duration-300 hover:scale-110">Privacy</a>
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
      `}</style>
    </div>
  );
};

export default ArchitecturePortfolio;