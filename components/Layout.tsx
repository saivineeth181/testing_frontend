import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Social Media Dashboard' }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear session and redirect
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showNavigation = router.pathname !== '/';

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Social Media Dashboard for Facebook and Instagram" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {showNavigation && (
        <nav className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-semibold text-gray-900">
                  Social Dashboard
                </h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === '/dashboard'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Dashboard
                </button>
                
                <button
                  onClick={() => router.push('/settings')}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    router.pathname === '/settings'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Settings
                </button>
                
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className={showNavigation ? 'min-h-screen bg-gray-50' : ''}>
        {children}
      </main>
    </>
  );
};

export default Layout;