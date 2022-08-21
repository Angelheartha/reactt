import React, { useState, useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useForm } from "react-hook-form";
import  { useHistory } from 'react-router-dom';
import { apiURL } from './Default';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${cookies.get('accesstoken')}`
         }


const Login = (props) => {
    const history = useHistory();

    const [cookies, setCookie] = useCookies();
    const { register, handleSubmit, watch, errors } = useForm();

    const getJwt = async (data) =>{
        console.log(data)
        await axios.post(`${apiURL}auth/jwt/create/`,
          {
            email:data.email,
            password:data.password,
          },
        )
        .then(function (response) {
          console.log(response.data.access)
          setCookie('accesstoken', response.data.access, { path: '/' }, { httpOnly: true });
          setCookie('refreshtoken', response.data.refresh, { path: '/' }, { httpOnly: true });
          history.push('/');
        })
        .catch(err => {
            console.log("miss");
            alert("EmailかPasswordが違います");
        });
      };

    return (
        <div className="top-wrapper">
          <div class="login">
            <h3>Login</h3>
          </div>
          <div class="login-block">
            <form onSubmit={handleSubmit(getJwt)}>
              <label for="email">Email：</label>
              <input className='form-control' {...register('email')} />
              <label for="password">PassWord：</label>
              <input className='form-control' type="password" {...register('password', { required: true })} />
              <input className='btn btn-secondary' type="submit" value="ログイン" />
            </form>
          </div>
        </div>
    );
  }

  export default Login;