import React from 'react'
import { Sun, Moon, Clock, MapPin, CheckCircle, AlertCircle } from 'lucide-react'

interface User {
  name: string
  currentStatus: 'period' | 'clean'
  currentDay: number
  nextPeriodDate: Date
  qadaPrayers: number
  location: string
}

interface PrayerTimesProps {
  user: User
}

const PrayerTimes: React.FC<PrayerTimesProps> = ({ user }) => {
  const prayerTimes = [
    { name: 'Fajr', time: '5:30 AM', arabic: 'الفجر', completed: true, current: false },
    { name: 'Sunrise', time: '6:45 AM', arabic: 'الشروق', completed: true, current: false },
    { name: 'Dhuhr', time: '12:45 PM', arabic: 'الظهر', completed: true, current: false },
    { name: 'Asr', time: '4:20 PM', arabic: 'العصر', completed: false, current: true },
    { name: 'Maghrib', time: '7:15 PM', arabic: 'المغرب', completed: false, current: false },
    { name: 'Isha', time: '8:45 PM', arabic: 'العشاء', completed: false, current: false }
  ]

  const qadaPrayers = [
    { prayer: 'Maghrib', date: 'March 15, 2024', reason: 'Ghusl performed after Maghrib time' },
    { prayer: 'Fajr', date: 'March 12, 2024', reason: 'Ghusl performed after Fajr time' }
  ]

  return (
    <div className="space-y-8">
      {/* Location & Current Time */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-400/20">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{user.location}</h3>
              <p className="text-sm text-gray-600">Prayer times calculated for your location</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">3:45 PM</p>
            <p className="text-sm text-gray-600">Current Time</p>
          </div>
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

        <div className="space-y-4">
          {prayerTimes.map((prayer, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                prayer.current
                  ? 'bg-blue-400/20 border-blue-300/50 shadow-lg'
                  : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/20">
                  {prayer.name === 'Sunrise' ? (
                    <Sun className="h-6 w-6 text-orange-500" />
                  ) : (
                    <Moon className="h-6 w-6 text-indigo-600" />
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-800">{prayer.name}</h4>
                    <span className="text-sm text-gray-500">{prayer.arabic}</span>
                  </div>
                  <p className="text-lg font-mono text-gray-700">{prayer.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {prayer.current && (
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-700 text-sm font-medium rounded-full">
                    Current
                  </span>
                )}
                {prayer.completed ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Clock className="h-6 w-6 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>

        {user.currentStatus === 'period' && (
          <div className="mt-6 p-4 bg-red-50/50 rounded-xl border border-red-200/50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-medium text-red-800">Prayer Exemption</p>
                <p className="text-sm text-red-700 mt-1">
                  During menstruation, you are exempt from performing the five daily prayers. 
                  This is a mercy from Allah (SWT) and these prayers do not need to be made up later.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Qada Prayers */}
      {user.qadaPrayers > 0 && (
        <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 rounded-xl bg-orange-400/20">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Qada' Prayers to Make Up</h3>
          </div>

          <div className="space-y-4">
            {qadaPrayers.map((qada, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
                <div>
                  <h4 className="font-semibold text-gray-800">{qada.prayer} Prayer</h4>
                  <p className="text-sm text-gray-600">{qada.date}</p>
                  <p className="text-xs text-gray-500 mt-1">{qada.reason}</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 hover:from-green-400/30 hover:to-emerald-400/30 text-green-700 font-medium rounded-lg border border-green-300/50 transition-all duration-200">
                  Mark as Completed
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium text-blue-800">About Qada' Prayers</p>
                <p className="text-sm text-blue-700 mt-1">
                  These are prayers that were missed between the time you became clean and when you performed Ghusl. 
                  They should be made up as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PrayerTimes
