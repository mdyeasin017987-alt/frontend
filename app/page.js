import React from 'react';
import Hero from '../componet/hero';
import Feature from '../componet/feature';
import Product from '../componet/product';
import DeliveryInfo from '@/componet/deliveryinfo';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Feature />
      <Product />
    </div>
  );
};

export default HomePage;