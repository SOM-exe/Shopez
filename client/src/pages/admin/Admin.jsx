import React, { useEffect, useState } from 'react'
import '../../styles/Admin.css'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

const Admin = () => {

  const navigate = useNavigate();

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(()=>{
    if(localStorage.getItem('userType') === 'admin'){
      navigate('/admin')
    }
  }, [localStorage])


  useEffect(()=>{
    fetchCountData();
  }, [])

  const fetchCountData = async() =>{
    await axios.get('http://localhost:6001/api/users/fetch-users').then(
      (response)=>{
        setUserCount(response.data.length - 1);
      }
    )
    await axios.get('http://localhost:6001/api/products/fetch-products').then(
      (response)=>{
        setProductCount(response.data.length);
      }
    )
    await axios.get('http://localhost:6001/api/orders/fetch-orders').then(
      (response)=>{
        setOrdersCount(response.data.length);
      }
    )

  }

  const [banner, setBanner] = useState('');
  const updateBanner = async() =>{
    await axios.post('http://localhost:6001/update-banner', {banner}).then(
      (response)=>{
        alert("Banner updated");
        setBanner('');
      }
    )
  }

  return (
    <div className="admin-page">
      
      <div className="admin-dashboard-header">
        <h1>Admin Dashboard</h1>
        <p>Manage your store, products, and orders</p>
      </div>

      <div className="admin-stats-grid">
        
        <div className="admin-home-card">
          <div className="admin-card-header">
            <div className="admin-card-icon users">👥</div>
          </div>
          <div className="admin-card-content">
            <h5>Total Users</h5>
            <p className="admin-card-value">{userCount}</p>
            <button className="admin-card-button" onClick={()=> navigate('/all-users')}>
              View All Users
            </button>
          </div>
        </div>

        <div className="admin-home-card">
          <div className="admin-card-header">
            <div className="admin-card-icon products">📦</div>
          </div>
          <div className="admin-card-content">
            <h5>All Products</h5>
            <p className="admin-card-value">{productCount}</p>
            <button className="admin-card-button products-btn" onClick={()=> navigate('/all-products')}>
              View All Products
            </button>
          </div>
        </div>

        <div className="admin-home-card">
          <div className="admin-card-header">
            <div className="admin-card-icon orders">🛍️</div>
          </div>
          <div className="admin-card-content">
            <h5>All Orders</h5>
            <p className="admin-card-value">{ordersCount}</p>
            <button className="admin-card-button orders-btn" onClick={()=> navigate('/all-orders')}>
              View All Orders
            </button>
          </div>
        </div>

        <div className="admin-home-card">
          <div className="admin-card-header">
            <div className="admin-card-icon add">➕</div>
          </div>
          <div className="admin-card-content">
            <h5>Add Product</h5>
            <p className="admin-card-value">New</p>
            <button className="admin-card-button add-btn" onClick={()=> navigate('/new-product')}>
              Add Product Now
            </button>
          </div>
        </div>

      </div>

      <div className="admin-banner-section">
        <div className="admin-banner-header">
          <div className="admin-banner-icon">🎨</div>
          <h5>Update Banner</h5>
        </div>
        <div className="admin-banner-input">
          <div className="form-floating">
            <input 
              type="text" 
              className="form-control" 
              id="floatingURLInput" 
              value={banner} 
              onChange={(e)=>setBanner(e.target.value)}
              placeholder="Enter banner URL"
            />
            <label htmlFor="floatingURLInput">Banner URL</label>
          </div>
          <button className="admin-banner-button" onClick={updateBanner}>
            Update Banner
          </button>
        </div>
      </div>

    </div>
  )
}

export default Admin