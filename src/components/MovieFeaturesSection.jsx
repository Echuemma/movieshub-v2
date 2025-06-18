import React from 'react';

const MovieFeaturesSection = () => {
  const features = [
    {
      icon: "🎬",
      title: "Discover New Movies",
      description: "Browse through thousands of movies with advanced filters and personalized recommendations based on your taste.",
      bgColor: "from-red-50 to-red-25",
      iconColor: "text-red-500",
      delay: "animate-[float_3s_ease-in-out_infinite]"
    },
    {
      icon: "📱",
      title: "Multi-Platform Streaming",
      description: "Find where to watch your favorite movies across all streaming platforms with real-time availability updates.",
      bgColor: "from-blue-50 to-blue-25",
      iconColor: "text-blue-500",
      delay: "animate-[float_3s_ease-in-out_infinite_1s]"
    },
    {
      icon: "🎯",
      title: "Smart Recommendations",
      description: "Get personalized movie suggestions powered by AI that learns from your viewing history and preferences.",
      bgColor: "from-green-50 to-green-25",
      iconColor: "text-green-500",
      delay: "animate-[float_3s_ease-in-out_infinite_2s]"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-5 md:p-10">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 tracking-tight">
          Everything You Need. In One App.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${feature.bgColor} rounded-2xl p-6 md:p-8 text-left transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/30 group`}
            >
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                  <div 
                    className={`text-5xl md:text-6xl ${feature.delay} drop-shadow-lg transform-gpu`}
                    style={{
                      filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.2))',
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 leading-tight">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotateY(0deg); 
          }
          50% { 
            transform: translateY(-10px) rotateY(5deg); 
          }
        }
        
        .animate-\\[float_3s_ease-in-out_infinite\\] {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-\\[float_3s_ease-in-out_infinite_1s\\] {
          animation: float 3s ease-in-out infinite;
          animation-delay: -1s;
        }
        
        .animate-\\[float_3s_ease-in-out_infinite_2s\\] {
          animation: float 3s ease-in-out infinite;
          animation-delay: -2s;
        }
      `}</style>
    </div>
  );
};

export default MovieFeaturesSection;