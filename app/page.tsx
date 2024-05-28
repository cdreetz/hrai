'use client'

import React from 'react';
import { login, signup } from './loginaction';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const formType = e.nativeEvent.submitter.name;

    if (formType === 'login') {
      login(form).then(() => {
        router.push('/dashboard');
        console.log('Login successful');
      }).catch((error) => {
        console.error('Login failed', error);
      });
    } else if (formType === 'signup') {
      signup(form).then(() => {
        console.log('Signup successful');
        router.push('/dashboard');
      }).catch((error) => {
        console.error('Signup failed', error);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white max-w-sm w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label htmlFor='email' className="block text-sm font-medium text-gray-700">Email:</label>
            <input id='email' name='email' type='email' required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div>
            <label htmlFor='password' className="block text-sm font-medium text-gray-700">Password:</label>
            <input id='password' name='password' type='password' required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="flex justify-between items-center">
            <button type="submit" name="login" className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
              Log in
            </button>
          </div>
          <div className="pt-4">
            <button
              type="submit" 
              name="signup"
              className="py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
              onClick={() => router.push('/dashboard')}
              >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
