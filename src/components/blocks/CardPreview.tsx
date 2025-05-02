
import React from 'react';
import { Mail, Linkedin, Globe, Github, Twitter, Facebook, Instagram } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardPreviewProps {
  data: {
    name: string;
    title?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    photoUrl?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  isLightMode?: boolean;
  gradientBg?: string;
}

export function CardPreview({ data, isLightMode = true, gradientBg }: CardPreviewProps) {
  // Default background if no gradient is selected
  const defaultBg = isLightMode
    ? "bg-white text-gray-900"
    : "bg-gray-900 text-white";

  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto rounded-3xl overflow-hidden transition-all duration-300",
        !gradientBg && defaultBg
      )}
      style={gradientBg ? { background: gradientBg } : {}}
    >
      {/* Profile Photo */}
      <div className="p-6">
        <div className="flex justify-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {data.photoUrl ? (
              <img 
                src={data.photoUrl} 
                alt={data.name || "Profile"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className={cn(
                "w-full h-full flex items-center justify-center text-xl font-bold",
                isLightMode ? "bg-gray-200" : "bg-gray-700"
              )}>
                {data.name ? data.name.charAt(0).toUpperCase() : "?"}
              </div>
            )}
          </div>
        </div>

        {/* Name and Title */}
        <div className={cn(
          "text-center mt-4",
          isLightMode ? "text-gray-900" : "text-white"
        )}>
          <h2 className="text-2xl font-bold">{data.name || "Your Name"}</h2>
          <p className={cn(
            "text-lg mt-1",
            isLightMode ? "text-gray-600" : "text-gray-300"
          )}>{data.title || "Your Title"}</p>
        </div>

        {/* Contact Information */}
        <div className="mt-6 space-y-3">
          {data.email && (
            <div className="flex items-center">
              <Mail className={cn(
                "mr-3 h-5 w-5",
                isLightMode ? "text-gray-600" : "text-gray-300"
              )} />
              <span className={cn(
                isLightMode ? "text-gray-800" : "text-gray-100"
              )}>{data.email}</span>
            </div>
          )}
          
          {data.phone && (
            <div className="flex items-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={cn(
                  "mr-3 h-5 w-5",
                  isLightMode ? "text-gray-600" : "text-gray-300"
                )}
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className={cn(
                isLightMode ? "text-gray-800" : "text-gray-100"
              )}>{data.phone}</span>
            </div>
          )}
          
          {data.portfolio && (
            <div className="flex items-center">
              <Globe className={cn(
                "mr-3 h-5 w-5",
                isLightMode ? "text-gray-600" : "text-gray-300"
              )} />
              <span className={cn(
                isLightMode ? "text-gray-800" : "text-gray-100"
              )}>{data.portfolio}</span>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="mt-8 flex justify-center space-x-4">
          {data.linkedin && (
            <a href={data.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Linkedin className={cn(
                "h-6 w-6",
                isLightMode ? "text-blue-700" : "text-blue-400"
              )} />
            </a>
          )}
          
          {data.github && (
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Github className={cn(
                "h-6 w-6",
                isLightMode ? "text-gray-800" : "text-white"
              )} />
            </a>
          )}
          
          {data.twitter && (
            <a href={data.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter className={cn(
                "h-6 w-6",
                isLightMode ? "text-blue-500" : "text-blue-300"
              )} />
            </a>
          )}
          
          {data.facebook && (
            <a href={data.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Facebook className={cn(
                "h-6 w-6",
                isLightMode ? "text-blue-600" : "text-blue-400"
              )} />
            </a>
          )}
          
          {data.instagram && (
            <a href={data.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram className={cn(
                "h-6 w-6",
                isLightMode ? "text-pink-600" : "text-pink-400"
              )} />
            </a>
          )}
        </div>
      </div>
      
      {/* Theme Toggle at the bottom */}
      <div className={cn(
        "py-3 px-6 text-center text-xs",
        isLightMode ? "bg-gray-100 text-gray-500" : "bg-gray-800 text-gray-400"
      )}>
        NexCard | Professional Digital Card
      </div>
    </div>
  );
}
