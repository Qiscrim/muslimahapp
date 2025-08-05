import React, { useState } from 'react'
import { BookOpen, Search, ChevronRight, Heart, Droplets, Moon, Sun } from 'lucide-react'

const KnowledgeBase: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'haid', name: 'Haid (Menstruation)', icon: Droplets },
    { id: 'nifas', name: 'Nifas (Post-Natal)', icon: Heart },
    { id: 'istihadah', name: 'Istihadah (Irregular)', icon: Moon },
    { id: 'prayers', name: 'Prayer Guidance', icon: Sun }
  ]

  const articles = [
    {
      id: 1,
      title: 'Understanding Haid (Menstruation) in Islam',
      category: 'haid',
      excerpt: 'Learn about the Islamic rulings regarding menstruation, including prayer exemptions, fasting, and purification requirements.',
      readTime: '5 min read',
      tags: ['Basics', 'Fiqh', 'Purification']
    },
    {
      id: 2,
      title: 'When to Perform Ghusl After Menstruation',
      category: 'haid',
      excerpt: 'Detailed guidance on recognizing the end of menstruation and the proper method of performing Ghusl for purification.',
      readTime: '7 min read',
      tags: ['Ghusl', 'Purification', 'Practice']
    },
    {
      id: 3,
      title: 'Qada Prayers: What You Need to Know',
      category: 'prayers',
      excerpt: 'Understanding which prayers need to be made up and when, especially in relation to menstrual cycles.',
      readTime: '6 min read',
      tags: ['Qada', 'Prayers', 'Obligations']
    },
    {
      id: 4,
      title: 'Nifas: Post-Natal Bleeding Guidelines',
      category: 'nifas',
      excerpt: 'Comprehensive guide to post-natal bleeding, its duration, and related Islamic rulings for new mothers.',
      readTime: '8 min read',
      tags: ['Nifas', 'Motherhood', 'Purification']
    },
    {
      id: 5,
      title: 'Distinguishing Istihadah from Haid',
      category: 'istihadah',
      excerpt: 'Learn how to differentiate between irregular bleeding (Istihadah) and menstruation (Haid) according to Islamic teachings.',
      readTime: '10 min read',
      tags: ['Istihadah', 'Diagnosis', 'Fiqh']
    },
    {
      id: 6,
      title: 'Spiritual Practices During Menstruation',
      category: 'haid',
      excerpt: 'Discover meaningful ways to maintain spiritual connection during menstruation when prayer is not required.',
      readTime: '4 min read',
      tags: ['Spirituality', 'Dhikr', 'Connection']
    }
  ]

  const faqs = [
    {
      question: 'Can I read the Quran during menstruation?',
      answer: 'There are different scholarly opinions on this matter. Many scholars allow reading from memory or from a digital device without touching the Arabic text directly, while others are more restrictive. It\'s best to consult with a knowledgeable scholar for guidance.'
    },
    {
      question: 'What if I\'m not sure if my period has ended?',
      answer: 'Look for complete cessation of bleeding and the appearance of clear discharge (white discharge). If you\'re uncertain, wait until you\'re confident that menstruation has completely stopped before performing Ghusl.'
    },
    {
      question: 'Do I need to make up missed prayers during menstruation?',
      answer: 'No, prayers missed during menstruation do not need to be made up. This is a mercy from Allah (SWT). However, any prayers missed between becoming clean and performing Ghusl should be made up.'
    },
    {
      question: 'Can I fast during irregular bleeding (Istihadah)?',
      answer: 'Yes, if the bleeding is determined to be Istihadah (irregular bleeding) rather than Haid (menstruation), you should continue fasting and praying while maintaining extra cleanliness.'
    }
  ]

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 rounded-xl bg-emerald-400/20">
            <BookOpen className="h-6 w-6 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Knowledge Base</h1>
        </div>
        <p className="text-gray-600">
          Comprehensive Islamic guidance on menstruation, purification, and related topics based on authentic sources.
        </p>
      </div>

      {/* Search and Categories */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles, topics, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent placeholder-gray-500 text-gray-800"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-blue-400/30 text-blue-800 border border-blue-300/50'
                    : 'bg-white/10 text-gray-600 border border-white/20 hover:bg-white/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Articles */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Articles & Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="p-6 bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-200 cursor-pointer group">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {article.title}
                </h3>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-400/20 text-blue-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-gray-500">{article.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="p-4 bg-white/10 rounded-xl border border-white/20">
              <h3 className="font-medium text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 shadow-xl p-6">
        <div className="p-4 bg-yellow-50/50 rounded-xl border border-yellow-200/50">
          <h3 className="font-medium text-yellow-800 mb-2">Important Disclaimer</h3>
          <p className="text-sm text-yellow-700 leading-relaxed">
            The information provided here is for educational purposes and is based on general Islamic teachings. 
            For specific religious guidance, please consult with qualified Islamic scholars or your local imam. 
            Individual circumstances may require personalized advice.
          </p>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBase
