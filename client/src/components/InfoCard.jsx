import React from 'react'

const InfoCard = ({ icon, title, description, gradient = 'from-primary-500 to-secondary-500', onClick }) => {
  return (
    <div 
      className="card card-hover p-6 h-full fade-in cursor-pointer group"
      onClick={onClick}
    >
      <div className={`w-16 h-16 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white text-2xl mb-4 shadow-glow group-hover:scale-105 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-neutral-900 mb-3 font-display group-hover:text-primary-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-neutral-600 mb-4 leading-relaxed text-lg">
        {description}
      </p>
      <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors duration-200">
        <span>Learn more</span>
        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  )
}

export default InfoCard