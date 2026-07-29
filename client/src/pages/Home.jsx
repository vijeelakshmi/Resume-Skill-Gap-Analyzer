import React from 'react';
import Hero from '../components/common/Hero';
import FeatureHighlights from '../components/common/FeatureHighlights';
import Dashboard from '../components/dashboard/Dashboard';

const Home = () => {
  return (
    <>
      <Hero />
      <FeatureHighlights />
      <Dashboard />
    </>
  );
};

export default Home;