import React, { useState } from 'react'
import Chart from '../components/Chart'
import TipsCard from '../components/TipsCard'

const PregnancyTracker = () => {
  const [lastPeriod, setLastPeriod] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [currentWeek, setCurrentWeek] = useState(24)

  const calculateDueDate = () => {
    if (lastPeriod) {
      const periodDate = new Date(lastPeriod)
      const due = new Date(periodDate.setDate(periodDate.getDate() + 280))
      setDueDate(due.toISOString().split('T')[0])
      
      // Calculate current week
      const today = new Date()
      const diffTime = Math.abs(today - periodDate)
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
      setCurrentWeek(Math.min(diffWeeks, 40))
    }
  }

  const pregnancyData = [
    { week: 4, weight: 50, symptoms: 2, babySize: 0.5 },
    { week: 8, weight: 51, symptoms: 3, babySize: 1.6 },
    { week: 12, weight: 53, symptoms: 4, babySize: 5.4 },
    { week: 16, weight: 55, symptoms: 3, babySize: 11.6 },
    { week: 20, weight: 58, symptoms: 2, babySize: 25.6 },
    { week: 24, weight: 62, symptoms: 4, babySize: 30.0 },
    { week: 28, weight: 65, symptoms: 3, babySize: 37.6 },
    { week: 32, weight: 68, symptoms: 4, babySize: 42.4 },
  ]

  const pregnancyTips = [
    'Aim for 7-9 hours of quality sleep each night',
    'Stay hydrated - drink at least 8-10 glasses of water daily',
    'Eat small, frequent meals to manage nausea and maintain energy',
    'Include iron-rich foods like spinach, beans, and lean meats in your diet',
    'Practice gentle exercises like walking or prenatal yoga',
    'Attend all scheduled prenatal check-ups'
  ]

  const dangerSigns = [
    'Heavy vaginal bleeding or spotting',
    'Severe abdominal pain or cramping',
    'Decreased fetal movement for more than 12 hours',
    'Severe headaches with vision changes',
    'Persistent vomiting or inability to keep fluids down',
    'High fever (above 38°C or 100.4°F)',
    'Sudden swelling of face, hands, or feet'
  ]

  const weeklyInfo = {
    24: {
      title: "Week 24: Viability Milestone",
      description: "Your baby has reached an important milestone and could potentially survive outside the womb with medical care.",
      babySize: "About 30 cm long, the size of an ear of corn",
      development: "The baby's lungs are developing surfactant, which helps them breathe after birth."
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Pregnancy Tracker</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Monitor your pregnancy journey with personalized insights and weekly updates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator & Current Week */}
          <div className="lg:col-span-1 space-y-8">
            {/* Due Date Calculator */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white mr-3">📅</span>
                Due Date Calculator
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="form-label">First Day of Last Period</label>
                  <input 
                    type="date" 
                    value={lastPeriod} 
                    onChange={(e) => setLastPeriod(e.target.value)}
                    className="form-input"
                  />
                </div>
                <button 
                  className="btn btn-primary w-full"
                  onClick={calculateDueDate}
                >
                  Calculate Due Date
                </button>
                {dueDate && (
                  <div className="p-4 bg-primary-50 rounded-xl text-center">
                    <div className="text-sm text-primary-600 font-medium">Estimated Due Date</div>
                    <div className="text-2xl font-bold text-primary-700 mt-1">
                      {new Date(dueDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Week Info */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center text-white mr-3">📊</span>
                Current Week
              </h3>
              <div className="text-center py-6">
                <div className="text-5xl font-bold text-accent-600 mb-2 font-display">{currentWeek}</div>
                <div className="text-lg text-neutral-600">Weeks Pregnant</div>
                <div className="w-full bg-neutral-200 rounded-full h-3 mt-4">
                  <div 
                    className="bg-accent-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(currentWeek / 40) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-neutral-500 mt-2">
                  {Math.round((currentWeek / 40) * 100)}% of pregnancy completed
                </div>
              </div>
            </div>

            {/* Weekly Development */}
            {weeklyInfo[currentWeek] && (
              <div className="card p-6">
                <h3 className="subsection-title">This Week's Development</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-neutral-900">Baby's Size:</div>
                    <div className="text-neutral-600">{weeklyInfo[currentWeek].babySize}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900">Development:</div>
                    <div className="text-neutral-600">{weeklyInfo[currentWeek].development}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Charts & Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Chart */}
            <Chart 
              data={pregnancyData}
              xKey="week"
              yKeys={['weight', 'symptoms', 'babySize']}
              title="Pregnancy Progress Tracking"
            />

            {/* Health Tips */}
            <TipsCard 
              title="Healthy Pregnancy Tips"
              tips={pregnancyTips}
              type="success"
              icon="💚"
            />

            {/* Danger Signs */}
            <TipsCard 
              title="Emergency Warning Signs - Seek Immediate Medical Help"
              tips={dangerSigns}
              type="danger"
              icon="🚨"
            />

            {/* Appointment Schedule */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center text-white mr-3">🏥</span>
                Upcoming Appointments
              </h3>
              <div className="space-y-3 mt-4">
                {[
                  { date: '2024-02-15', type: 'Prenatal Checkup', location: 'Kilifi Hospital' },
                  { date: '2024-03-01', type: 'Ultrasound Scan', location: 'Mombasa Women\'s Hospital' },
                  { date: '2024-03-15', type: 'Blood Tests', location: 'Kilifi Hospital' },
                ].map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                        <span className="text-secondary-600 font-bold text-sm">
                          {new Date(appointment.date).getDate()}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900">{appointment.type}</div>
                        <div className="text-sm text-neutral-500">{appointment.location}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500">
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="text-xs text-neutral-400">
                        {new Date(appointment.date).toLocaleDateString('en-US', { 
                          weekday: 'short' 
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PregnancyTracker