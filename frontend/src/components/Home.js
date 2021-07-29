import React from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import Navbar from './layout/Navbar'

export default function Home() {
    return (
        <div>
            <Navbar/>
        
        
        <section id="hero" class="d-flex align-items-center">

        <div class="container-fluid" data-aos="fade-up">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 pt-3 pt-lg-0 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <h1>Stock Market App</h1>
              <h2>CRUD operations on Stock Markets,Companies,Sectors,IPOs,Stock Prices.Charts, comparison and more.</h2>
              <br></br>
             
              <div><Link to="/signup" class="btn-get-started scrollto">Get Started</Link></div>
            </div>
            <div class="col-xl-4 col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-in" data-aos-delay="150">
              <img src="https://i.postimg.cc/Mpn5YbSB/hero-img.png" class="img-fluid animated" alt=""/>
            </div>
          </div>
        </div>
    
      </section>
      
      </div>
        
    )
}
