import React, { useContext, useEffect, useState } from 'react'
import '../../styles/Profile.css'
import { GeneralContext } from '../../context/GeneralContext'
import axios from 'axios';
 
const Profile = () => {

  const {logout} = useContext(GeneralContext);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const [orders, setOrders] = useState([]);


  useEffect(()=>{
    fetchOrders();
  },[])

  const fetchOrders = async () =>{
    await axios.get(`http://localhost:6001/api/orders/fetch-orders`).then(
      (response)=>{
        setOrders(response.data.reverse());
      }
    )
  }


const cancelOrder = async (orderId) => {
  if (!orderId) {
    alert("Order ID is required");
    return;
  }

  try {
    const { data } = await axios.put(
      "http://localhost:6001/api/orders/cancel-order",
      { orderId }
    );

    console.log("Order cancelled:", data);
    alert("Order cancelled successfully!");

    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: "Cancelled" } : order
      )
    );

  } catch (error) {
    console.error("Cancel order frontend error:", error);
    alert(error.response?.data?.message || "Error cancelling order");
  }
};

  const getOrderStatusClass = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('placed')) return 'placed';
    if (statusLower.includes('transit')) return 'transit';
    if (statusLower.includes('delivered')) return 'delivered';
    if (statusLower.includes('cancelled')) return 'cancelled';
    return 'placed';
  };

  return ( 
    <div className="profilePage">
      <div className="profile-container">
        
        <div className="profile-sidebar">
          <div className="profileCard">
            <div className="profile-avatar">
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>
            
            <div className="profile-info">
              <h2 className="profile-username">{username}</h2>
              <p className="profile-email">{email}</p>
            </div>

            <div className="profile-stats">
              <div className="profile-stat">
                <p className="profile-stat-value">{orders.length}</p>
                <p className="profile-stat-label">Orders</p>
              </div>
              <div className="profile-stat">
                <p className="profile-stat-value">
                  {orders.filter(o => o.orderStatus.toLowerCase().includes('delivered')).length}
                </p>
                <p className="profile-stat-label">Delivered</p>
              </div>
            </div>

            <button className='profile-logout-btn' onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="profileOrders-container">
          <div className="orders-header">
            <h3>My Orders</h3>
            <span className="orders-count">{orders.length} Total</span>
          </div>
          
          <div className="profileOrders">
            {orders.length === 0 ? (
              <div className="empty-orders">
                <div className="empty-orders-icon">📦</div>
                <p>No orders yet</p>
              </div>
            ) : (
              orders.map((order)=>{
                return(
                  <div className="profileOrder" key={order._id}>
                    <div className="order-image-wrapper">
                      <img src={order.mainImg} alt={order.title} />
                    </div>
                    
                    <div className="profileOrder-data">
                      <h4 className="order-title">{order.title}</h4>
                      <p className="order-description">{order.description}</p>
                      
                      <div className="order-details-grid">
                        <div className="order-detail-item">
                          <span className="order-detail-label">Size:</span>
                          <span className="order-detail-value">{order.size}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Quantity:</span>
                          <span className="order-detail-value">{order.quantity}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Price:</span>
                          <span className="order-detail-value">
                            &#8377; {parseInt(order.price - (order.price * order.discount)/100) * order.quantity}
                          </span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Payment:</span>
                          <span className="order-detail-value">{order.paymentMethod}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Address:</span>
                          <span className="order-detail-value">{order.address}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Pincode:</span>
                          <span className="order-detail-value">{order.pincode}</span>
                        </div>
                        <div className="order-detail-item">
                          <span className="order-detail-label">Ordered:</span>
                          <span className="order-detail-value">{order.orderDate.slice(0,10)}</span>
                        </div>
                      </div>

                      <div className="order-detail-item">
                        <span className="order-detail-label">Status:</span>
                        <span className={`order-status ${getOrderStatusClass(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                      </div>

                      {(order.orderStatus === 'order placed' || order.orderStatus === 'In-transit') && (
                        <div className="order-actions">
                          <button className='order-cancel-btn' onClick={()=> cancelOrder(order._id)}>
                            Cancel Order
                          </button>
                        </div>
                      )}
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

export default Profile