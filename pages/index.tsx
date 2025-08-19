import React from 'react';
import Layout from '../components/Layout';
import LoginButton from '../components/LoginButton';

const HomePage: React.FC = () => {
  return (
    <Layout title="Login - Social Media Dashboard">
      <LoginButton />
    </Layout>
  );
};

export default HomePage;