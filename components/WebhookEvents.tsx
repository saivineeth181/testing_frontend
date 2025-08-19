import React from 'react';

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

interface WebhookEventsProps {
  events: WebhookEvent[];
}

const WebhookEvents: React.FC<WebhookEventsProps> = ({ events }) => {
  const formatEventType = (type: string) => {
    switch (type) {
      case 'message':
        return 'Message';
      case 'comment':
        return 'Comment';
      case 'live_comment':
        return 'Live Comment';
      default:
        return type;
    }
  };

  const getEventIcon = (type: string, platform: string) => {
    const baseClasses = "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium";
    
    if (platform === 'facebook') {
      return <div className={`${baseClasses} bg-blue-600`}>FB</div>;
    } else if (platform === 'instagram') {
      return <div className={`${baseClasses} bg-pink-600`}>IG</div>;
    }
    
    return <div className={`${baseClasses} bg-gray-600`}>?</div>;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
      
      {events.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <p className="text-gray-500">No webhook events yet</p>
          <p className="text-sm text-gray-400 mt-2">
            Subscribe to webhooks on your pages to see activity here
          </p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-3">
                {getEventIcon(event.event_type, event.platform)}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      {formatEventType(event.event_type)}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(event.created_at)}
                    </span>
                  </div>
                  
                  {(event.message_text || event.comment_text) && (
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {event.message_text || event.comment_text}
                    </p>
                  )}
                  
                  {event.thank_you_message && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        <span className="font-medium">Thank You Message:</span>
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        {event.thank_you_message.message}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebhookEvents;