import Layout from '../Features/Layout'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'antd'
import { render } from '@testing-library/react'
import Top from '../Top'
const Appointments = () => {
  const [appointments,setappointments]=useState([])
  const getappointments=async()=>{
    try {
      const res=await axios.get('http://localhost:9002/user-appointments',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem("token")}`,
        },
      });
      if(res.data.success)
      {
        setappointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getappointments();

  }, [])
  
  
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <>
    <Top/>
    <Layout>
      <h1 className='text-center'>Appointments</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
    </>
  )
}

export default Appointments
