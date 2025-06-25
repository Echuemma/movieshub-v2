import React, { useState, useEffect } from 'react';
import { Play, Users, Award, Globe, Heart, Star, Film, Camera } from 'lucide-react';

const AboutUsSection = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [activeStory, setActiveStory] = useState(0);

  const stats = [
    { icon: Film, value: "10M+", label: "Movies Watched", color: "from-pink-500 to-rose-500" },
    { icon: Users, value: "2.5M+", label: "Active Users", color: "from-blue-500 to-cyan-500" },
    { icon: Globe, value: "150+", label: "Countries", color: "from-purple-500 to-indigo-500" },
    { icon: Award, value: "500+", label: "Awards Won", color: "from-yellow-500 to-orange-500" }
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      bio: "Former film critic turned tech entrepreneur with a passion for democratizing cinema.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Content",
      bio: "20+ years in film distribution, curating the world's best cinema for our platform.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Aisha Patel",
      role: "Chief Technology Officer",
      bio: "AI researcher building the future of personalized movie recommendations.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const storyMilestones = [
    { year: "2018", title: "The Beginning", description: "Started as a small blog reviewing indie films" },
    { year: "2020", title: "Platform Launch", description: "Launched our streaming platform with 1000 curated films" },
    { year: "2022", title: "Global Expansion", description: "Expanded to 50 countries with localized content" },
    { year: "2024", title: "AI Revolution", description: "Introduced AI-powered personalized recommendations" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementId = entry.target.dataset.elementId;
            setVisibleElements(prev => new Set([...prev, elementId]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const elements = document.querySelectorAll('[data-element-id]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStory((prev) => (prev + 1) % storyMilestones.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const isVisible = (elementId) => visibleElements.has(elementId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 px-4 py-16 sm:px-6 lg:px-8 max-w-7xl mx-auto">
       
        <div 
          data-element-id="hero"
          className={`text-center mb-20 transition-all duration-1000 ${
            isVisible('hero') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-sm border border-pink-500/30 rounded-full px-6 py-2 mb-6">
            <Camera className="w-5 h-5 text-pink-400" />
            <span className="text-pink-400 font-medium text-sm tracking-wide">About MoviesHub</span>
            {/* <span className="text-pink-400 font-medium text-sm tracking-wide">ABOUT CINEMAGIC</span> */}
          </div>
          
          <h1 className="sm:text-2xl lg:text-3xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Where Stories
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Come Alive
            </span>
          </h1>
          
          <p className="text-xl sm:text-1xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            We're not just another streaming platform. We're storytellers, dreamers, and cinema enthusiasts 
            on a mission to connect hearts through the universal language of film.
          </p>
        </div>

        <div 
          data-element-id="mission"
          className={`mb-20 transition-all duration-1000 delay-200 ${
            isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-blue-500/5" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-pink-400" />
                <h2 className="text-3xl sm:text-4xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg sm:text-1xl text-gray-300 leading-relaxed">
                To democratize access to extraordinary cinema from around the world. We believe every story deserves to be told, 
                every culture deserves to be celebrated, and every viewer deserves to discover their next favorite film. 
                Through cutting-edge technology and human curation, we're building bridges between filmmakers and audiences, 
                creating a global community united by the love of storytelling.
              </p>
            </div>
          </div>
        </div>

        <div 
          data-element-id="stats"
          className={`mb-20 transition-all duration-1000 delay-300 ${
            isVisible('stats') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 text-center hover:scale-105 transition-all duration-500 hover:bg-white/10 ${
                  isVisible('stats') ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div 
          data-element-id="timeline"
          className={`mb-20 transition-all duration-1000 delay-400 ${
            isVisible('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="sm:text-2xl lg:text-3xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-xl text-gray-300">From humble beginnings to global impact</p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500 rounded-full" />
            
            {storyMilestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                } ${activeStory === index ? 'scale-105' : ''} transition-transform duration-500`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12'}`}>
                  <div className={`bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 ${
                    activeStory === index ? 'bg-white/10 border-pink-500/30' : ''
                  } transition-all duration-500`}>
                    <div className="text-2xl font-bold text-pink-400 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full border-4 border-gray-900 z-10" />
              </div>
            ))}
          </div>
        </div>

        <div 
          data-element-id="team"
          className={`mb-20 transition-all duration-1000 delay-500 ${
            isVisible('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="sm:text-2xl lg:text-3xl font-bold text-white mb-4">Meet the Visionaries</h2>
            <p className="text-xl text-gray-300">The passionate team behind the magic</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={`group bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden hover:scale-105 transition-all duration-500 hover:bg-white/10 ${
                  isVisible('team') ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <div className="text-pink-400 font-medium mb-3">{member.role}</div>
                  <p className="text-gray-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div 
          data-element-id="cta"
          className={`text-center transition-all duration-1000 delay-600 ${
            isVisible('cta') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 sm:p-12">
            <h2 className="text-4xl sm:text-2xl lg:text-3xl font-bold text-white mb-6">
              Join Our Story
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Be part of a community that celebrates the art of filmmaking. 
              Together, we're writing the next chapter of cinema history.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-pink-500/30 overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Play className="w-5 h-5 mr-2" />
                <span className="relative">Start Watching</span>
              </button>
              
              <button className="group relative inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/10 overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <Users className="w-5 h-5 mr-2" />
                <span className="relative">Join Community</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AboutUsSection;