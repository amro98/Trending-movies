import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Register() {

    let [errorList, setErrorList] = useState([]);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let navigate = useNavigate();
    


    const [user,setUser] = useState({
      first_name:'',last_name:'',age:'',
        email:'',password:''
    });


    function getUser(e) {

      let myUser = {...user};
      myUser[e.target.name] = e.target.value;
      setUser(myUser);
      
    }


    async function formSubmit(e) {
      e.preventDefault();
      setLoading(true);
      let validattionResponse = validateRegisterForm();

      if (validattionResponse.error) {
        setErrorList(validattionResponse.error.details);
        setLoading(false);
      } else {
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signup`,user);
      if (data.message === 'success') {

        navigate('/login')
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message)
      }
      }
      
    }


    function validateRegisterForm() {
      let scheme = Joi.object({
        first_name: Joi.string().min(3).max(10).required(),
        last_name: Joi.string().min(3).max(10).required(),
        age: Joi.number().min(16).max(80).required(),
        email: Joi.string().email({tlds: { allow: ['com','net','org','eg']}}).required(),
        password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')).required(),

      });

      return scheme.validate(user,{abortEarly: false});
    }


  return (
    <div>
      <div className="w-50 mx-auto py-4">
        <h1>Register Now</h1>

        <form onSubmit={formSubmit}>

          {error && <div className='alert alert-danger'>{error}</div> }

          {errorList.map((error,index) => index === errorList.length - 1 ? <div className='alert alert-danger'>Password Invalid</div> :
            <div className='alert alert-danger'>{error.message}</div>
          )}

          <div className="my-3">
            <label htmlFor="first_name">first_name</label>
            <input onChange={getUser} type="text" className='form-control my-1' name='first_name'/>
          </div>

          <div className="my-3">
            <label htmlFor="last_name">last_name</label>
            <input onChange={getUser} type="text" className='form-control my-1' name='last_name'/>
          </div>

          <div className="my-3">
            <label htmlFor="age">age</label>
            <input onChange={getUser} type="number" className='form-control my-1' name='age'/>
          </div>

          <div className="my-3">
            <label htmlFor="email">email</label>
            <input onChange={getUser} type="email" className='form-control my-1' name='email'/>
          </div>

          <div className="my-3">
            <label htmlFor="password">passsword</label>
            <input onChange={getUser} type="password" className='form-control my-1' name='password'/>
          </div>

          <button type='submit' className='btn btn-info'>
            {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Register'}
          </button>
        </form>
      </div>
    </div>
  )
}
