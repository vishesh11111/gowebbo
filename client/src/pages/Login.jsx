import React from 'react';
import { useForm } from 'react-hook-form';
import Heading1 from '../ui/heading/Heading1';
import { Actionbutton } from '../ui/button/Actionbutton';
import { LoginAction } from "../components/apis/Api_wrapper.js";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../components/redux/slices/formSlice.js';

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'visshku122@gmail.com',
      password: '1234567',
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    dispatch(SetLoading(true))
    const result = await LoginAction(data)
    if (result?.status) {
      dispatch(SetLoading(false))
      toast.success(result?.message)
      // setTimeout(() => {
      //   navigate("/")
      // }, 000);
    } else {
      dispatch(SetLoading(false))
      toast.error(result?.message)
    }
    // Handle your login logic here (e.g., API call)
  };

  return (
    <div className='w-full h-screen justify-center items-center flex'>
      <div className="login-container shadow-xl px-10 py-10 rounded-xl min-w-[50rem] border m-auto">
        <Heading1 title="Login" />
        <form className='flex flex-col space-y-5 mt-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input
              type="email"
              id="email"
              placeholder='Email'
              className='w-full border h-[4rem] rounded-xl text-[2rem] py-2 px-4'
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>

          <div>
            <input
              type="password"
              id="password"
              placeholder='Password'
              className='w-full border h-[4rem] rounded-xl text-[2rem] py-2 px-4'
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Actionbutton type="submit" text={"Login"} />
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
