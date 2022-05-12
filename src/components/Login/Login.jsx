import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

export default function Login(props) {

  let [errorList, setErrorList] = useState([]);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const [user,setUser] = useState({
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
        let { data } = await axios.post(`https://route-egypt-api.herokuapp.com/signin`,user);
      if (data.message === 'success') {

        localStorage.setItem('userToken',data.token);
        props.getUserInfo();
        navigate('/')
        setLoading(false);
      } else {
        setLoading(false);
        setError(data.message)
      }
      }

    }


    function validateRegisterForm() {
      let scheme = Joi.object({
        email: Joi.string().email({tlds: { allow: ['com','net','org','eg']}}).required(),
        password: Joi.string().pattern(new RegExp('^[A-Z][a-z]{2,8}$')).required(),

      });

      return scheme.validate(user,{abortEarly: false});
    }



  return (
    <div>
      <div className="w-50 mx-auto py-4">
        <h1> Login </h1>

        <form onSubmit={formSubmit}>

          {error && <div className='alert alert-danger'>{error}</div> }

          {errorList.map((error,index) => index === errorList.length - 1 ? <div className='alert alert-danger'>Password Invalid</div> :
            <div className='alert alert-danger'>{error.message}</div>
          )}

          

          <div className="my-3">
            <label htmlFor="email">email</label>
            <input onChange={getUser} type="email" className='form-control my-1' name='email'/>
          </div>

          <div className="my-3">
            <label htmlFor="password">passsword</label>
            <input onChange={getUser} type="password" className='form-control my-1' name='password'/>
          </div>

          <button type='submit' className='btn btn-info'>
            {loading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}
