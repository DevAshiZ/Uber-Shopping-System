import { Alert, Label, Spinner, TextInput } from 'flowbite-react';
import { React, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { useDispatch,useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/customer/customerRegisterSlice.js';

export default function Login() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.customer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.cus_email || !formData.cus_password){
          return dispatch(loginFailure('Please fill all the fields'));
        }
    try {
      dispatch(loginStart());
      const res = await fetch('/customer/login', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(loginFailure(data.message));
      }
      if(res.ok){
        dispatch(loginSuccess(data));
        navigate('/home');
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen' style={{ 
      backgroundImage: "url('https://cdn.dribbble.com/users/2063527/screenshots/11467383/media/c1ad5d2ebbdebb25282247869816cc9c.gif')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: 'auto',
      height: 'auto',
  }}>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        <div className='flex-1 mt-36'>
            <Link to="/Customerregister" className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 rounded-lg text-white'>Food</span>Delivery
            </Link>
            <p className='text-sm mt-5'>
              vvvvv
            </p>
          </div>
          <div className='flex-1 mt-36'>{/*right*/}
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div>
                <Label value='Your email' />
                <TextInput type='email' placeholder='name@gmail.com' id='cus_email' onChange={handleChange}/>
              </div>
              <div>
                <Label value='Your password' />
                <TextInput type='password' placeholder='*********' id='cus_password' onChange={handleChange}/>
              </div>
              <Button className='mt-2' gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{
                loading ? (
                  <><Spinner size='sm'/><span className='pl-3'>Loading...</span></>
                ) : 'Login'
              }</Button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Don't have an account?</span>
              <Link to='/Customerregister' className='text-blue-500'>
                  Register
              </Link>
            </div>
            {
              errorMessage && (<Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>)
            }
          </div>
        </div>
    </div>
  )
}