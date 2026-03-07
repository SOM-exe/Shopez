import React, { useEffect, useState } from 'react'
import '../../styles/AllOrders.css'
import axios from 'axios';

const AllOrders = () => {

  const [orders, setOrders] = useState([]);
  const [updateStatus, setUpdateStatus] = useState({});

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
    try {
      const { data } = await axios.put('http://localhost:6001/api/orders/cancel-order', { orderId });
      alert(data.message || "Order cancelled!!");
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Order cancellation failed!!");
    }
  };

  const updateOrderStatus = async(id) =>{
    const status = updateStatus[id];
    if (!status) {
      alert("Please select a status");
      return;
    }
    
    await axios.put('http://localhost:6001/api/orders/update-order-status', {id, updateStatus: status}).then(
      (response)=>{
        alert("Order status updated!!");
        setUpdateStatus({});
        fetchOrders();
      }
    ).catch((err)=>{
      alert("Order update failed!!");
    })
  }

  const handleStatusChange = (orderId, value) => {
    setUpdateStatus(prev => ({...prev, [orderId]: value}));
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
    <div className="all-orders-page">
      
      <div className="all-orders-header">
        <h3>All Orders</h3>
        <div className="orders-count-badge">
          {orders.length} {orders.length === 1 ? 'Order' : 'Orders'}
        </div>
      </div>

      <div className="all-orders">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <p>No orders found</p>
          </div>
        ) : (
          orders.map((order)=>{
            return(
              <div className="all-orders-order" key={order._id}>
                
                <div className="order-image-container">
                  <img src={order.mainImg} alt={order.title} />
                </div>
                
                <div className="all-orders-order-data">
                  
                  <div className="order-title-section">
                    <h4>{order.title}</h4>
                    <p>{order.description}</p>
                  </div>
                  
                  <div className="order-details-grid">
                    <div className="order-detail-group">
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
                    </div>
                    
                    <div className="order-detail-group">
                      <div className="order-detail-item">
                        <span className="order-detail-label">Name:</span>
                        <span className="order-detail-value">{order.name}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="order-detail-label">Email:</span>
                        <span className="order-detail-value">{order.email}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="order-detail-label">Mobile:</span>
                        <span className="order-detail-value">{order.mobile}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="order-detail-label">User ID:</span>
                        <span className="order-detail-value">{order.userId}</span>
                      </div>
                    </div>
                    
                    <div className="order-detail-group">
                      <div className="order-detail-item">
                        <span className="order-detail-label">Ordered:</span>
                        <span className="order-detail-value">{order.orderDate.slice(0,10)}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="order-detail-label">Address:</span>
                        <span className="order-detail-value">{order.address}</span>
                      </div>
                      <div className="order-detail-item">
                        <span className="order-detail-label">Pincode:</span>
                        <span className="order-detail-value">{order.pincode}</span>
                      </div>
                    </div>
                  </div>

                  <div className="order-status-section">
                    <div className="order-detail-item">
                      <span className="order-detail-label">Status:</span>
                      <span className={`order-status-badge ${getOrderStatusClass(order.orderStatus)}`}>
                        {order.orderStatus}
                      </span>
                    </div>
                    
                    {order.orderStatus !== 'delivered' && order.orderStatus !== 'cancelled' && (
                      <div className="order-status-controls">
                        <select 
                          className="order-status-select"
                          value={updateStatus[order._id] || ""}
                          onChange={(e)=> handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="" disabled>Update order status</option>
                          <option value="Order placed">Order Placed</option>
                          <option value="In-transit">In-transit</option>
                          <option value="delivered">Delivered</option>
                        </select>
                        <button className='order-update-btn' onClick={()=> updateOrderStatus(order._id)}>
                          Update
                        </button>
                      </div>
                    )}
                    
                    {(order.orderStatus === 'order placed' || order.orderStatus === 'In-transit') && (
                      <button className='order-cancel-btn' onClick={()=> cancelOrder(order._id)}>
                        Cancel Order
                      </button>
                    )}
                  </div>

                </div>
              </div>
            )
          })
        )}
      </div>

    </div>
  )
}

export default AllOrders