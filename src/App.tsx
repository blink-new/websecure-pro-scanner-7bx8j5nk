import React, { useState } from 'react';
import { Button } from './components/ui/button';
import ProductHuntHome from './pages/ProductHuntHome';
import AdminPanelNew from './pages/AdminPanelNew';
import UserPanel from './pages/UserPanel';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin' | 'user-panel' | 'dashboard'>('home');

  return (
    <div className="App">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button 
          variant={currentPage === 'home' ? 'default' : 'outline'}
          onClick={() => setCurrentPage('home')}
          size="sm"
        >
          Product Hunt
        </Button>
        <Button 
          variant={currentPage === 'user-panel' ? 'default' : 'outline'}
          onClick={() => setCurrentPage('user-panel')}
          size="sm"
        >
          User Panel
        </Button>
        <Button 
          variant={currentPage === 'dashboard' ? 'default' : 'outline'}
          onClick={() => setCurrentPage('dashboard')}
          size="sm"
        >
          Security Dashboard
        </Button>
        <Button 
          variant={currentPage === 'admin' ? 'default' : 'outline'}
          onClick={() => setCurrentPage('admin')}
          size="sm"
        >
          Admin Panel
        </Button>
      </div>

      {/* Page Content */}
      {currentPage === 'home' && <ProductHuntHome />}
      {currentPage === 'user-panel' && <UserPanel />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'admin' && <AdminPanelNew />}
    </div>
  );
}

export default App;