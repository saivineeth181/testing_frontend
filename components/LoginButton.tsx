import React, { useState, useEffect } from 'react';
import { initFacebookSDK, loginWithFacebook } from '../utils/facebook';
import { authAPI } from '../utils/api';
import { useRouter } from 'next/router';

const LoginButton: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    initFacebookSDK().then(() => {
      setSdkLoaded(true);
    });
  }, []);

  const handleFacebookLogin = async () => {
    if (!sdkLoaded) return;
    
    setLoading(true);
    try {
      const accessToken = await loginWithFacebook();
      console.log(accessToken)
      const response = await authAPI.facebookLogin(accessToken);
      
      if (response.data) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Social Media Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Connect your Facebook Pages and Instagram accounts
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          <button
            onClick={handleFacebookLogin}
            disabled={loading || !sdkLoaded}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </div>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </>
            )}
          </button>
          
          <div className="text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to grant permissions for managing your Facebook Pages and Instagram accounts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginButton;