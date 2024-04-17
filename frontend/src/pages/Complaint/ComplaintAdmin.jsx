import React, { useEffect, useState } from 'react';
import { SideBar } from '../../components/SideBar';
import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react';
import axios from 'axios';

export default function ComplaintAdmin() {
  const [complaints, setComplaints] = useState([]);

  const fetchComplaintData = async () => {
    try {
      const response = await axios.get(`http://localhost:8070/Complaint/complaint-alladmin`);
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaint data:', error);
    }
  };

  useEffect(() => {
    fetchComplaintData();
  }, []);

  return (
    <div className='main-layout'>
      <SideBar />
      <div className='inner-layout '>
        <Typography variant="h5" color="blue-gray">
          Recent Complaints
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          These are details about the last complaints
        </Typography>
        <br/>
        <div className="grid grid-cols-1 gap-3">
        {complaints.map((complaint, index) => (
          <Card key={index} className=" p-4 bg-gradient-to-r from-pink-50 via-red-50 to-orange-50 ">
            <CardBody>
            <div className="flex justify-center gap-4 " >
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
              <img
                src={`http://localhost:8070/${complaint.imageURL}`}
                alt="Complaint Image"
                className="mb-4 rounded-lg w-64 h-auto"
                onError={(e) => console.error('Error loading image:', e.nativeEvent)} // Error handling for image loading
              />
            </div>
            </CardBody>
            <CardFooter className="pt-0">
            <div className="flex flex-wrap justify-center text-center mb-4 gap-10">
                <Typography color="gray">Order ID: {complaint.order_id}</Typography>
                <Typography color="gray">Item ID: {complaint.item_id}</Typography>
            </div>
            <div className="flex flex-wrap justify-center text-center mb-4 gap-10">
                <Typography color="gray">Customer ID: {complaint.customer_id}</Typography>
                <Typography color="gray">Payment ID: {complaint.payment_id}</Typography>
            </div>
            <div className="flex justify-center">
              <Button className='mr-5'>Refund</Button>
              <Button>Ignore</Button>
            </div>
            </CardFooter>
          </Card>
        ))}
       </div>
      </div>
    </div>
  );
}

