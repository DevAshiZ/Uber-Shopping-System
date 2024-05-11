import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Button ,Input} from '@material-tailwind/react';
import { Link, useNavigate } from 'react-router-dom';
import { SideBar } from '../../components/SideBar';
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


export default function Complaint() {
  const {currentCustomer} = useSelector((state)=>state.customer)
  const [complaints, setComplaints] = useState([]);// State to store complaints
  const [searchTerm, setSearchTerm] = useState('');// State for search term
  const navigate = useNavigate();

  // Display Previous Complaints
  useEffect(() => {
    axios
      .get(`http://localhost:8070/Complaint/complaint-all/${currentCustomer._id}`)
      .then((response) => {
        setComplaints(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);// Empty dependency array ensures this effect runs only once on component mount

  const deleteComplaint = async (id) => {
    // Display a confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this complaint?');

    // Check if the user confirmed the deletion
    if (confirmDelete) {
      try {
        // Send DELETE request to the backend
        await axios.delete(`http://localhost:8070/Complaint/complaint-delete/${id}`);

        // After successful deletion, update the complaints list
        setComplaints(complaints.filter((complaint) => complaint._id !== id));
      } catch (error) {
        console.error('Error deleting complaint:', error);
      }
    } else {
      // User canceled the deletion
      console.error('Deletion canceled');
    }
  };

  // Handle click on Edit button
  const handleEditClick = (complaint) => {
    if (complaint.complaint_status !== 'accepted') {
      navigate(`/editComplaint/${complaint._id}`);
    } else {
      console.log('Complaint status is accepted. Edit not allowed.');
    }
  };

  // Handle change in search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

   // Filter complaints based on search term
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      complaint.order_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className='main-layout'>
      <SideBar />
      <div className='inner-layout'>
        <h3 className='text-4xl ml-3 font-semibold'>Prev. Complaints</h3>
        <div className='flex justify-end mt-4 gap-2 '>
          {/* Search input */}
          <div className="flex w-full shrink-0 md:w-max bg-gray-100 rounded-xl shadow-md">
            <Input
              label='Search'
              color='blue-gray'
              className='w-full md:w-72 '
              icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            </div>
          {/* Button to navigate to new complaint form */}
          <Button
            ripple='light'
            className='w-30 text-base py-2 px-4 border border-transparent bg-custom-gradient'
            onClick={() => navigate(`/complaintForm`)}
          >
            New Complaint
          </Button>
        </div>
        <br />
        <ul>
        {/* List of filtered complaints */}
          {filteredComplaints.map((Complaints) => (
            <li key={Complaints._id} className='mb-2'>
              <div className='border border-gray-300 bg-gray-100 p-4 rounded-lg items-center justify-between'>
                <div className='flex flex-wrap text-center justify-center gap-2'>
                  
                  {/* Order ID */}
                  <div className='mr-2'>Order ID : </div>
                  {Complaints.order_id}
                  {/* Complaint Status */}
                  <div className=' ml-10 mr-2'>Complaint Status : </div>
                  <strong>
                  <div className={`border border-gray-200 px-4 rounded-md shadow-md ${Complaints.complaint_status === 'accepted' ? 'text-green-800 bg-green-100' : 'text-red-600 bg-red-100'}`}>
                  {Complaints.complaint_status}
                  </div>
                  </strong>

                  {/* Edit and Delete buttons */}
                  <div className='ml-auto flex'>
                    <Button
                      color='blue-gray'
                      ripple='light'
                      className='w-30 mr-3 mt-3 text-base py-2 border border-transparent  '
                      size='regular'
                      disabled={Complaints.complaint_status === 'accepted'}
                      onClick={() => handleEditClick(Complaints)}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => deleteComplaint(Complaints._id)}
                      color='red'
                      ripple='light'
                      className='w-30 mt-3  py-2 px-4 text-base border border-transparent bg-red-500'
                      size='regular'
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {/* Item ID and Quantity */}
                <div className='flex flex-wrap text-center mb-1 gap-4'>
                  <div className='mr-2'>Item ID : </div>
                  {Complaints.item_id}
                  <div className='ml-10 mr-2'>Quantity : </div>
                  {Complaints.quantity}
                </div>
                {/* Link to submit bank details for accepted complaints with refund option */}
                {Complaints.complaint_status === 'accepted' && Complaints.resolving_option === 'refund' && (
                  <Link
                    to={`/refund/${Complaints._id}/${Complaints.order_id}`}
                    className=' hover:text-red-00 text-red-600 font-bold hover:underline '
                  >
                    Click Here to Submit Bank Details
                  </Link>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
