import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    <ToastContainer
      position="bottom-right" // Vị trí thông báo (có thể chọn: top-right, top-left, bottom-right, bottom-left)
      autoClose={3000} // Thời gian tự động đóng thông báo (3 giây)
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" // Hoặc dark
    />
    </UserProvider>
  </React.StrictMode>

);
