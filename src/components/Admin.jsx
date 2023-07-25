import React,{useState} from 'react'
import Top from './Top'
import Footer from './Footer'
// import axios from 'axios'
import '../components/css/Admin.css'
import { useNavigate } from 'react-router-dom'
export default function Admin() {
  const navigate=useNavigate();
  const [email,setemail]=useState('');
  const [password, setpassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = () => {
    // Send a POST request to the backend for authentication
    fetch('http://localhost:9002/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message)
        setMessage(data.message);
        if (data.message === 'Login successful') {
          navigate('/Book');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    <div>
      <Top/>
      <div className='background' >
      
      <div className="Adminform">
            <h1>Login</h1>
            <input type="text" name="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Your email" aria-label="ferf" />
            <input type="password" name="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder="Your password" aria-label="fvd" />
            
            <div className="button" onClick={handleLogin}>Login</div>
        </div>
      </div>
      {message && <p>{message}</p>}
      <Footer/>
    </div>
  )
}







