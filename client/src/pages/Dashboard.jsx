import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="card">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user.name}!
              </h1>
              <p className="text-gray-600">Email: {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn-outline"
            >
              Logout
            </button>
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-hover text-center">
              <div className="text-3xl mb-2">🤰</div>
              <h3 className="font-semibold text-gray-900">Pregnancy Tracking</h3>
              <p className="text-gray-600 text-sm mt-2">Track your pregnancy journey</p>
            </div>
            
            <div className="card-hover text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="font-semibold text-gray-900">Growth Monitoring</h3>
              <p className="text-gray-600 text-sm mt-2">Monitor child growth milestones</p>
            </div>
            
            <div className="card-hover text-center">
              <div className="text-3xl mb-2">🍼</div>
              <h3 className="font-semibold text-gray-900">Feeding Guide</h3>
              <p className="text-gray-600 text-sm mt-2">Get feeding recommendations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;