import React from 'react';
import Hero from '../componet/hero';
import Navbar from '../componet/navbar';
import Product from '../componet/product';
import Footer from '../componet/footer';

const app = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Product />
      <Footer />
    </div>
  )
}

export default app