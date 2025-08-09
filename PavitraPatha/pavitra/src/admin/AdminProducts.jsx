import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import './admin.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    category: 'Mobiles',
    stock: '',
    description: '',
    image: null
  });
  const [previewImage, setPreviewImage] = useState('');
  const { fetchAdminData } = useOutletContext();

  useEffect(() => {
    loadProducts();
  }, [fetchAdminData]);

  const loadProducts = () => {
    try {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(storedProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductForm(prev => ({ ...prev, image: file }));
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let imageUrl = '';
    if (productForm.image instanceof File) {
      // In a real app, you would upload the image to a server here
      // For demo purposes, we'll use a placeholder
      imageUrl = previewImage || 'https://via.placeholder.com/300x200?text=No+Image';
    } else {
      imageUrl = productForm.image || 'https://via.placeholder.com/300x200?text=No+Image';
    }

    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(product => 
        product.id === editingProduct.id ? { 
          ...productForm, 
          id: editingProduct.id,
          image: imageUrl
        } : product
      );
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    } else {
      // Add new product
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      const productToAdd = {
        ...productForm,
        id: newId,
        price: parseFloat(productForm.price) || 0,
        stock: parseInt(productForm.stock) || 0,
        image: imageUrl
      };

      const updatedProducts = [...products, productToAdd];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
    }
    
    setShowAddForm(false);
    setEditingProduct(null);
    setProductForm({
      name: '',
      brand: '',
      price: '',
      category: 'Mobiles',
      stock: '',
      description: '',
      image: null
    });
    setPreviewImage('');
    fetchAdminData();
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price,
      category: product.category,
      stock: product.stock,
      description: product.description || '',
      image: product.image
    });
    setPreviewImage(product.image);
    setShowAddForm(true);
  };

  const deleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== productId);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      fetchAdminData();
    }
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="admin-products">
      <div className="admin-header">
        <h2>Product Management</h2>
        <button 
          className="add-product-btn"
          onClick={() => {
            setEditingProduct(null);
            setShowAddForm(true);
          }}
        >
          <i className="fas fa-plus"></i> Add Product
        </button>
      </div>

      {showAddForm && (
        <div className="product-form-modal">
          <div className="product-form-container">
            <div className="form-header">
              <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button 
                className="close-btn"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
                  setPreviewImage('');
                }}
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit} className="scrollable-form">
              <div className="form-columns">
                <div className="form-column">
                  <div className="form-group">
                    <label>Product Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Brand *</label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price (₹) *</label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity *</label>
                    <input
                      type="number"
                      name="stock"
                      value={productForm.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-group">
                    <label>Category *</label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Incense Cones">Incense Cones</option>
                      <option value="Incense Sticks">Incense Sticks</option>
                      <option value="Agnihotra">Agnihotra</option>
                      <option value="Sambrani Cup">Sambrani Cup</option>
                      <option value="Health & Wellness">Health & Wellness</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      rows="3"
                    />
                  </div>
                  <div className="form-group">
                    <label>Product Image *</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <div className="image-preview">
                        <img src={previewImage} alt="Preview" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingProduct(null);
                    setPreviewImage('');
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="product-thumbnail"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                      }}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>₹{product.price.toLocaleString('en-IN')}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button 
                      className="edit-btn"
                      onClick={() => editProduct(product)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button 
                      className="delete-btn"
                      onClick={() => deleteProduct(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-products">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;