import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Briefcase, User, Mail, Calendar, MapPin, Users, ArrowRight, ChevronLeft } from 'lucide-react';
import Aurora from './Aurora';

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen, scrollToSection }) => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-black bg-opacity-40 backdrop-blur-xl border border-white border-opacity-20 rounded-full px-8 py-4 flex items-center space-x-8 shadow-lg">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-sm"></div>
          </div>
          <span className="text-white text-2xl" style={{ fontFamily: 'WindSong, cursive', fontWeight: 500 }}>Studio Arch</span>
        </div>
        
        {/* Navigation Items - Always visible on larger screens */}
        <div className="hidden md:flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('home')}
            className="text-white hover:text-stone-300 transition-colors duration-300 font-medium"
          >
            Home
          </button>
          <button 
            onClick={() => scrollToSection('projects')}
            className="text-white hover:text-stone-300 transition-colors duration-300 font-medium"
          >
            Projects
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-stone-300 transition-colors duration-300 font-medium"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="text-white hover:text-stone-300 transition-colors duration-300 font-medium"
          >
            Contact
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-stone-300 transition-colors duration-300 p-2 rounded-full hover:bg-white hover:bg-opacity-10"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black bg-opacity-80 backdrop-blur-xl border border-white border-opacity-20 rounded-2xl p-4 min-w-48">
          <div className="flex flex-col space-y-3">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-stone-300 transition-colors duration-300 font-medium text-left py-2"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="text-white hover:text-stone-300 transition-colors duration-300 font-medium text-left py-2"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-stone-300 transition-colors duration-300 font-medium text-left py-2"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-stone-300 transition-colors duration-300 font-medium text-left py-2"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Showcase Component
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
    <div className="relative h-80 md:h-96 lg:h-[28rem] w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white border-opacity-20 backdrop-blur-md">
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
        <div className="mb-4">
          <span className="bg-white bg-opacity-20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold tracking-wide border border-white border-opacity-30">
            {currentProject.category}
          </span>
        </div>
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 leading-tight drop-shadow-lg">
          {currentProject.title}
        </h3>
        <p className="text-lg md:text-xl text-white mb-4 opacity-90 max-w-2xl drop-shadow-md">
          {currentProject.subtitle} • {currentProject.location}
        </p>
        <p className="text-white opacity-80 max-w-2xl leading-relaxed drop-shadow-md">
          {currentProject.description.substring(0, 150)}...
        </p>
      </div>

      <div className="absolute top-6 right-6 flex space-x-2">
        {projects.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, index, onClick, scrollY }) => {
  return (
    <div
      onClick={() => onClick(project)}
      className="group min-w-80 md:min-w-96 bg-blue-600 cursor-pointer transition-all duration-500 hover:shadow-2xl relative overflow-hidden rounded-3xl hover:scale-105"
    >
      <div className="relative h-64 md:h-72 overflow-hidden rounded-t-3xl">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90"
        />
        <div className="absolute inset-0 bg-blue-800 opacity-20 group-hover:opacity-10 transition-opacity duration-500"></div>
        <div className="absolute top-6 left-6">
          <span className="bg-black bg-opacity-70 text-stone-200 px-4 py-2 rounded-full text-xs font-bold tracking-wide backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6 md:p-8 bg-blue-600 rounded-b-3xl">
        <h3 className="text-xl md:text-2xl font-black text-stone-200 mb-2 group-hover:text-white transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-stone-300 mb-4 font-medium opacity-90">{project.subtitle}</p>
        
        <div className="space-y-2 text-sm text-stone-300 mb-6 opacity-80">
          <div className="flex items-center">
            <Calendar size={14} className="mr-2" />
            {project.year}
          </div>
          <div className="flex items-center">
            <MapPin size={14} className="mr-2" />
            {project.location}
          </div>
          <div className="flex items-center">
            <Users size={14} className="mr-2" />
            {project.team}
          </div>
        </div>
        
        <p className="text-stone-300 leading-relaxed text-sm opacity-90 mb-6">
          {project.description.substring(0, 120)}...
        </p>

        <div className="flex items-center text-stone-200 font-bold text-sm">
          VIEW PROJECT
          <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-30 rounded-b-3xl">
        <div className="h-full bg-stone-200 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 rounded-b-3xl"></div>
      </div>
    </div>
  );
};

