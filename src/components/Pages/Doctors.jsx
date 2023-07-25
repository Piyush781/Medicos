import React, { useState, useEffect } from "react";
import Layout from "../Features/Layout";
import axios from "axios";
import { message, Table, Tag } from "antd";
import Top from "../Top";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  //getDoctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("http://localhost:9002/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        'http://localhost:9002/changeAccountStatus',
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  
  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstname} {record.lastname}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "pending" ? "orange" : status === "approved" ? "green" : "red"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button className="btn btn-success" onClick={() => handleAccountStatus(record, "approved")}>
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Top />
      <Layout>
        <h1 className="text-center m-3">All Doctors</h1>
        <Table columns={columns} dataSource={doctors} rowKey="_id" />
      </Layout>
    </>
  );
};

export default Doctors;
