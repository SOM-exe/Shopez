import React, { useEffect, useState } from 'react'
import '../../styles/AllProducts.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {

    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [visibleProducts, setVisibleProducts] = useState([]);

    useEffect(()=>{
        fetchData();
      }, [])
    
      const fetchData = async() =>{

        await axios.get('http://localhost:6001/api/products/fetch-products').then(
          (response)=>{
            setProducts(response.data);
            setVisibleProducts(response.data);
          }
        )
        await axios.get('http://localhost:6001/api/products/fetch-categories').then(
          (response)=>{
            setCategories(response.data);
          }
        )
      }

      const [sortFilter, setSortFilter] = useState('popularity');
      const [categoryFilter, setCategoryFilter] = useState([]);
      const [genderFilter, setGenderFilter] = useState([]);


      const handleCategoryCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setCategoryFilter([...categoryFilter, value]);
        }else{
            setCategoryFilter(categoryFilter.filter(size=> size !== value));
        }
      }

      const handleGenderCheckBox = (e) =>{
        const value = e.target.value;
        if(e.target.checked){
            setGenderFilter([...genderFilter, value]);
        }else{
            setGenderFilter(genderFilter.filter(size=> size !== value));
        }
      }

      const handleSortFilterChange = (e) =>{
        const value = e.target.value;
        setSortFilter(value);
        if(value === 'low-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  a.price - b.price))
        } else if (value === 'high-price'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.price - a.price))
        }else if (value === 'discount'){
            setVisibleProducts(visibleProducts.sort((a,b)=>  b.discount - a.discount))
        }
      }
    
      useEffect(()=>{
        if (categoryFilter.length > 0 && genderFilter.length > 0){
            setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category) && genderFilter.includes(product.gender) ));
        }else if(categoryFilter.length === 0 && genderFilter.length > 0){
            setVisibleProducts(products.filter(product=> genderFilter.includes(product.gender) ));
        } else if(categoryFilter.length > 0 && genderFilter.length === 0){
            setVisibleProducts(products.filter(product=> categoryFilter.includes(product.category)));
        }else{
            setVisibleProducts(products);
        }
      }, [categoryFilter, genderFilter])


  return (
    <div className="all-products-page">
        <div className="all-products-container">
        
        <div className="all-products-filter">
            <h4>Filters</h4>
            <div className="all-product-filters-body">

                <div className="all-product-filter-section">
                    <h6>Sort By</h6>
                    <div className="all-product-sub-filter-body">

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortFilter"  id="filter-sort-radio1" value="popularity" checked={sortFilter === 'popularity'} onChange={handleSortFilterChange} />
                            <label className="form-check-label" htmlFor="filter-sort-radio1" >
                                Popularity
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortFilter" id="filter-sort-radio2" value="low-price" checked={sortFilter === 'low-price'} onChange={handleSortFilterChange}  />
                            <label className="form-check-label" htmlFor="filter-sort-radio2">
                                Price (low to high)
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortFilter" id="filter-sort-radio3" value="high-price" checked={sortFilter === 'high-price'} onChange={handleSortFilterChange}  />
                            <label className="form-check-label" htmlFor="filter-sort-radio3">
                                Price (high to low)
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="sortFilter" id="filter-sort-radio4" value="discount" checked={sortFilter === 'discount'} onChange={handleSortFilterChange}  />
                            <label className="form-check-label" htmlFor="filter-sort-radio4">
                                Discount
                            </label>
                        </div>

                    </div>
                </div>
                
                <div className="all-product-filter-section">
                    <h6>Categories</h6>
                    <div className="all-product-sub-filter-body">
                        
                        {categories.map((category)=>{
                            return(
                                <div className="form-check" key={category}>
                                    <input className="form-check-input" type="checkbox" value={category} id={'productCategory'+ category} checked={categoryFilter.includes(category)} onChange={handleCategoryCheckBox} />
                                    <label className="form-check-label" htmlFor={'productCategory'+ category}>
                                        {category}
                                    </label>
                                </div>
                            )
                        })}
 
                    </div>
                </div>
                
                <div className="all-product-filter-section">
                    <h6>Gender</h6>
                    <div className="all-product-sub-filter-body">
                        
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Men" id="filter-gender-check-1" checked={genderFilter.includes('Men')} onChange={handleGenderCheckBox} />
                            <label className="form-check-label" htmlFor="filter-gender-check-1">
                                Men
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Women" id="filter-gender-check-2" checked={genderFilter.includes('Women')} onChange={handleGenderCheckBox}  />
                            <label className="form-check-label" htmlFor="filter-gender-check-2">
                                Women
                            </label>
                        </div>

                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Unisex" id="filter-gender-check-3" checked={genderFilter.includes('Unisex')} onChange={handleGenderCheckBox}  />
                            <label className="form-check-label" htmlFor="filter-gender-check-3">
                                Unisex
                            </label>
                        </div>

                    </div>
                </div>
                
            </div>
        </div>


        <div className="all-products-body">
            <div className="all-products-header">
                <h3>All Products</h3>
                <div className="products-count-badge">
                    {visibleProducts.length} {visibleProducts.length === 1 ? 'Product' : 'Products'}
                </div>
            </div>
            
            <div className="all-products">

                {visibleProducts.length === 0 ? (
                    <div className="empty-products">
                        <div className="empty-products-icon">📦</div>
                        <p>No products found</p>
                    </div>
                ) : (
                    visibleProducts.map((product)=>{
                        return(
                            <div className="all-product" key={product._id}>
                                <div className="product-image-wrapper">
                                    <img src={product.mainImg} alt={product.title} />
                                    {product.discount > 0 && (
                                        <div className="product-discount-badge">
                                            {product.discount}% OFF
                                        </div>
                                    )}
                                </div>
                                <div className="all-product-data">
                                    <h6>{product.title}</h6>
                                    <p>{product.description.slice(0,50) + '...'}</p>
                                    <div className="product-price-section">
                                        <span className="product-current-price">
                                            &#8377;{parseInt(product.price - (product.price * product.discount)/100)}
                                        </span>
                                        {product.discount > 0 && (
                                            <>
                                                <span className="product-original-price">
                                                    &#8377;{product.price}
                                                </span>
                                                <span className="product-discount-text">
                                                    ({product.discount}% off)
                                                </span>
                                            </>
                                        )}
                                    </div>
                                    <button className="product-update-btn" onClick={()=> navigate(`/update-product/${product._id}`)}>
                                        Update Product
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}

            </div>
        </div>
    </div>
    </div>
  )
}

export default AllProducts