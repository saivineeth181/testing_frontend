import React from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <Layout title="Dashboard - Social Media Dashboard">
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;