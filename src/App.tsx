import React, { useState } from 'react';
import { Button } from './components/ui/button';
import ProductHuntHome from './pages/ProductHuntHome';
import AdminPanelNew from './pages/AdminPanelNew';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  return (
    <div className="App">
      {/* Navigation */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button 
          variant={currentPage === 'home' ? 'default' : 'outline'}
          onClick={() => setCurrentPage('home')}
          size="sm"
        >
          Product Hunt Home
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
      {currentPage === 'admin' && <AdminPanelNew />}
    </div>
  );
}

export default App;