// Project Info Card Component
const ProjectInfoCard = ({ selectedProject }) => {
  return (
    <div className="bg-blue-600 p-8 rounded-3xl shadow-xl">
      <h3 className="text-2xl md:text-3xl font-black text-stone-200 mb-8">
        PROJECT <span className="text-black">INFO</span>
      </h3>
      <div className="space-y-6">
        <div>
          <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">Location</dt>
          <dd className="text-xl text-stone-200 font-medium">{selectedProject.location}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">Year</dt>
          <dd className="text-xl text-stone-200 font-medium">{selectedProject.year}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">Area</dt>
          <dd className="text-xl text-stone-200 font-medium">{selectedProject.details.area}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">Floors</dt>
          <dd className="text-xl text-stone-200 font-medium">{selectedProject.details.floors}</dd>
        </div>
        <div>
          <dt className="text-sm font-bold text-stone-300 uppercase tracking-wide mb-1">Team Size</dt>
          <dd className="text-xl text-stone-200 font-medium">{selectedProject.team}</dd>
        </div>
      </div>
    </div>
  );
};

// About Section Component
const AboutSection = () => (
  <div id="about" className="min-h-screen bg-black py-20 relative rounded-3xl border-2 border-stone-400 my-8 mx-4 md:mx-8 overflow-hidden">
    {/* Aurora Background for About */}
    <Aurora
      colorStops={["#1a1a1a", "#0006ad", "#2d2d2d"]}
      blend={0.4}
      amplitude={0.7}
      speed={0.2}
    />
    
    <div className="container mx-auto px-8 relative z-10">
      <div className="bg-stone-400 bg-opacity-95 backdrop-blur-xl p-8 md:p-12 rounded-3xl border-2 border-stone-300 mb-16 shadow-xl">
        <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black mb-6 leading-none">
          ABOUT<br />
          <span className="text-blue-600">STUDIO</span>
        </h2>
        <p className="text-xl md:text-2xl text-stone-800 max-w-3xl leading-relaxed">
          We are a team of passionate architects dedicated to creating 
          <span className="font-bold text-black"> innovative spaces</span> that 
          <span className="font-bold text-blue-600"> inspire and transform</span> communities.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-stone-400 bg-opacity-95 backdrop-blur-xl p-8 rounded-3xl border-2 border-stone-300 shadow-lg">
          <h3 className="text-3xl font-black text-black mb-4">OUR MISSION</h3>
          <p className="text-stone-800 leading-relaxed">
            To design sustainable, functional, and beautiful spaces that enhance human experiences 
            while respecting our planet's resources.
          </p>
        </div>
        <div className="bg-stone-400 bg-opacity-95 backdrop-blur-xl p-8 rounded-3xl border-2 border-stone-300 shadow-lg">
          <h3 className="text-3xl font-black text-black mb-4">OUR VISION</h3>
          <p className="text-stone-800 leading-relaxed">
            To be leaders in sustainable architecture, creating spaces that inspire connection 
            between people and their environment.
          </p>
        </div>
      </div>
    </div>
  </div>
);

