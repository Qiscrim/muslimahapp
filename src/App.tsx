import React, { useState } from 'react'
import { Calendar, Moon, Sun, Clock, BookOpen, Settings, Heart, Droplets } from 'lucide-react'
import Dashboard from './components/Dashboard'
import PrayerTimes from './components/PrayerTimes'
import CycleHistory from './components/CycleHistory'
import KnowledgeBase from './components/KnowledgeBase'
import SettingsPanel from './components/SettingsPanel'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [user, setUser] = useState({
    name: 'Aisha',
    currentStatus: 'clean', // 'period' | 'clean'
    currentDay: 0,
    nextPeriodDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    qadaPrayers: 2,
    location: 'New York, NY'
  })

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: Calendar },
    { id: 'prayers', label: 'Prayer Times', icon: Sun },
    { id: 'history', label: 'Cycle History', icon: Moon },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} setUser={setUser} />
      case 'prayers':
        return <PrayerTimes user={user} />
      case 'history':
        return <CycleHistory />
      case 'knowledge':
        return <KnowledgeBase />
      case 'settings':
        return <SettingsPanel user={user} setUser={setUser} />
      default:
        return <Dashboard user={user} setUser={setUser} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-200/20 to-blue-200/20"></div>
        <div 
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0f7fa' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-r from-pink-400/20 to-purple-400/20 backdrop-blur-sm border border-white/20">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-800">Muslimah Tracker</h1>
                  <p className="text-sm text-gray-600">Peace & Guidance</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">As-salamu alaykum, {user.name}</p>
                  <p className="text-xs text-gray-600">{user.location}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-medium text-sm">{user.name.charAt(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-64">
              <nav className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
                <div className="space-y-2">
                  {navigation.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                          activeTab === item.id
                            ? 'bg-white/20 text-gray-800 shadow-lg border border-white/30'
                            : 'text-gray-600 hover:bg-white/10 hover:text-gray-800'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    )
                  })}
                </div>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
