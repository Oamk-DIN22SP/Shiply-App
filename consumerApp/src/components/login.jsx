import React from 'react'
import InputField from './ui/input'
import Button from './ui/buttons'

export default function login() {
    const handleForm = (e) => {
        e.preventDefault();
        console.log("Form submitted");
    };
  return (
    <div className='container'>
    <div className='login'>
      <form onSubmit={handleForm}>
        <div className='input_div'>
        <InputField type='text' name='name' placeholder='Username'/>    
        <InputField type='password' name='password' placeholder='Password'/>
        </div>
        <div className='btn_div'>
        <Button type="submit" className="btn-component" disabled={false}>
          Submit
        </Button>
        <p>
          You do not have an account? Click here to create an account.
        </p>
        </div>
        
      </form>
    </div>
  </div>
  )
}
