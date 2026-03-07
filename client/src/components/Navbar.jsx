import React, { useContext, useEffect, useState } from 'react'
import {BsCart3, BsPersonCircle} from 'react-icons/bs'
import {FcSearch} from 'react-icons/fc'
import '../styles/Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { GeneralContext } from '../context/GeneralContext'
import {ImCancelCircle} from 'react-icons/im'
import axios from 'axios'

const Navbar = () => {


  const navigate = useNavigate();

  const usertype = localStorage.getItem('userType');
  const username = localStorage.getItem('username');

  const {cartCount, logout} = useContext(GeneralContext);

  const [productSearch, setProductSearch] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const [noResult, setNoResult] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    fetchData();
  }, [])

  const fetchData = async() =>{

    await axios.get('http://localhost:6001/api/products/fetch-categories').then(
      (response)=>{
        setCategories(response.data);
      }
    )
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setProductSearch(value);
    
    if (value.trim() === '') {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    } else {
      const filtered = categories.filter(category => 
        category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    }
  };

  const handleSearch = (searchTerm = productSearch) =>{
    const term = searchTerm || productSearch;
    if (categories.includes(term)){
      navigate(`/category/${term}`);
      setShowSuggestions(false);
      setProductSearch('');
    }else{
      setNoResult(true);
      setShowSuggestions(false);
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setProductSearch(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (

    <>
      {/* user navbar */}

      {!usertype ?

          <div className="navbar">
          <h3 onClick={()=> navigate('')}>ShopEZ</h3>
          <div className="nav-content">
            <div className="nav-search">
              <input 
                type="text" 
                name="nav-search" 
                id="nav-search" 
                placeholder='Search Electronics, Fashion, mobiles, etc.,' 
                value={productSearch}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                onFocus={() => productSearch && setShowSuggestions(true)}
              />
              <FcSearch className="nav-search-icon" onClick={() => handleSearch()} />
              
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className='search-suggestions'>
                  {filteredSuggestions.map((suggestion, index) => (
                    <div 
                      key={index} 
                      className='suggestion-item'
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <FcSearch className='suggestion-icon' />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
              
              {
                noResult === true ?
                  <div className='search-result-data'>no items found.... try searching for Electronics, mobiles, Groceries, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                :
                ""
              }
            </div>


            <button className='btn' onClick={()=> navigate('/auth')}>Login</button>

          </div>
          </div>

        : <>

            {usertype === 'customer' ?
            
                <div className="navbar">
                  <h3 onClick={()=> navigate('')}>ShopEZ</h3>
                  <div className="nav-content">
                    <div className="nav-search">
                      <input 
                        type="text" 
                        name="nav-search" 
                        id="nav-search" 
                        placeholder='Search Electronics, Fashion, mobiles, etc.,' 
                        value={productSearch}
                        onChange={handleSearchChange}
                        onKeyPress={handleKeyPress}
                        onFocus={() => productSearch && setShowSuggestions(true)}
                      />
                      <FcSearch className="nav-search-icon" onClick={() => handleSearch()} />
                      
                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className='search-suggestions'>
                          {filteredSuggestions.map((suggestion, index) => (
                            <div 
                              key={index} 
                              className='suggestion-item'
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              <FcSearch className='suggestion-icon' />
                              <span>{suggestion}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {
                        noResult === true ?
                          <div className='search-result-data'>no items found.... try searching for Electronics, mobiles, Groceries, etc., <ImCancelCircle className='search-result-data-close-btn' onClick={()=> setNoResult(false)}  /></div>
                        :
                        ""
                      }
                    </div>

                    <div className='nav-content-icons' >
                      <div className="nav-profile" onClick={()=> navigate('/profile')}>
                        <BsPersonCircle className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Profile" />
                        <p>{username}</p>
                      </div>
                      <div className="nav-cart" onClick={()=> navigate('/cart')}>
                        <BsCart3 className='navbar-icons' data-bs-toggle="tooltip" data-bs-placement="bottom" title="Cart" />
                        <div className="cart-count">{cartCount}</div>
                      </div>
                    </div>
                  </div>
                </div>

              :

              <div className="navbar-admin">
                <h3 onClick={()=> navigate('/admin')}>ShopEZ <span>(admin)</span></h3>
                
                <ul>
                  <li onClick={()=> navigate('/admin')}>Home</li>
                  <li onClick={()=> navigate('/all-users')}>Users</li>
                  <li onClick={()=> navigate('/all-orders')}>Orders</li>
                  <li onClick={()=> navigate('/all-products')}>Products</li>
                  <li onClick={()=> navigate('/new-product')}>New Product</li>
                  <li onClick={logout}>Logout</li>
                </ul>
              </div>

            }
        
          </>

          
      }
        
    </>
  )
}

export default Navbar