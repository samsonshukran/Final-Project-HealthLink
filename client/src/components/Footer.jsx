import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-health rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">HL</span>
              </div>
              <span className="text-2xl font-bold text-white font-display">HealthLink Kilifi</span>
            </div>
            <p className="text-neutral-300 mb-6 max-w-md text-lg leading-relaxed">
              Empowering mothers and families with modern healthcare tools and resources 
              for better maternal and child health outcomes.
            </p>
            <div className="flex space-x-4">
              <button className="text-neutral-400 hover:text-white transition-colors duration-200 p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
                <span className="sr-only">Facebook</span>
                <span className="text-lg">📘</span>
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors duration-200 p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
                <span className="sr-only">Twitter</span>
                <span className="text-lg">🐦</span>
              </button>
              <button className="text-neutral-400 hover:text-white transition-colors duration-200 p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700">
                <span className="sr-only">Instagram</span>
                <span className="text-lg">📷</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-neutral-300 hover:text-white transition-colors duration-200 block py-1">Features</a></li>
              <li><a href="#about" className="text-neutral-300 hover:text-white transition-colors duration-200 block py-1">About Us</a></li>
              <li><a href="#contact" className="text-neutral-300 hover:text-white transition-colors duration-200 block py-1">Contact</a></li>
              <li><a href="#help" className="text-neutral-300 hover:text-white transition-colors duration-200 block py-1">Help Center</a></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-display">Emergency Contacts</h3>
            <ul className="space-y-3 text-neutral-300">
              <li className="flex items-center space-x-2">
                <span className="text-red-400">📞</span>
                <span>119 - National Emergency</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-400">🏥</span>
                <span>0800 723 929 - Pregnancy Help</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">👶</span>
                <span>116 - Child Support</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-orange-400">🚑</span>
                <span>0700 000 000 - Kilifi Health</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm">
            © 2024 HealthLink Kilifi. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
              Privacy Policy
            </a>
            <a href="#terms" className="text-neutral-400 hover:text-white text-sm transition-colors duration-200">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer