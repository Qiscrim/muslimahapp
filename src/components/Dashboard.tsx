import React from 'react'
import { Calendar, Droplets, Clock, AlertCircle, CheckCircle, Moon, Sun } from 'lucide-react'

interface User {
  name: string
  currentStatus: 'period' | 'clean'
  currentDay: number
  nextPeriodDate: Date
  qadaPrayers: number
  location: string
}

interface DashboardProps {
  user: User
  setUser: (user: User) => void
}

const Dashboard: React.FC<DashboardProps> = ({ user, setUser }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getDaysUntilNextPeriod = () => {
    const today = new Date()
    const diffTime = user.nextPeriodDate.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleStartPeriod = () => {
    setUser({
      ...user,
      currentStatus: 'period',
      currentDay: 1
    })
  }

  const handleEndPeriod = () => {
    // In a real app, this would open a modal for Ghusl timing
    setUser({
      ...user,
      currentStatus: 'clean',
      currentDay: 0,
      qadaPrayers: user.qadaPrayers + 1 // Example: adding one missed prayer
    })
  }

  const todaysPrayerTimes = [
    { name: 'Fajr', time: '5:30 AM', completed: true },
    { name: 'Dhuhr', time: '12:45 PM', completed: true },
    { name: 'Asr', time: '4:20 PM', completed: false },
    { name: 'Maghrib', time: '7:15 PM', completed: false },
    { name: 'Isha', time: '8:45 PM', completed: false }
  ]

  return (
    <div className="space-y-8">
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Current Status */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`p-2 rounded-xl ${user.currentStatus === 'period' ? 'bg-red-400/20' : 'bg-green-400/20'}`}>
              {user.currentStatus === 'period' ? 
                <Droplets className="h-6 w-6 text-red-600" /> : 
                <CheckCircle className="h-6 w-6 text-green-600" />
              }
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Current Status</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-800">
              {user.currentStatus === 'period' ? 'On Period' : 'Clean'}
            </p>
            {user.currentStatus === 'period' && (
              <p className="text-gray-600">Day {user.currentDay}</p>
            )}
            <p className="text-sm text-gray-500">
              {user.currentStatus === 'period' ? 
                'No prayers required during this time' : 
                'All current prayers should be performed'
              }
            </p>
          </div>
        </div>

        {/* Next Period */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-purple-400/20">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Next Period</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-800">
              {getDaysUntilNextPeriod()} days
            </p>
            <p className="text-sm text-gray-600">
              Expected around {formatDate(user.nextPeriodDate)}
            </p>
          </div>
        </div>

        {/* Qada Prayers */}
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-xl bg-orange-400/20">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Qada' Prayers</h3>
          </div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-gray-800">{user.qadaPrayers}</p>
            <p className="text-sm text-gray-600">
              {user.qadaPrayers > 0 ? 'Prayers to make up' : 'All prayers up to date'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={handleStartPeriod}
            disabled={user.currentStatus === 'period'}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-red-400/20 to-pink-400/20 hover:from-red-400/30 hover:to-pink-400/30 rounded-xl border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Droplets className="h-5 w-5 text-red-600" />
            <span className="font-medium text-gray-800">Start Period</span>
          </button>

          <button
            onClick={handleEndPeriod}
            disabled={user.currentStatus === 'clean'}
            className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-400/20 to-emerald-400/20 hover:from-green-400/30 hover:to-emerald-400/30 rounded-xl border border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="font-medium text-gray-800">End Period & Ghusl</span>
          </button>

          <button className="flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 hover:from-blue-400/30 hover:to-cyan-400/30 rounded-xl border border-white/20 transition-all duration-200">
            <Clock className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-gray-800">Log Qada' Prayer</span>
          </button>
        </div>
      </div>

      {/* Today's Prayer Times */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-yellow-400/20">
            <Sun className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Today's Prayer Times</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {todaysPrayerTimes.map((prayer, index) => (
            <div key={index} className="text-center p-4 rounded-xl bg-white/10 border border-white/20">
              <div className="flex items-center justify-center mb-2">
                {prayer.completed ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <p className="font-medium text-gray-800">{prayer.name}</p>
              <p className="text-sm text-gray-600">{prayer.time}</p>
            </div>
          ))}
        </div>
        
        {user.currentStatus === 'period' && (
          <div className="mt-4 p-4 bg-red-50/50 rounded-xl border border-red-200/50">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <p className="text-sm text-red-700">
                During menstruation, you are not required to perform the five daily prayers.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
