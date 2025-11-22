import React, { useState } from 'react'
import Chart from '../components/Chart'

const GrowthTracker = () => {
  const [entries, setEntries] = useState([
    { date: '2024-01-15', weight: 3.2, height: 50, age: 0 },
    { date: '2024-02-15', weight: 4.5, height: 55, age: 1 },
    { date: '2024-03-15', weight: 5.8, height: 60, age: 2 },
    { date: '2024-04-15', weight: 6.7, height: 64, age: 3 },
    { date: '2024-05-15', weight: 7.4, height: 67, age: 4 },
    { date: '2024-06-15', weight: 8.1, height: 70, age: 5 },
  ])
  const [newEntry, setNewEntry] = useState({
    date: '',
    weight: '',
    height: '',
    age: ''
  })

  const addEntry = () => {
    if (newEntry.date && newEntry.weight && newEntry.height && newEntry.age) {
      const entry = {
        date: newEntry.date,
        weight: parseFloat(newEntry.weight),
        height: parseFloat(newEntry.height),
        age: parseInt(newEntry.age)
      }
      setEntries([...entries, entry])
      setNewEntry({ date: '', weight: '', height: '', age: '' })
    }
  }

  const growthData = entries.map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short' }),
    weight: entry.weight,
    height: entry.height,
    age: entry.age
  }))

  const growthStandards = [
    { age: 'Birth', normalWeight: '2.5-4.5 kg', normalHeight: '45-55 cm' },
    { age: '3 months', normalWeight: '5-7 kg', normalHeight: '58-63 cm' },
    { age: '6 months', normalWeight: '6.5-9 kg', normalHeight: '63-71 cm' },
    { age: '9 months', normalWeight: '7.5-10.5 kg', normalHeight: '68-75 cm' },
    { age: '1 year', normalWeight: '8-11 kg', normalHeight: '72-80 cm' },
    { age: '18 months', normalWeight: '9.5-12.5 kg', normalHeight: '78-86 cm' },
  ]

  const getLatestEntry = () => {
    return entries.length > 0 ? entries[entries.length - 1] : null
  }

  const latestEntry = getLatestEntry()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Child Growth Tracker</h1>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Monitor your child's growth and development with WHO-standard growth charts
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Entry & Current Stats */}
          <div className="lg:col-span-1 space-y-8">
            {/* Add New Measurement */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center text-white mr-3">➕</span>
                Add New Measurement
              </h3>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="form-label">Date</label>
                  <input 
                    type="date" 
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="form-input"
                  />
                </div>
                <div>
                  <label className="form-label">Age (months)</label>
                  <input 
                    type="number" 
                    value={newEntry.age}
                    onChange={(e) => setNewEntry({...newEntry, age: e.target.value})}
                    className="form-input"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="form-label">Weight (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry({...newEntry, weight: e.target.value})}
                    className="form-input"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="form-label">Height (cm)</label>
                  <input 
                    type="number" 
                    value={newEntry.height}
                    onChange={(e) => setNewEntry({...newEntry, height: e.target.value})}
                    className="form-input"
                    placeholder="0"
                  />
                </div>
                <button 
                  className="btn btn-primary w-full"
                  onClick={addEntry}
                >
                  Save Measurement
                </button>
              </div>
            </div>

            {/* Current Stats */}
            {latestEntry && (
              <div className="card p-6">
                <h3 className="subsection-title">Current Stats</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-4 bg-primary-50 rounded-xl">
                    <div className="text-2xl font-bold text-primary-600 font-display">{latestEntry.weight} kg</div>
                    <div className="text-sm text-primary-600 font-medium">Weight</div>
                  </div>
                  <div className="text-center p-4 bg-secondary-50 rounded-xl">
                    <div className="text-2xl font-bold text-secondary-600 font-display">{latestEntry.height} cm</div>
                    <div className="text-sm text-secondary-600 font-medium">Height</div>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-accent-50 rounded-lg">
                  <div className="text-sm text-accent-700 font-medium">Growth Status</div>
                  <div className="text-lg font-semibold text-accent-800 mt-1">Healthy Progress</div>
                </div>
              </div>
            )}

            {/* Growth Milestones */}
            <div className="card p-6">
              <h3 className="subsection-title">Recent Milestones</h3>
              <div className="space-y-3 mt-4">
                {[
                  { milestone: 'First smile', achieved: true, date: '2 months' },
                  { milestone: 'Rolling over', achieved: true, date: '4 months' },
                  { milestone: 'Sitting without support', achieved: false, date: '6-8 months' },
                  { milestone: 'First words', achieved: false, date: '9-12 months' },
                ].map((milestone, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${milestone.achieved ? 'bg-green-500' : 'bg-neutral-300'}`}></div>
                      <span className={milestone.achieved ? 'text-neutral-900' : 'text-neutral-500'}>
                        {milestone.milestone}
                      </span>
                    </div>
                    <span className="text-sm text-neutral-500">{milestone.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Charts & Standards */}
          <div className="lg:col-span-2 space-y-8">
            {/* Growth Charts */}
            <Chart 
              data={growthData}
              xKey="date"
              yKeys={['weight', 'height']}
              title="Growth Progress Over Time"
            />

            {/* Growth Standards */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center text-white mr-3">📊</span>
                WHO Growth Standards
              </h3>
              <div className="overflow-x-auto mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Age</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Normal Weight Range</th>
                      <th className="text-left py-3 px-4 font-semibold text-neutral-900">Normal Height Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {growthStandards.map((standard, index) => (
                      <tr key={index} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors duration-150">
                        <td className="py-3 px-4 font-medium text-neutral-900">{standard.age}</td>
                        <td className="py-3 px-4 text-neutral-700">{standard.normalWeight}</td>
                        <td className="py-3 px-4 text-neutral-700">{standard.normalHeight}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-primary-50 rounded-xl">
                <div className="text-sm text-primary-700">
                  <strong>Note:</strong> These are general guidelines. Every child grows at their own pace. 
                  Consult your healthcare provider for personalized advice.
                </div>
              </div>
            </div>

            {/* Vaccination Schedule */}
            <div className="card p-6">
              <h3 className="subsection-title flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white mr-3">💉</span>
                Vaccination Schedule
              </h3>
              <div className="space-y-3 mt-4">
                {[
                  { vaccine: 'BCG', scheduled: 'At birth', status: 'Completed' },
                  { vaccine: 'Polio', scheduled: '6, 10, 14 weeks', status: 'Next: 10 weeks' },
                  { vaccine: 'Pentavalent', scheduled: '6, 10, 14 weeks', status: 'Next: 10 weeks' },
                  { vaccine: 'Measles', scheduled: '9 months', status: 'Upcoming' },
                ].map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-neutral-900">{vaccine.vaccine}</div>
                      <div className="text-sm text-neutral-500">{vaccine.scheduled}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      vaccine.status === 'Completed' 
                        ? 'bg-green-100 text-green-800'
                        : vaccine.status.includes('Next')
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {vaccine.status}
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

export default GrowthTracker