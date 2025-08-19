import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { pagesAPI } from '../utils/api';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notificationsEnabled: true,
    autoThankYou: true,
    webhookRetries: 3,
  });

  const handleSettingChange = (key: string, value: boolean | number) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const saveSettings = async () => {
    try {
      // Implement settings save API call
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Failed to save settings');
    }
  };

  return (
    <Layout title="Settings - Social Media Dashboard">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Webhook Configuration</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Enable Notifications
                </label>
                <p className="text-sm text-gray-500">
                  Receive real-time notifications for webhook events
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => handleSettingChange('notificationsEnabled', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">
                  Auto Thank You Messages
                </label>
                <p className="text-sm text-gray-500">
                  Automatically generate thank you messages for interactions
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoThankYou}
                onChange={(e) => handleSettingChange('autoThankYou', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Webhook Retry Attempts
              </label>
              <select
                value={settings.webhookRetries}
                onChange={(e) => handleSettingChange('webhookRetries', parseInt(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={1}>1</option>
                <option value={3}>3</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={saveSettings}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;