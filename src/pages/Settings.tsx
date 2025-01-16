import React from 'react';
import PageHeader from '../components/ui/PageHeader';
import SettingsForm from '../components/settings/SettingsForm';

export default function Settings() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative mb-8">
        <PageHeader 
          title="Settings"
          description="Configure your trading preferences"
        />
        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
      </div>
      
      <SettingsForm />
    </div>
  );
}