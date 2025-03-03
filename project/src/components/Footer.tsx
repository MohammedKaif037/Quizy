import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white shadow-inner py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              &copy; {currentYear} QuizWiz. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-600 text-sm">
            <span>Made with</span>
            <Heart size={16} className="text-red-500 fill-current" />
            <span>using React, TypeScript & Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;