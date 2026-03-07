import React, { useEffect, useState } from 'react'
import '../styles/Home.css'
import Products from '../components/Products'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate();
  const [bannerImg, setBannerImg] = useState();

  useEffect(() => {
    fetchBanner();
  }, [])

  const fetchBanner = async () => {
    try {
      const response = await axios.get("http://localhost:6001/api/banners");
      setBannerImg(response.data);
    } catch (err) {
      console.error("Failed to fetch banner:", err.response?.data?.message || err.message);
    }
  };

  const categories = [
    {
      name: 'Fashion',
      route: '/category/Fashion',
      image: 'https://tse3.mm.bing.net/th/id/OIP.ORH_mwC_R1rP2xGViNy_lwHaE8?pid=Api&P=0&h=180',
      icon: '👗'
    },
    {
      name: 'Electronics',
      route: '/category/Electronics',
      image: 'https://5.imimg.com/data5/ANDROID/Default/2023/1/SE/QC/NG/63182719/product-jpeg-500x500.jpg',
      icon: '💻'
    },
    {
      name: 'Mobiles',
      route: '/category/mobiles',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jUW7v1WFJL9Ylax9a4vazyKXwG-ktSinI4Rd7qi7MkhMr79UlIyyrNkbiK0Cz5u6WYw&usqp=CAU',
      icon: '📱'
    },
    {
      name: 'Groceries',
      route: '/category/Groceries',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXbpV_yQ_zCtZt_1kNebjvFqXvdDnLuuJPsQ&usqp=CAU',
      icon: '🛒'
    },
    {
      name: 'Sports',
      route: '/category/Sports-Equipment',
      image: 'https://a.storyblok.com/f/112937/568x464/82f66c3a21/all_the_english-_football_terms_you_need_to_know_blog-hero-low.jpg/m/620x0/filters:quality(70)/',
      icon: '⚽'
    }
  ];

  return (
    <div className="HomePage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Welcome to Our Store</h1>
          <p className="hero-subtitle">Discover amazing products at unbeatable prices</p>
          <button className="hero-cta" onClick={() => navigate('/category/all')}>
            Shop Now
          </button>
        </div>
        {bannerImg && (
          <div className="hero-banner">
            <img src={bannerImg} alt="Featured Banner" />
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Explore our wide range of products</p>
        </div>
        
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="category-card" 
              onClick={() => navigate(category.route)}
            >
              <div className="category-image-wrapper">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay">
                  <span className="category-icon">{category.icon}</span>
                </div>
              </div>
              <div className="category-info">
                <h3>{category.name}</h3>
                <span className="category-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Check out our latest collection</p>
        </div>
        <Products category='all' />
      </section>

      <Footer />
    </div>
  )
}

export default Home