import React from 'react';
import { Home, Mail, Calendar, MapPin, Users, Menu, X, Briefcase, User, ArrowRight, ChevronLeft } from 'lucide-react';

const TestIcons = () => {
  return (
    <div style={{ padding: '20px', background: '#f0f0f0' }}>
      <h2>Testing Lucide React Icons</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '10px' }}>
        <Home size={24} color="#000" />
        <Mail size={24} color="#0006ad" />
        <Calendar size={24} color="#666" />
        <MapPin size={24} color="#666" />
        <Users size={24} color="#666" />
        <Menu size={24} color="#000" />
        <X size={24} color="#000" />
        <Briefcase size={24} color="#0006ad" />
        <User size={24} color="#666" />
        <ArrowRight size={24} color="#0006ad" />
        <ChevronLeft size={24} color="#666" />
      </div>
      <p>If you see icons above, Lucide React is working! ✅</p>
    </div>
  );
};

export default TestIcons;