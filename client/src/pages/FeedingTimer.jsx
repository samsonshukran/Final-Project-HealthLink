import React, { useState, useEffect } from 'react'

const FeedingTimer = () => {
  const [sessions, setSessions] = useState([
    { id: 1, type: 'Breastfeeding', start: '08:30 AM', duration: 25, date: '2024-01-15', side: 'Left' },
    { id: 2, type: 'Solid Food', start: '12:15 PM', duration: 15, date: '2024-01-15', notes: 'Mashed bananas' },
    { id: 3, type: 'Breastfeeding', start: '03:45 PM', duration: 20, date: '2024-01-15', side: 'Right' },
  ])
  const [currentSession, setCurrentSession] = useState(null)
  const [startTime, setStartTime] = useState(null)
  const [duration, setDuration] = useState(0)
  const [selectedType, setSelectedType] = useState('breastfeeding')
  const [selectedSide, setSelectedSide] = useState('left')

  useEffect(() => {
    let interval
    if (currentSession && startTime) {
      interval = setInterval(() => {
        setDuration(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [currentSession, startTime])

  const startFeeding = () => {
    setCurrentSession(selectedType)
    setStartTime(Date.now())
    setDuration(0)
  }

  const stopFeeding = () => {
    if (currentSession && startTime) {
      const newSession = {
        id: sessions.length + 1,
        type: currentSession === 'breastfeeding' ? 'Breastfeeding' : 'Solid Food',
        start: new Date(startTime).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        }),
        duration: Math.floor(duration / 60),
        date: new Date().toISOString().split('T')[0],
        side: currentSession === 'breastfeeding' ? (selectedSide === 'left' ? 'Left' : 'Right') : 'N/A',
        notes: currentSession === 'solid' ? 'Solid food meal' : ''
      }
      setSessions([newSession, ...sessions])
    }
    setCurrentSession(null)
    setStartTime(null)
    setDuration(0)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTodaySessions = () => {
    const today = new Date().toISOString().split('T')[0]
    return sessions.filter(session => session.date === today)
  }

  const todaySessions = getTodaySessions()
  const totalTodayDuration = todaySessions.reduce((total, session) => total + session.duration, 0)

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Feeding Tracker</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Track breastfeeding sessions and feeding times with smart timers and analytics
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timer & Controls */}
          <div className="lg:col-span-1 space-y-8">
            {/* Feeding Timer */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center text-white mr-3">⏱️</span>
                Start Feeding Session
              </h3>
              
              {!currentSession ? (
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="form-label">Feeding Type</label>
                    <select 
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="form-input"
                    >
                      <option value="breastfeeding">Breastfeeding</option>
                      <option value="solid">Solid Food</option>
                      <option value="formula">Formula</option>
                    </select>
                  </div>

                  {selectedType === 'breastfeeding' && (
                    <div>
                      <label className="form-label">Breast Side</label>
                      <div className="flex space-x-4 mt-2">
                        <button
                          onClick={() => setSelectedSide('left')}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedSide === 'left' 
                              ? 'border-primary-500 bg-primary-50 text-primary-700' 
                              : 'border-neutral-300 text-neutral-600 hover:border-primary-300'
                          }`}
                        >
                          Left Side
                        </button>
                        <button
                          onClick={() => setSelectedSide('right')}
                          className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-200 ${
                            selectedSide === 'right' 
                              ? 'border-primary-500 bg-primary-50 text-primary-700' 
                              : 'border-neutral-300 text-neutral-600 hover:border-primary-300'
                          }`}
                        >
                          Right Side
                        </button>
                      </div>
                    </div>
                  )}

                  <button 
                    className="btn btn-primary w-full py-4 text-lg font-medium"
                    onClick={startFeeding}
                  >
                    Start Feeding Session
                  </button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl font-bold text-accent-600 mb-4 font-display">
                    {formatTime(duration)}
                  </div>
                  <div className="text-lg text-neutral-600 mb-2">
                    Currently {currentSession === 'breastfeeding' ? 'Breastfeeding' : 'Feeding Solid Food'}
                  </div>
                  {currentSession === 'breastfeeding' && (
                    <div className="text-sm text-primary-600 font-medium">
                      {selectedSide === 'left' ? 'Left Breast' : 'Right Breast'}
                    </div>
                  )}
                  <button 
                    className="btn btn-accent w-full mt-6 py-4 text-lg font-medium"
                    onClick={stopFeeding}
                  >
                    Stop Feeding
                  </button>
                </div>
              )}
            </div>

            {/* Today's Summary */}
            <div className="card p-6">
              <h3 className="subsection-title">Today's Summary</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-4 bg-primary-50 rounded-xl">
                  <div className="text-2xl font-bold text-primary-600 font-display">
                    {todaySessions.length}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">Sessions</div>
                </div>
                <div className="text-center p-4 bg-secondary-50 rounded-xl">
                  <div className="text-2xl font-bold text-secondary-600 font-display">
                    {totalTodayDuration}
                  </div>
                  <div className="text-sm text-secondary-600 font-medium">Total Minutes</div>
                </div>
              </div>
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="text-sm text-green-700 font-medium">Feeding Status</div>
                <div className="text-lg font-semibold text-green-800 mt-1">On Track</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="subsection-title">Feeding Patterns</h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Average Session Duration</span>
                  <span className="font-semibold text-neutral-900">23 min</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Sessions Per Day</span>
                  <span className="font-semibold text-neutral-900">5-7</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                  <span className="text-neutral-700">Last Feeding</span>
                  <span className="font-semibold text-neutral-900">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - History & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Feeding History */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center text-white mr-3">📋</span>
                Recent Feeding Sessions
              </h3>
              {sessions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍼</div>
                  <div className="text-xl text-neutral-600 mb-2">No feeding records yet</div>
                  <div className="text-neutral-500">Start your first feeding session to begin tracking</div>
                </div>
              ) : (
                <div className="overflow-x-auto mt-4">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-200">
                        <th className="text-left py-3 px-4 font-semibold text-neutral-900">Date & Time</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-900">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-900">Duration</th>
                        <th className="text-left py-3 px-4 font-semibold text-neutral-900">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sessions.map((session) => (
                        <tr key={session.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-150">
                          <td className="py-3 px-4">
                            <div className="font-medium text-neutral-900">
                              {new Date(session.date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="text-sm text-neutral-500">{session.start}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              session.type === 'Breastfeeding' 
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {session.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-neutral-900">
                            {session.duration} min
                          </td>
                          <td className="py-3 px-4 text-sm text-neutral-600">
                            {session.type === 'Breastfeeding' ? session.side : session.notes}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Feeding Tips */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white mr-3">💡</span>
                Breastfeeding Tips
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="p-4 bg-blue-50 rounded-xl">
                  <div className="font-semibold text-blue-900 mb-2">Proper Latch</div>
                  <div className="text-blue-700 text-sm">
                    Ensure baby's mouth covers most of the areola, not just the nipple
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="font-semibold text-green-900 mb-2">Feeding Cues</div>
                  <div className="text-green-700 text-sm">
                    Watch for rooting, hand-to-mouth movements, and smacking lips
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-xl">
                  <div className="font-semibold text-purple-900 mb-2">Comfortable Position</div>
                  <div className="text-purple-700 text-sm">
                    Use pillows for support and find a relaxed, comfortable position
                  </div>
                </div>
                <div className="p-4 bg-orange-50 rounded-xl">
                  <div className="font-semibold text-orange-900 mb-2">Hydration & Nutrition</div>
                  <div className="text-orange-700 text-sm">
                    Drink plenty of water and eat balanced meals to support milk production
                  </div>
                </div>
              </div>
            </div>

            {/* Solid Food Introduction */}
            <div className="card p-6">
              <h3 className="subsection-title">Solid Food Introduction Guide</h3>
              <div className="space-y-3 mt-4">
                {[
                  { age: '4-6 months', foods: 'Single-grain cereals, pureed fruits/vegetables', notes: 'Start with small amounts' },
                  { age: '6-8 months', foods: 'Mashed fruits, vegetables, soft meats', notes: 'Introduce one food at a time' },
                  { age: '8-10 months', foods: 'Soft finger foods, small pasta pieces', notes: 'Watch for choking hazards' },
                  { age: '10-12 months', foods: 'Chopped family foods, soft-cooked vegetables', notes: 'Self-feeding practice' },
                ].map((stage, index) => (
                  <div key={index} className="p-4 bg-neutral-50 rounded-xl">
                    <div className="font-semibold text-neutral-900">{stage.age}</div>
                    <div className="text-neutral-700 mt-1">{stage.foods}</div>
                    <div className="text-sm text-neutral-500 mt-1">{stage.notes}</div>
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

export default FeedingTimer