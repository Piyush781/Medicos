import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Top from './Top'
// import '../components/css/appoint.css'
import Layout from "./Features/Layout" 
import { Row } from 'antd'
import DoctorList from './Pages/Doctorlist'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Footer from "./Footer"
const  Book=()=> {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:9002/getAllDoctors",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token'),
          },
        }
      );
      if(res.data.success)
      {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <Top/>
      <Layout>
        <h1>Home page</h1>
        <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
        </Row>
      </Layout>
    </div>
  )
};

export default Book;

