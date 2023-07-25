  import React from "react";
import {Col,Form,Input,Row, TimePicker, message} from 'antd';
import "../css/appoint.css"
import {useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
  import Layout from "./Layout";
import Top from "../Top";
import { hideLoading, showLoading } from "./alertslice";
import axios from "axios";
import moment from "moment/moment";
  const ApplyDoctor=()=>{
  const {user}=useSelector(state=>state.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handlefinish = async (values) => {
        try {
          dispatch(showLoading());
          const token = localStorage.getItem('token').trim();
          console.log('Token:', token); // Add this line for debugging
          const res = await axios.post(
            'http://localhost:9002/apply-doctor',
            { ...values, userId: user._id ,
              timings: [
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm"),
              ],
            },
            {  
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            navigate('/Book');
          } else {
            message.error(res.data.success);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error('Something went wrong');
        }
      };
    return(   
    <>
        <Top/>
      <Layout>
        <h1>Apply Doctor</h1>
        <Form layout="vertical" onFinish={handlefinish}>
                <h3 className="">Personal Details</h3>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="First Name"
                name="firstname"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the First Name"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Last Name"
                name="lastname"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the last Name"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Phone no"
                name="phone"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the Phoneno"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Email"
                name="email"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the Email"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Website"
                name="Website"
                >
                <Input type="text" placeholder="Your Website"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Address"
                name="address"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the Address"/>
                </Form.Item>
                </Col>                               
            </Row>
            <h4 className="">Professional Details</h4>
            <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Specialization"
                name="specialization"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter your specialization"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the experience"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Fees per consultation"
                name="feesPerCunsaltation"
                required
                rules={[{required:true}]}
                >
                <Input type="text" placeholder="Enter the Fees"/>
                </Form.Item>
                </Col>                               
                <Col xs={24} md={24} lg={8}>
                <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{required:true}]}
                >
                    <TimePicker.RangePicker format="HH:mm:ss"/>
                </Form.Item>           
                </Col>   
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary" type="Submit" style={{marginTop:"23px"}}>
                    Submit
                </button>
            
            </Col>
            </Row>
        </Form>
      </Layout>
    </>
    );
  };

  export default ApplyDoctor;