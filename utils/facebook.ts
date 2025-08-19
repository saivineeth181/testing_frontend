declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export const initFacebookSDK = (): Promise<void> => {
  return new Promise((resolve) => {
    // Load Facebook SDK
    if (document.getElementById('facebook-jssdk')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    document.head.appendChild(script);

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });
      resolve();
    };
  });
};

export const loginWithFacebook = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    window.FB.login((response: any) => {
      if (response.authResponse) {
        resolve(response.authResponse.accessToken);
      } else {
        reject(new Error('Facebook login failed'));
      }
    }, {
      scope: 'pages_manage_metadata,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_manage_comments,instagram_manage_messages'
    });
  });
};