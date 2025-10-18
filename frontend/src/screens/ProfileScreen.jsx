import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message.jsx';
import Loader from '../components/Loader.jsx';
import { updateProfile } from '../store/authSlice';
import { fetchUserOrders } from '../store/orderSlice';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { userInfo, loading, error } = useSelector((state) => state.auth);
  const { orders, loading: ordersLoading, error: ordersError } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      dispatch(fetchUserOrders());
    }
  }, [userInfo, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateProfile({ name, email, password }));
      setMessage('Profile updated successfully');
    }
  };

  return (
    <div className="container-fluid py-4">
      <Row className="g-4">
        <Col lg={4}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white text-center py-3">
              <div className="d-flex align-items-center justify-content-center">
                <div className="bg-white rounded-circle p-2 me-3">
                  <i className="fas fa-user text-primary" style={{fontSize: '1.5rem'}}></i>
                </div>
                <h4 className="mb-0">My Profile</h4>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              {message && <Message variant="success">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-user me-2"></i>Full Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-envelope me-2"></i>Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-lock me-2"></i>New Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-semibold">
                    <i className="fas fa-lock me-2"></i>Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control-lg"
                  />
                </Form.Group>

                <Button type="submit" variant="primary" size="lg" className="w-100">
                  <i className="fas fa-save me-2"></i>Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={8}>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-success text-white py-3">
              <div className="d-flex align-items-center">
                <i className="fas fa-shopping-bag me-3" style={{fontSize: '1.5rem'}}></i>
                <h4 className="mb-0">Order History</h4>
                {orders && <Badge bg="light" text="dark" className="ms-auto">{orders.length} Orders</Badge>}
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {ordersLoading ? (
                <div className="text-center py-5">
                  <Loader />
                </div>
              ) : ordersError ? (
                <div className="p-4">
                  <Message variant="danger">{ordersError}</Message>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-cart text-muted" style={{fontSize: '3rem'}}></i>
                  <p className="text-muted mt-3 mb-0">No orders found</p>
                </div>
              ) : (
                <div className="table-responsive">
                  {orders.map((order) => (
                    <Card key={order._id} className="m-3 border">
                      <Card.Body>
                        <Row className="align-items-center">
                          <Col md={2}>
                            <small className="text-muted">Order ID</small>
                            <p className="mb-0 fw-bold">{order._id.slice(-8)}</p>
                          </Col>
                          <Col md={2}>
                            <small className="text-muted">Date</small>
                            <p className="mb-0">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </Col>
                          <Col md={2}>
                            <small className="text-muted">Total</small>
                            <p className="mb-0 fw-bold text-success">${order.totalPrice}</p>
                          </Col>
                          <Col md={2}>
                            <small className="text-muted">Payment</small>
                            <p className="mb-0">
                              <Badge bg={order.isPaid ? 'success' : 'danger'}>
                                {order.isPaid ? 'Paid' : 'Pending'}
                              </Badge>
                            </p>
                          </Col>
                          <Col md={2}>
                            <small className="text-muted">Status</small>
                            <p className="mb-0">
                              <Badge bg={order.isDelivered ? 'success' : 'warning'}>
                                {order.isDelivered ? 'Delivered' : 'Processing'}
                              </Badge>
                            </p>
                          </Col>
                          <Col md={2}>
                            <small className="text-muted">Items</small>
                            <p className="mb-0">{order.orderItems.length} item(s)</p>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileScreen;