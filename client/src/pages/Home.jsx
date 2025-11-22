import React from 'react'
import InfoCard from '../components/InfoCard'
import TipsCard from '../components/TipsCard'

const Home = () => {
  const features = [
    {
      icon: '📈',
      title: 'Child Growth Tracking',
      description: 'Monitor your child\'s weight and height development with WHO-standard growth charts and personalized insights.',
      gradient: 'from-primary-500 to-green-500'
    },
    {
      icon: '🤰',
      title: 'Pregnancy Tracker',
      description: 'Follow your pregnancy journey week by week with personalized health tips and milestone tracking.',
      gradient: 'from-accent-500 to-orange-500'
    },
    {
      icon: '🍼',
      title: 'Feeding Schedule',
      description: 'Track breastfeeding sessions, feeding times, and nutrition with smart reminders and progress analytics.',
      gradient: 'from-secondary-500 to-blue-500'
    }
  ]

  const safetyTips = [
    'Sleep under insecticide-treated mosquito nets every night to prevent malaria',
    'Attend all scheduled prenatal and postnatal clinic appointments',
    'Practice exclusive breastfeeding for the first 6 months of your baby\'s life',
    'Ensure your child receives all recommended vaccinations on schedule',
    'Wash hands thoroughly with soap and clean water before handling food or caring for your baby',
    'Recognize danger signs and seek immediate medical help when needed'
  ]

  const stats = [
    { number: '98%', label: 'Vaccination Coverage' },
    { number: '24/7', label: 'Health Support' },
    { number: '500+', label: 'Mothers Supported' },
    { number: '99%', label: 'User Satisfaction' }
  ]

  const emergencyContacts = [
    { service: 'National Emergency', number: '119', description: 'For all emergency situations', icon: '🚨' },
    { service: 'Pregnancy Support', number: '0800 723 929', description: 'Free counseling for expecting mothers', icon: '🤰' },
    { service: 'Child Health', number: '116', description: '24/7 pediatric support line', icon: '👶' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span>✨</span>
              <span>Trusted by 500+ mothers in Kilifi</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 font-display leading-tight">
              Your Partner in 
              <span className="gradient-text block"> Maternal & Child Health</span>
            </h1>
            <p className="text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Modern healthcare tools and resources designed specifically for mothers and families in Kilifi. 
              Track, learn, and connect for better health outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn btn-primary text-lg px-8 py-4 text-lg font-medium">
                Get Started Free
              </button>
              <button className="btn btn-outline text-lg px-8 py-4 text-lg font-medium">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card group hover:shadow-medium transition-all duration-300">
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2 font-display group-hover:scale-105 transition-transform duration-300">
                  {stat.number}
                </div>
                <div className="text-neutral-600 font-medium text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">How HealthLink Helps Your Family</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Comprehensive tools and resources designed to support you through every stage of motherhood and child development.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <InfoCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-accent-50/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <TipsCard 
            title="Essential Health & Safety Guidelines" 
            tips={safetyTips}
            type="success"
            icon="🛡️"
          />
        </div>
      </section>

      {/* Emergency & Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Nearby Services */}
            <div className="card p-8">
              <h3 className="subsection-title flex items-center">
                <span className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-glow">🏥</span>
                Healthcare Services Nearby
              </h3>
              <div className="space-y-4 mt-6">
                {[
                  { name: 'Kilifi County Hospital', distance: '2km', type: 'Public Hospital', wait: '30 mins' },
                  { name: 'Mtwapa Health Center', distance: '8km', type: 'Health Center', wait: '15 mins' },
                  { name: 'Malindi Sub-County Hospital', distance: '25km', type: 'Public Hospital', wait: '45 mins' },
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl hover:bg-primary-50 transition-colors duration-200 group">
                    <div className="flex-1">
                      <div className="font-semibold text-neutral-900 text-lg group-hover:text-primary-600 transition-colors duration-200">{service.name}</div>
                      <div className="text-neutral-500 text-sm mt-1">{service.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary-600 text-lg">{service.distance}</div>
                      <div className="text-neutral-500 text-sm">~{service.wait}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Emergency Contacts */}
            <div className="card p-8">
              <h3 className="subsection-title flex items-center">
                <span className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center text-white text-xl mr-4 shadow-glow">🚑</span>
                Emergency Contacts
              </h3>
              <div className="space-y-4 mt-6">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="p-4 bg-red-50 rounded-xl border-l-4 border-red-500 hover:bg-red-100 transition-colors duration-200 group">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl mt-1">{contact.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-neutral-900 text-lg group-hover:text-red-600 transition-colors duration-200">
                          {contact.service}
                        </div>
                        <div className="text-2xl font-bold text-red-600 my-2 font-display">
                          {contact.number}
                        </div>
                        <div className="text-neutral-600 text-lg">
                          {contact.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-health text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-display">
            Ready to Take Control of Your Family's Health?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Join hundreds of mothers in Kilifi who are already using HealthLink to track, learn, and grow together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn bg-white text-primary-600 hover:bg-neutral-100 text-lg px-8 py-4 font-medium">
              Start Your Journey
            </button>
            <button className="btn bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg px-8 py-4 font-medium">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home