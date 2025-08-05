import React, { useState } from 'react'
import { Settings, MapPin, Bell, Moon, Sun, User, Download, Shield } from 'lucide-react'

interface User {
  name: string
  currentStatus: 'period' | 'clean'
  currentDay: number
  nextPeriodDate: Date
  qadaPrayers: number
  location: string
}

interface SettingsPanelProps {
  user: User
  setUser: (user: User) => void
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ user, setUser }) => {
  const [notifications, setNotifications] = useState({
    periodReminder: true,
    prayerTimes: true,
    qadaReminder: true,
    cycleInsights: false
  })

  const [prayerSettings, setPrayerSettings] = useState({
    calculationMethod: 'ISNA',
    madhab: 'Hanafi',
    adjustments: {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0
    }
  })

  const calculationMethods = [
    { value: 'ISNA', label: 'Islamic Society of North America (ISNA)' },
    { value: 'MWL', label: 'Muslim World League' },
    { value: 'Makkah', label: 'Umm Al-Qura University, Makkah' },
    { value: 'Egypt', label: 'Egyptian General Authority of Survey' },
    { value: 'Tehran', label: 'Institute of Geophysics, University of Tehran' }
  ]

  const madhabs = [
    { value: 'Hanafi', label: 'Hanafi' },
    { value: 'Shafi', label: 'Shafi\'i' },
    { value: 'Maliki', label: 'Maliki' },
    { value: 'Hanbali', label: 'Hanbali' }
  ]

  return (
    <div className="space-y-8">
      {/* Profile Settings */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-blue-400/20">
            <User className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Profile Settings</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={user.location}
                onChange={(e) => setUser({ ...user, location: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
                placeholder="Enter your city or location"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Prayer Time Settings */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-yellow-400/20">
            <Sun className="h-6 w-6 text-yellow-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Prayer Time Settings</h3>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Calculation Method</label>
            <select
              value={prayerSettings.calculationMethod}
              onChange={(e) => setPrayerSettings({ ...prayerSettings, calculationMethod: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
            >
              {calculationMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Madhab (for Asr calculation)</label>
            <select
              value={prayerSettings.madhab}
              onChange={(e) => setPrayerSettings({ ...prayerSettings, madhab: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent text-gray-800"
            >
              {madhabs.map((madhab) => (
                <option key={madhab.value} value={madhab.value}>
                  {madhab.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Prayer Time Adjustments (minutes)</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(prayerSettings.adjustments).map(([prayer, adjustment]) => (
                <div key={prayer}>
                  <label className="block text-xs text-gray-600 mb-1 capitalize">{prayer}</label>
                  <input
                    type="number"
                    value={adjustment}
                    onChange={(e) => setPrayerSettings({
                      ...prayerSettings,
                      adjustments: {
                        ...prayerSettings.adjustments,
                        [prayer]: parseInt(e.target.value) || 0
                      }
                    })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-800 text-sm"
                    min="-30"
                    max="30"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-purple-400/20">
            <Bell className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Notification Settings</h3>
        </div>

        <div className="space-y-4">
          {Object.entries(notifications).map(([key, enabled]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20">
              <div>
                <h4 className="font-medium text-gray-800 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'periodReminder' && 'Get notified about upcoming periods'}
                  {key === 'prayerTimes' && 'Receive prayer time notifications'}
                  {key === 'qadaReminder' && 'Reminders for missed prayers to make up'}
                  {key === 'cycleInsights' && 'Monthly cycle insights and health tips'}
                </p>
              </div>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !enabled })}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  enabled ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-green-400/20">
            <Shield className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Data & Privacy</h3>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200">
            <div className="flex items-center space-x-3">
              <Download className="h-5 w-5 text-blue-600" />
              <div className="text-left">
                <h4 className="font-medium text-gray-800">Export Data</h4>
                <p className="text-sm text-gray-600">Download your cycle data and history</p>
              </div>
            </div>
          </button>

          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200/50">
            <h4 className="font-medium text-blue-800 mb-2">Privacy Notice</h4>
            <p className="text-sm text-blue-700 leading-relaxed">
              Your personal data is stored locally on your device and is never shared with third parties. 
              We respect your privacy and follow Islamic principles of confidentiality and trust.
            </p>
          </div>
        </div>
      </div>

      {/* App Information */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 rounded-xl bg-gray-400/20">
            <Settings className="h-6 w-6 text-gray-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">App Information</h3>
        </div>

        <div className="space-y-4 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-medium">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Last Updated</span>
            <span className="font-medium">March 2024</span>
          </div>
          <div className="pt-4 border-t border-white/20">
            <p className="text-center text-xs">
              Built with love for the Muslim community 💜
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPanel
