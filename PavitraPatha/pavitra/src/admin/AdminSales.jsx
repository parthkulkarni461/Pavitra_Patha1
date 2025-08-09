import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import './AdminSales.css';

// Register ChartJS components
ChartJS.register(
  BarElement, 
  CategoryScale, 
  LinearScale, 
  Tooltip, 
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

const AdminSales = () => {
  const [salesData, setSalesData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('monthly');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalesData = () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Calculate summary statistics
        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        const totalOrders = orders.length;
        const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
        
        // Calculate category sales
        const categorySales = {};
        const categories = ['Incense Cones', 'Incense Sticks', 'Agnihotra', 'Sambrani Cup', 'Health & Wellness'];
        
        categories.forEach(category => {
          categorySales[category] = { revenue: 0, unitsSold: 0 };
        });

        orders.forEach(order => {
          order.items.forEach(item => {
            const product = products.find(p => p.id === item.id);
            if (product && product.category) {
              const category = product.category;
              if (!categorySales[category]) {
                categorySales[category] = { revenue: 0, unitsSold: 0 };
              }
              categorySales[category].revenue += item.price * item.quantity;
              categorySales[category].unitsSold += item.quantity;
            }
          });
        });

        // Calculate monthly sales
        const monthlySales = {};
        const currentDate = new Date();
        
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date(currentDate);
          date.setMonth(date.getMonth() - i);
          const monthKey = date.toLocaleString('default', { month: 'short', year: 'numeric' });
          monthlySales[monthKey] = 0;
        }

        orders.forEach(order => {
          const orderDate = new Date(order.date);
          const monthKey = orderDate.toLocaleString('default', { month: 'short', year: 'numeric' });
          if (monthlySales[monthKey] !== undefined) {
            monthlySales[monthKey] += order.total;
          }
        });

        // Calculate daily sales (last 30 days)
        const dailySales = {};
        for (let i = 29; i >= 0; i--) {
          const date = new Date(currentDate);
          date.setDate(date.getDate() - i);
          const dateKey = date.toLocaleDateString();
          dailySales[dateKey] = 0;
        }

        orders.forEach(order => {
          const orderDate = new Date(order.date);
          const dateKey = orderDate.toLocaleDateString();
          if (dailySales[dateKey] !== undefined) {
            dailySales[dateKey] += order.total;
          }
        });

        // Prepare top selling products
        const productSales = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            if (!productSales[item.id]) {
              productSales[item.id] = {
                name: item.name,
                revenue: 0,
                unitsSold: 0
              };
            }
            productSales[item.id].revenue += item.price * item.quantity;
            productSales[item.id].unitsSold += item.quantity;
          });
        });

        const topProducts = Object.entries(productSales)
          .map(([id, data]) => ({ id, ...data }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5);

        setSalesData({
          summary: {
            totalRevenue,
            totalOrders,
            avgOrderValue
          },
          categories: categorySales,
          monthly: monthlySales,
          daily: dailySales,
          topProducts
        });
      } catch (err) {
        console.error('Error calculating sales data:', err);
        setError('Failed to load sales data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Chart data preparation
  const getSummaryCards = () => (
    <div className="summary-cards">
      <div className="summary-card">
        <h3>Total Revenue</h3>
        <p>₹{salesData?.summary.totalRevenue.toLocaleString('en-IN') || '0'}</p>
      </div>
      <div className="summary-card">
        <h3>Total Orders</h3>
        <p>{salesData?.summary.totalOrders || '0'}</p>
      </div>
      <div className="summary-card">
        <h3>Avg. Order Value</h3>
        <p>₹{salesData?.summary.avgOrderValue.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || '0'}</p>
      </div>
    </div>
  );

  const getCategoryChartData = () => ({
    labels: salesData ? Object.keys(salesData.categories) : [],
    datasets: [{
      label: 'Revenue (₹)',
      data: salesData ? Object.values(salesData.categories).map(cat => cat.revenue) : [],
      backgroundColor: '#3498db',
      borderColor: '#2980b9',
      borderWidth: 1
    }]
  });

  const getTimeChartData = () => {
    const labels = timeRange === 'monthly' 
      ? Object.keys(salesData?.monthly || {}).sort((a, b) => {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return months.indexOf(a.split(' ')[0]) - months.indexOf(b.split(' ')[0]);
        })
      : Object.keys(salesData?.daily || {}).sort((a, b) => new Date(a) - new Date(b));
    
    const data = timeRange === 'monthly'
      ? labels.map(month => salesData.monthly[month])
      : labels.map(day => salesData.daily[day]);

    return {
      labels,
      datasets: [{
        label: timeRange === 'monthly' ? 'Monthly Revenue (₹)' : 'Daily Revenue (₹)',
        data,
        backgroundColor: timeRange === 'monthly' ? '#2ecc71' : '#f39c12',
        borderColor: timeRange === 'monthly' ? '#27ae60' : '#e67e22',
        borderWidth: 1
      }]
    };
  };

  const getUnitsSoldData = () => ({
    labels: salesData ? Object.keys(salesData.categories) : [],
    datasets: [{
      data: salesData ? Object.values(salesData.categories).map(cat => cat.unitsSold) : [],
      backgroundColor: [
        '#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6',
        '#1abc9c', '#d35400', '#34495e', '#16a085', '#c0392b'
      ],
      borderColor: '#fff',
      borderWidth: 2
    }]
  });

  const getTopProductsData = () => ({
    labels: salesData?.topProducts.map(p => p.name) || [],
    datasets: [{
      label: 'Revenue (₹)',
      data: salesData?.topProducts.map(p => p.revenue) || [],
      backgroundColor: '#9b59b6',
      borderColor: '#8e44ad',
      borderWidth: 1
    }]
  });

  // Common chart options
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        display: false,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => '₹' + context.raw.toLocaleString()
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '₹' + value.toLocaleString()
        }
      }
    }
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { 
        position: 'right',
        labels: {
          padding: 20,
          boxWidth: 12
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} units`
        }
      }
    }
  };

  return (
    <div className="sales-reports">
      <h2>Sales Reports</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button onClick={() => window.location.reload()} className="refresh-button">
            Refresh
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="loading-spinner">Loading sales data...</div>
      ) : (
        <>
          {getSummaryCards()}
          
          <div className="report-controls">
            <div className="tabs">
              <button 
                className={activeTab === 'overview' ? 'active' : ''}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button 
                className={activeTab === 'categories' ? 'active' : ''}
                onClick={() => setActiveTab('categories')}
              >
                Categories
              </button>
              <button 
                className={activeTab === 'products' ? 'active' : ''}
                onClick={() => setActiveTab('products')}
              >
                Top Products
              </button>
            </div>
            
            {activeTab === 'overview' && (
              <div className="time-range">
                <button 
                  className={timeRange === 'daily' ? 'active' : ''}
                  onClick={() => setTimeRange('daily')}
                >
                  Daily
                </button>
                <button 
                  className={timeRange === 'monthly' ? 'active' : ''}
                  onClick={() => setTimeRange('monthly')}
                >
                  Monthly
                </button>
              </div>
            )}
          </div>

          <div className="chart-container">
            {activeTab === 'overview' ? (
              <>
                <div className="chart-wrapper">
                  <h3>{timeRange === 'monthly' ? 'Monthly Sales Revenue' : 'Daily Sales Revenue (Last 30 Days)'}</h3>
                  {Object.keys(timeRange === 'monthly' ? salesData?.monthly || {} : salesData?.daily || {}).length === 0 ? (
                    <div className="empty-state">No sales data available</div>
                  ) : (
                    <div className="chart-inner">
                      <Bar 
                        data={getTimeChartData()}
                        options={barChartOptions}
                      />
                    </div>
                  )}
                </div>
              </>
            ) : activeTab === 'categories' ? (
              <>
                {Object.keys(salesData?.categories || {}).length === 0 ? (
                  <div className="empty-state">No category sales data available</div>
                ) : (
                  <div className="chart-row">
                    <div className="chart-wrapper">
                      <h3>Revenue by Category</h3>
                      <div className="chart-inner">
                        <Bar 
                          data={getCategoryChartData()}
                          options={barChartOptions}
                        />
                      </div>
                    </div>
                    
                    <div className="chart-wrapper">
                      <h3>Units Sold by Category</h3>
                      <div className="chart-inner">
                        <Pie 
                          data={getUnitsSoldData()}
                          options={pieChartOptions}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                {salesData?.topProducts?.length === 0 ? (
                  <div className="empty-state">No product sales data available</div>
                ) : (
                  <div className="chart-wrapper">
                    <h3>Top Selling Products by Revenue</h3>
                    <div className="chart-inner">
                      <Bar 
                        data={getTopProductsData()}
                        options={barChartOptions}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminSales;