import { useState } from 'react';
import { Settings, Palette, Bell, Shield, User } from 'lucide-react';
import AccountSettings from './AccountSettings';
import BettingParameters from './BettingParameters';
import RiskManagement from './RiskManagement';
import NotificationSettings from './NotificationSettings';
import AppearanceSettings from './AppearanceSettings';

const categories = [
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Privacy & Security', icon: Shield },
  { id: 'account', label: 'Account', icon: User },
  { id: 'general', label: 'General', icon: Settings },
];

export default function SettingsForm() {
  const [activeCategory, setActiveCategory] = useState('appearance');

  const renderContent = () => {
    switch (activeCategory) {
      case 'appearance':
        return <AppearanceSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <RiskManagement />;
      case 'account':
        return <AccountSettings />;
      case 'general':
        return <BettingParameters />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="flex items-center gap-2 overflow-x-auto pb-4 hide-scrollbar">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap transition-all
                transform hover:scale-[1.02] duration-300
                ${activeCategory === id 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'hover:bg-muted'}
              `}
              style={{
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom duration-500">
        {renderContent()}
      </div>
    </div>
  );
}