// Contact Section Component
const ContactSection = () => (
  <div id="contact" className="min-h-screen bg-stone-200 py-20 relative rounded-3xl border-2 border-stone-400 my-8 mx-4 md:mx-8">
    <div className="container mx-auto px-8">
      {/* Newsletter Section */}
      <div className="mb-20">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-8 leading-tight">
            Keep in the loop with the STUDIO ARCH® newsletter.
          </h2>
          
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent border-b-2 border-black py-4 text-xl text-black placeholder-stone-600 focus:outline-none focus:border-blue-600 transition-colors duration-300"
            />
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2 text-black hover:text-blue-600 transition-colors duration-300">
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        {/* Studio Info */}
        <div>
          <h3 className="text-lg font-black text-black mb-6 uppercase tracking-wide">STUDIO</h3>
          <div className="space-y-4">
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Blog</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Showcase</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Learn Architecture</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Studio & Workflow</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Contact Us</a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-lg font-black text-black mb-6 uppercase tracking-wide">SERVICES</h3>
          <div className="space-y-4">
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Residential</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Commercial</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Mixed-Use</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Cultural</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Sustainable Design</a>
          </div>
        </div>

        {/* Design */}
        <div>
          <h3 className="text-lg font-black text-black mb-6 uppercase tracking-wide">DESIGN</h3>
          <div className="space-y-4">
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Architecture</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Interior Design</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Urban Planning</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Landscape</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">3D Visualization</a>
          </div>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-lg font-black text-black mb-6 uppercase tracking-wide">CONNECT</h3>
          <div className="space-y-4">
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Forums</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Codepen</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">LinkedIn</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">Bluesky</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">GitHub</a>
            <a href="#" className="block text-stone-700 hover:text-black transition-colors duration-300">X</a>
          </div>
        </div>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-3xl border-2 border-stone-300 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Mail size={32} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-black text-black mb-2">EMAIL</h3>
          <p className="text-stone-700">hello@studioarch.com</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-stone-300 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <Home size={32} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-black text-black mb-2">OFFICE</h3>
          <p className="text-stone-700">123 Design Street<br />Architecture City, AC 12345</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border-2 border-stone-300 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <User size={32} className="mx-auto mb-4 text-blue-600" />
          <h3 className="text-2xl font-black text-black mb-2">PHONE</h3>
          <p className="text-stone-700">+1 (555) 123-4567</p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-stone-400">
        <div className="mb-4 md:mb-0">
          <p className="text-stone-700">©2025 STUDIO ARCH – A Premium Architecture Studio. All rights reserved.</p>
        </div>
        <div className="flex items-center space-x-8">
          <div className="w-8 h-8 bg-blue-600 rounded"></div>
          <div className="flex space-x-4 text-sm">
            <a href="#" className="text-stone-700 hover:text-black transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-stone-700 hover:text-black transition-colors duration-300">Terms of Use</a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ArchitecturePortfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const timelineRef = useRef(null);

  // Project data
  const projects = [
    {
      id: 1,
      title: "ZENITH TOWER",
      subtitle: "Commercial Complex",
      year: "2024",
      location: "Tokyo, Japan",
      category: "High-rise",
      team: "12 Architects",
      description: "A revolutionary 45-story commercial complex that redefines urban living through sustainable design and innovative space utilization. The tower features a unique twisted facade that maximizes natural light while minimizing heat gain.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
      details: {
        area: "125,000 sq ft",
        floors: "45 floors",
        sustainability: "LEED Platinum certified with 40% energy reduction through innovative facade design and renewable energy integration.",
        concept: "The design philosophy centers around creating vertical neighborhoods that foster community interaction while maintaining privacy. Each floor features communal spaces that encourage collaboration.",
        materials: "Sustainable steel framework, energy-efficient glass panels, and locally-sourced stone accents create a harmonious blend of modernity and tradition."
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
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-stone-200">
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-4 tracking-tight">
                {selectedProject.title}
              </h1>
              <p className="text-2xl md:text-3xl lg:text-4xl font-light opacity-90 text-blue-400">
                {selectedProject.subtitle}
              </p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={goBack}
          className="absolute top-16 left-16 flex items-center text-stone-200 hover:text-blue-400 transition-colors duration-300 bg-black bg-opacity-50 px-6 py-3 backdrop-blur-sm font-medium rounded-2xl z-50"
        >
          <ChevronLeft size={20} className="mr-2" />
          Back to Projects
        </button>
      </div>

      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-stone-900 p-8 md:p-12 rounded-3xl">
              <h2 className="text-4xl md:text-5xl font-black text-stone-200 mb-8 leading-tight">
                PROJECT <span className="text-blue-600">OVERVIEW</span>
              </h2>
              <p className="text-xl md:text-2xl text-stone-400 leading-relaxed mb-8 font-light">
                {selectedProject.description}
              </p>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.concept}
              </p>
            </div>

            <div className="bg-stone-900 p-8 md:p-12 rounded-3xl">
              <h3 className="text-3xl md:text-4xl font-black text-stone-200 mb-8 leading-tight">
                SUSTAINABILITY <span className="text-blue-600">APPROACH</span>
              </h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.sustainability}
              </p>
            </div>

            <div className="bg-stone-900 p-8 md:p-12 rounded-3xl">
              <h3 className="text-3xl md:text-4xl font-black text-stone-200 mb-8 leading-tight">
                MATERIALS & <span className="text-blue-600">CONSTRUCTION</span>
              </h3>
              <p className="text-lg text-stone-400 leading-relaxed">
                {selectedProject.details.materials}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <ProjectInfoCard selectedProject={selectedProject} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen overflow-x-hidden">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} scrollToSection={scrollToSection} />
      
      {selectedProject ? (
        <ProjectDetail />
      ) : (
        <div>
          {/* Landing Page */}
          <div id="home" className="h-screen bg-black relative overflow-hidden">
            {/* Aurora Background */}
            <Aurora
              colorStops={["#0006ad", "#7cff67", "#8b5cf6"]}
              blend={0.4}
              amplitude={1.0}
              speed={0.5}
            />

            <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10 h-full">
              {/* New Background Badge */}
              <div className="mb-8">
                <div className="bg-black bg-opacity-30 backdrop-blur-md px-6 py-3 rounded-full border border-white border-opacity-20">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                    <span className="text-white text-lg" style={{ fontFamily: 'WindSong, cursive', fontWeight: 400 }}>New Portfolio Collection</span>
                  </div>
                </div>
              </div>

              {/* Main Headline */}
              <div className="text-center max-w-6xl mb-16">
                <h1 className="text-6xl md:text-7xl lg:text-8xl text-white mb-8 leading-tight tracking-tight">
                  <span 
                    className="block mb-6 text-white"
                    style={{ fontFamily: 'WindSong, cursive', fontWeight: 400, fontSize: '1.1em' }}
                  >
                    Crafting architectural dreams
                  </span>
                  <span className="text-white block" style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '0.9em', fontWeight: 'bold' }}>
                    one vision at a time
                  </span>
                </h1>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 mb-20">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-stone-100 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Explore Projects
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="bg-black bg-opacity-30 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white border-opacity-20 hover:bg-opacity-40 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </button>
              </div>

              {/* Rotating Architecture Showcase */}
              <div className="w-full max-w-6xl px-4">
                <div className="mb-6 text-center">
                  <h3 className="text-3xl md:text-4xl text-white opacity-90 mb-2" style={{ fontFamily: 'WindSong, cursive', fontWeight: 500 }}>
                    Featured Masterpieces
                  </h3>
                  <p className="text-white opacity-70 text-lg">
                    Explore our signature architectural creations
                  </p>
                </div>
                <HeroShowcase projects={projects} />
              </div>
            </div>
          </div>

          {/* Projects Timeline Section */}
          <div id="projects" className="min-h-screen bg-black py-20 relative rounded-3xl border-2 border-stone-400 my-8 mx-4 md:mx-8 overflow-hidden">
            {/* Aurora Background for Projects */}
            <Aurora
              colorStops={["#0006ad", "#2d2d2d", "#0006ad"]}
              blend={0.2}
              amplitude={0.6}
              speed={0.4}
            />
            
            <div className="container mx-auto px-8 relative z-10">
              <div 
                className="mb-16 bg-stone-400 bg-opacity-95 backdrop-blur-xl p-8 md:p-12 rounded-3xl border-2 border-stone-300 shadow-xl"
                style={{
                  transform: `translateY(${Math.max(-100, Math.min(0, (scrollY - window.innerHeight * 0.8) * 0.3))}px)`,
                  opacity: Math.min(1, Math.max(0, (scrollY - window.innerHeight * 0.5) / (window.innerHeight * 0.3)))
                }}
              >
                <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-black mb-6 leading-none">
                  SELECTED<br />
                  <span className="text-blue-600">WORKS</span>
                </h2>
                <p className="text-xl md:text-2xl text-stone-800 max-w-3xl leading-relaxed">
                  A curated collection of architectural projects that demonstrate our commitment to 
                  <span className="font-bold text-black"> innovative design</span> and 
                  <span className="font-bold text-blue-600"> sustainable practices</span>
                </p>
              </div>

              <div 
                ref={timelineRef}
                className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide px-4"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  transform: `translateY(${Math.max(-50, Math.min(50, (scrollY - window.innerHeight * 1.2) * 0.1))}px)`,
                  WebkitOverflowScrolling: 'touch',
                  opacity: Math.min(1, Math.max(0, (scrollY - window.innerHeight * 0.7) / (window.innerHeight * 0.5)))
                }}
              >
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id}
                    project={project}
                    index={index}
                    onClick={navigateToProject}
                    scrollY={scrollY}
                  />
                ))}
              </div>

              <div 
                className="text-center mt-12 bg-stone-400 bg-opacity-95 backdrop-blur-xl p-4 rounded-full border-2 border-stone-300 shadow-lg"
                style={{
                  opacity: Math.min(1, Math.max(0, (scrollY - window.innerHeight * 0.9) / (window.innerHeight * 0.3)))
                }}
              >
                <div className="text-black text-sm font-medium tracking-wide">← SCROLL HORIZONTALLY TO VIEW MORE PROJECTS →</div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <AboutSection />
          
          {/* Contact Section */}
          <ContactSection />
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
      `}</style>
    </div>
  );
};

export default ArchitecturePortfolio;