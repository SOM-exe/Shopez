import React, { useEffect, useState } from 'react'
import '../../styles/AllUsers.css'
import axios from 'axios'

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    fetchUsersData();
  }, [])

  const fetchUsersData = async() =>{
    await axios.get('http://localhost:6001/api/users/fetch-users').then(
      (response)=>{
        setUsers(response.data.filter(user=> user.usertype === 'customer'));
      }
    )

    await axios.get('http://localhost:6001/api/orders/fetch-orders').then(
      (response)=>{
        setOrders(response.data);
      }
    )
   
  }

  const getUserOrderCount = (userId) => {
    return orders.filter(order => order.userId === userId).length;
  };

  return (
    <div className="all-users-page">
      
      <div className="all-users-header">
        <h3>All Users</h3>
        <div className="users-count-badge">
          {users.length} {users.length === 1 ? 'User' : 'Users'}
        </div>
      </div>

      <div className="users-container">
        
        <div className="users-table-header">
          <span>#</span>
          <span>Name</span>
          <span>Email</span>
          <span>User ID</span>
          <span>Orders</span>
        </div>

        <div className="user-cards">
          {users.length === 0 ? (
            <div className="empty-users">
              <div className="empty-users-icon">👥</div>
              <p>No users found</p>
            </div>
          ) : (
            users.map((user, index) => {
              return(
                <div className="user-card" key={user._id}>
                  
                  <div className="user-avatar">
                    {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                  </div>
                  
                  <div className="user-info">
                    <span className="user-info-label">Name</span>
                    <span className="user-info-value">{user.username}</span>
                  </div>
                  
                  <div className="user-info">
                    <span className="user-info-label">Email</span>
                    <span className="user-info-value">{user.email}</span>
                  </div>
                  
                  <div className="user-info">
                    <span className="user-info-label">User ID</span>
                    <span className="user-info-value user-id">{user._id}</span>
                  </div>
                  
                  <div className="user-orders-badge">
                    {getUserOrderCount(user._id)}
                  </div>
                  
                </div>
              )
            })
          )}
        </div>

      </div>

    </div>
  )
}

export default AllUsers