import React from 'react'

import LoginForm from '@/components-custom/LoginForm'

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="w-1/2 h-full hidden lg:block bg-white shadow-lg">
        {/* TODO: adding image sliders */}
      </div>

      <div className="lg:p-36 md:p-52 p-8 w-full lg:w-1/2">
        <LoginForm />

        <p className="text-sm text-gray-500 text-center mt-4">or</p>
        <div className="flex justify-center items-center mt-4">
            <a href="/sign-in" className="text-blue-950 w-full text-center text-[13px] font-bold border border-blue-950 rounded-md px-4 py-2 hover:bg-blue-950 hover:text-white transition duration-300">
              Continue with Google
            </a>
        </div>  

        <div className="flex justify-center items-center mt-8">
          <p className="text-sm text-gray-500">
            Need an account?{' '}
            <a href="/sign-up" className="text-blue-950 font-bold hover:underline">
              Sign up here
            </a>
          </p>
        </div>  
      </div>
    </div>
  )
}

export default LoginPage
