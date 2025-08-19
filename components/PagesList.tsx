import React from 'react';

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

interface PagesListProps {
  pages: Page[];
  instagramAccounts: InstagramAccount[];
  onSubscribeWebhooks: (pageId: string) => void;
}

const PagesList: React.FC<PagesListProps> = ({
  pages,
  instagramAccounts,
  onSubscribeWebhooks,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Connected Accounts</h2>
      
      {/* Facebook Pages */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Facebook Pages</h3>
        {pages.length === 0 ? (
          <p className="text-gray-500">No Facebook pages found</p>
        ) : (
          <div className="space-y-4">
            {pages.map((page) => (
              <div
                key={page.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{page.page_name}</h4>
                  <p className="text-sm text-gray-500">ID: {page.page_id}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      page.webhook_subscribed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {page.webhook_subscribed ? 'Webhooks Active' : 'Webhooks Inactive'}
                  </span>
                </div>
                <button
                  onClick={() => onSubscribeWebhooks(page.page_id)}
                  disabled={page.webhook_subscribed}
                  className={`px-4 py-2 rounded-md font-medium ${
                    page.webhook_subscribed
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {page.webhook_subscribed ? 'Subscribed' : 'Subscribe to Webhooks'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Instagram Accounts */}
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-4">Instagram Accounts</h3>
        {instagramAccounts.length === 0 ? (
          <p className="text-gray-500">No Instagram accounts found</p>
        ) : (
          <div className="space-y-4">
            {instagramAccounts.map((account) => (
              <div
                key={account.id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-medium text-gray-900">@{account.username}</h4>
                  <p className="text-sm text-gray-500">ID: {account.instagram_id}</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      account.webhook_subscribed
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {account.webhook_subscribed ? 'Webhooks Active' : 'Webhooks Inactive'}
                  </span>
                </div>
                <button
                  onClick={() => onSubscribeWebhooks(account.instagram_id)}
                  disabled={account.webhook_subscribed}
                  className={`px-4 py-2 rounded-md font-medium ${
                    account.webhook_subscribed
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {account.webhook_subscribed ? 'Subscribed' : 'Subscribe to Webhooks'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PagesList;