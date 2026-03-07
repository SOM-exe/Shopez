import React, { useEffect, useState } from 'react'
import '../../styles/NewProducts.css'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const NewProduct = () => {
 
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productMainImg, setProductMainImg] = useState('');
  const [productCarouselImg1, setProductCarouselImg1] = useState('');
  const [productCarouselImg2, setProductCarouselImg2] = useState('');
  const [productCarouselImg3, setProductCarouselImg3] = useState('');
  const [productSizes, setProductSizes] = useState([]);
  const [productGender, setProductGender] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productNewCategory, setProductNewCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);


  const [AvailableCategories, setAvailableCategories] = useState([]);


  useEffect(()=>{
    fetchCategories();
  },[])
  const fetchCategories = async () =>{
    await axios.get('http://localhost:6001/api/products/fetch-categories').then(
      (response)=>{
        setAvailableCategories(response.data);
      }
    )
  }


  const handleCheckBox = (e) =>{
    const value = e.target.value;
    if(e.target.checked){
        setProductSizes([...productSizes, value]);
    }else{
        setProductSizes(productSizes.filter(size=> size !== value));
    }
  }

  const navigate = useNavigate();


  const handleNewProduct = async() =>{
    await axios.post('http://localhost:6001/api/products/add-new-product', {productName, productDescription, productMainImg, productCarousel: [productCarouselImg1, productCarouselImg2, productCarouselImg3], productSizes, productGender, productCategory, productNewCategory, productPrice, productDiscount}).then(
      (response)=>{
        alert("product added");
        setProductName('');
        setProductDescription('');
        setProductMainImg('');
        setProductCarouselImg1('');
        setProductCarouselImg2('');
        setProductCarouselImg3('');
        setProductSizes([]);
        setProductGender('');
        setProductCategory('');
        setProductNewCategory('');
        setProductPrice(0);
        setProductDiscount(0);

        navigate('/all-products');
      }
    )
  }


  return (
    <div className="new-product-page">
        <div className="new-product-container">
          
          <div className="new-product-header">
            <h3>Add New Product</h3>
            <p>Fill in the details to add a new product to your store</p>
          </div>

          <div className="new-product-body">

            <div className="form-row two-cols">
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input 
                  type="text" 
                  id="productName" 
                  placeholder="Enter product name"
                  value={productName} 
                  onChange={(e)=>setProductName(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDescription">Product Description</label>
                <input 
                  type="text" 
                  id="productDescription" 
                  placeholder="Enter product description"
                  value={productDescription} 
                  onChange={(e)=>setProductDescription(e.target.value)} 
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="productMainImg">Thumbnail Image URL</label>
              <input 
                type="text" 
                id="productMainImg" 
                placeholder="Enter main product image URL"
                value={productMainImg} 
                onChange={(e)=>setProductMainImg(e.target.value)}
              />
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="carouselImg1">Additional Image 1</label>
                <input 
                  type="text" 
                  id="carouselImg1" 
                  placeholder="Image URL"
                  value={productCarouselImg1} 
                  onChange={(e)=>setProductCarouselImg1(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carouselImg2">Additional Image 2</label>
                <input 
                  type="text" 
                  id="carouselImg2" 
                  placeholder="Image URL"
                  value={productCarouselImg2} 
                  onChange={(e)=>setProductCarouselImg2(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="carouselImg3">Additional Image 3</label>
                <input 
                  type="text" 
                  id="carouselImg3" 
                  placeholder="Image URL"
                  value={productCarouselImg3} 
                  onChange={(e)=>setProductCarouselImg3(e.target.value)} 
                />
              </div>
            </div>

            <div className="form-section">
              <h4>Available Sizes</h4>
              <div className="checkbox-group">
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    value="S" 
                    checked={productSizes.includes('S')} 
                    onChange={handleCheckBox} 
                    id="sizeS" 
                  />
                  <label htmlFor="sizeS">Small (S)</label>
                </div>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    value="M" 
                    checked={productSizes.includes('M')} 
                    onChange={handleCheckBox} 
                    id="sizeM" 
                  />
                  <label htmlFor="sizeM">Medium (M)</label>
                </div>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    value="L" 
                    checked={productSizes.includes('L')} 
                    onChange={handleCheckBox} 
                    id="sizeL" 
                  />
                  <label htmlFor="sizeL">Large (L)</label>
                </div>
                <div className="form-check">
                  <input 
                    type="checkbox" 
                    value="XL" 
                    checked={productSizes.includes('XL')} 
                    onChange={handleCheckBox} 
                    id="sizeXL" 
                  />
                  <label htmlFor="sizeXL">Extra Large (XL)</label>
                </div>
              </div>
            </div>

            <div className="form-section">
              <h4>Gender</h4>
              <div className="radio-group">
                <div className="form-check">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Men" 
                    id="genderMen" 
                    onChange={(e)=> setProductGender(e.target.value)} 
                  />
                  <label htmlFor="genderMen">Men</label>
                </div>
                <div className="form-check">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Women" 
                    id="genderWomen" 
                    onChange={(e)=> setProductGender(e.target.value)}
                  />
                  <label htmlFor="genderWomen">Women</label>
                </div>
                <div className="form-check">
                  <input 
                    type="radio" 
                    name="productGender" 
                    value="Unisex" 
                    id="genderUnisex" 
                    onChange={(e)=> setProductGender(e.target.value)}
                  />
                  <label htmlFor="genderUnisex">Unisex</label>
                </div>
              </div>
            </div>

            <div className="form-row three-cols">
              <div className="form-group">
                <label htmlFor="productCategory">Category</label>
                <select 
                  id="productCategory" 
                  value={productCategory} 
                  onChange={(e)=>setProductCategory(e.target.value)}
                >
                  <option value="">Choose category</option>
                  {AvailableCategories.map((category)=>{
                    return(
                        <option key={category} value={category}>{category}</option>
                    )
                  })}
                  <option value="new category">+ New category</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price (₹)</label>
                <input 
                  type="number" 
                  id="productPrice" 
                  placeholder="0"
                  value={productPrice} 
                  onChange={(e)=>setProductPrice(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="productDiscount">Discount (%)</label>
                <input 
                  type="number" 
                  id="productDiscount" 
                  placeholder="0"
                  value={productDiscount} 
                  onChange={(e)=>setProductDiscount(e.target.value)}
                />
              </div>
            </div>

            {productCategory === 'new category' && (
              <div className="form-group">
                <label htmlFor="newCategory">New Category Name</label>
                <input 
                  type="text" 
                  id="newCategory" 
                  placeholder="Enter new category name"
                  value={productNewCategory} 
                  onChange={(e)=>setProductNewCategory(e.target.value)}
                />
              </div>
            )}

          </div>

          <div className="form-actions">
            <button className='btn-submit' onClick={handleNewProduct}>
              Add Product
            </button>
            <button className='btn-cancel' onClick={()=> navigate('/all-products')}>
              Cancel
            </button>
          </div>
          
        </div>
    </div>
  )
}

export default NewProduct