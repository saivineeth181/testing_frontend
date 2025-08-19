import React, { useEffect, useState } from 'react';
import { pagesAPI, webhooksAPI } from '../utils/api';
import PagesList from './PagesList';
import WebhookEvents from './WebhookEvents';

interface Page {
  id: string;
  page_id: string;
  page_name: string;
  webhook_subscribed: boolean;
}

interface InstagramAccount {
  id: string;
  instagram_id: string;
  username: string;
  webhook_subscribed: boolean;
}

interface WebhookEvent {
  id: string;
  event_type: string;
  platform: string;
  message_text?: string;
  comment_text?: string;
  created_at: string;
  thank_you_message?: {
    message: string;
  };
}

const Dashboard: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const [instagramAccounts, setInstagramAccounts] = useState<InstagramAccount[]>([]);
  const [webhookEvents, setWebhookEvents] = useState<WebhookEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    
    // Poll for new webhook events every 5 seconds
    const interval = setInterval(loadWebhookEvents, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadPages(), loadWebhookEvents()]);
    } catch (err) {
      setError('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async () => {
    try {
      const response = await pagesAPI.getUserPages();
      setPages(response.data.pages || []);
      setInstagramAccounts(response.data.instagram_accounts || []);
    } catch (err) {
      console.error('Failed to load pages:', err);
    }
  };

  const loadWebhookEvents = async () => {
    try {
      const response = await webhooksAPI.getEvents();
      setWebhookEvents(response.data);
    } catch (err) {
      console.error('Failed to load webhook events:', err);
    }
  };

  const handleSubscribeWebhooks = async (pageId: string) => {
    try {
      await pagesAPI.subscribeWebhooks(pageId);
      await loadPages(); // Reload to update subscription status
    } catch (err) {
      setError('Failed to subscribe to webhooks');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Social Media Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PagesList
            pages={pages}
            instagramAccounts={instagramAccounts}
            onSubscribeWebhooks={handleSubscribeWebhooks}
          />
        </div>
        
        <div>
          <WebhookEvents events={webhookEvents} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;