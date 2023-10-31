import { useForm } from 'react-hook-form';
import {useAuth} from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function LoginPage() {

    const { register, handleSubmit, formState: {errors} } = useForm();

    const {signin, errors: signinErrors, isAuthenticated } = useAuth(); // erros: signinErros, change errors's name to signinErrors

    const navigate =  useNavigate();

    const onSubmit  = handleSubmit(data => {
        console.log(data);
        signin(data)
    });

    useEffect(() => {
      if(isAuthenticated) {
        navigate('/tasks');
      }
    }, [isAuthenticated]);

    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <div className="bg-zinc-800 max-w-md p-10">
          {signinErrors.map((error, i) => (
            <div className="bg-red-500 p-2 text-white my-2" key={i}>
              <p>{error}</p>
            </div>
          ))}

          <h1 className="text-2xl font-bold">Login</h1>
          <form onSubmit={onSubmit}>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full bg-zinc-7-00 text-black px-4 py-2 rounded-md my-2"
              placeholder="email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <input
              type="password"
              {...register("password", { required: true })}
              className="w-full bg-zinc-7-00 text-black px-4 py-2 rounded-md my-2"
              placeholder="password"
            />

            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
            <button type="submit" className="my-2">
              Login
            </button>
          </form>
          <p className='flex gap-x-2 justify-between'>Don't have an account? <Link to="/register" className='text-sky-500'>Sign up</Link></p>
        </div>
      </div>
    );
}

export default LoginPage;