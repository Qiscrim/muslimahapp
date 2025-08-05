import React from 'react'
import { Calendar, TrendingUp, Droplets, Clock } from 'lucide-react'

const CycleHistory: React.FC = () => {
  const cycleData = [
    {
      id: 1,
      startDate: '2024-03-01',
      endDate: '2024-03-06',
      duration: 6,
      cycleLength: 28,
      symptoms: ['Cramps', 'Fatigue'],
      notes: 'Normal cycle'
    },
    {
      id: 2,
      startDate: '2024-02-02',
      endDate: '2024-02-07',
      duration: 5,
      cycleLength: 30,
      symptoms: ['Headache', 'Mood changes'],
      notes: 'Slightly longer cycle'
    },
    {
      id: 3,
      startDate: '2024-01-05',
      endDate: '2024-01-10',
      duration: 5,
      cycleLength: 28,
      symptoms: ['Cramps'],
      notes: 'Regular cycle'
    },
    {
      id: 4,
      startDate: '2023-12-08',
      endDate: '2023-12-13',
      duration: 5,
      cycleLength: 28,
      symptoms: ['Fatigue', 'Back pain'],
      notes: 'Normal'
    }
  ]

  const stats = {
    averageCycleLength: 28.5,
    averagePeriodDuration: 5.25,
    totalCycles: 12,
    regularityScore: 85
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="space-y-8">
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-400/20">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Avg Cycle Length</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.averageCycleLength} days</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-red-400/20">
              <Droplets className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Avg Period Duration</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.averagePeriodDuration} days</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-400/20">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Cycles</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.totalCycles}</p>
        </div>

        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-green-400/20">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-600">Regularity</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">{stats.regularityScore}%</p>
        </div>
      </div>

      {/* Cycle History */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-pink-400/20">
            <Calendar className="h-6 w-6 text-pink-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Cycles</h3>
        </div>

        <div className="space-y-4">
          {cycleData.map((cycle) => (
            <div key={cycle.id} className="p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <Droplets className="h-5 w-5 text-red-500" />
                      <span className="font-semibold text-gray-800">
                        {formatDate(cycle.startDate)} - {formatDate(cycle.endDate)}
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-red-400/20 text-red-700 text-sm font-medium rounded-full">
                      {cycle.duration} days
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Cycle Length:</span>
                      <span className="ml-2 font-medium text-gray-800">{cycle.cycleLength} days</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Symptoms:</span>
                      <span className="ml-2 font-medium text-gray-800">{cycle.symptoms.join(', ')}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Notes:</span>
                      <span className="ml-2 font-medium text-gray-800">{cycle.notes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle Pattern Visualization */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-indigo-400/20">
            <TrendingUp className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Cycle Pattern</h3>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
            <h4 className="font-medium text-blue-800 mb-2">Cycle Insights</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your cycles are generally regular with an average length of 28.5 days</li>
              <li>• Period duration is consistent at around 5-6 days</li>
              <li>• Most common symptoms: Cramps and fatigue</li>
              <li>• Consider tracking mood and energy levels for better insights</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50/50 rounded-xl border border-green-200/50">
            <h4 className="font-medium text-green-800 mb-2">Health Tips</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Maintain a balanced diet rich in iron during menstruation</li>
              <li>• Stay hydrated and get adequate rest</li>
              <li>• Light exercise can help reduce cramps</li>
              <li>• Consult a healthcare provider if you notice significant changes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CycleHistory
