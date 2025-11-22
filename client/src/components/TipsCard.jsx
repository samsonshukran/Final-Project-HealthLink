import React from 'react'

const TipsCard = ({ title, tips, type = 'info', icon = '💡' }) => {
  const getStyles = () => {
    switch(type) {
      case 'danger':
        return {
          container: 'danger-zone',
          icon: '🔴',
          gradient: 'from-red-500 to-orange-500',
          iconBg: 'bg-red-500'
        }
      case 'warning':
        return {
          container: 'warning-zone',
          icon: '⚠️',
          gradient: 'from-yellow-500 to-orange-500',
          iconBg: 'bg-yellow-500'
        }
      case 'success':
        return {
          container: 'success-zone',
          icon: '✅',
          gradient: 'from-primary-500 to-green-500',
          iconBg: 'bg-primary-500'
        }
      default:
        return {
          container: 'info-zone',
          icon: icon,
          gradient: 'from-secondary-500 to-blue-500',
          iconBg: 'bg-secondary-500'
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`${styles.container} slide-up`}>
      <div className="flex items-start space-x-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${styles.gradient} rounded-xl flex items-center justify-center text-white text-lg flex-shrink-0 shadow-glow`}>
          {styles.icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-neutral-900 mb-4 font-display">{title}</h3>
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-3 text-neutral-700 text-lg">
                <div className={`w-2 h-2 rounded-full ${styles.iconBg} mt-2 flex-shrink-0`}></div>
                <span className="leading-relaxed">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TipsCard