import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';

function Signin() {

  const initialState = { email: '', password: '' }
  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state

  const router = useRouter();


  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    dispatch({ type: 'NOTIFY', payload: {} })
}


const handleSubmit = async e => {
  e.preventDefault()
  dispatch({ type: 'NOTIFY', payload: { loading: true } })
  const res = await postData('auth/login', userData)

  if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

  dispatch({ type: 'NOTIFY', payload: { success: res.msg } })

  dispatch({
      type: 'AUTH', payload: {
          token: res.access_token,
          user: res.user
      }
  })

  Cookie.set('refreshtoken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
  })

  localStorage.setItem('firstLogin', true)
}
useEffect(() => {
  if(Object.keys(auth).length !== 0) router.push('/')
}, [auth]);

  return (
    <>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>RoseBoutique-Chic | Connexion</title>
    </Head>
    <div className='formulaire container'>
      <div className='fluid-contenu'>
      <h1 className='grand-titre'>Connectez-vous</h1>
        <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
            <div className="form-outline mb-4">
              <input type="email" id="email" className="form-control" name="email" value={email} onChange={handleChangeInput} autoComplete="off" />
              <label className="form-control" htmlFor="email">Veuillez saisir votre Email</label>
            </div>
            <div className="form-outline mb-4">
              <input type="password" id="password" className="form-control" name="password" value={password} onChange={handleChangeInput} autoComplete="off"/>
              <label className="form-control" htmlFor="password">Veuillez saisir votre mot de passe</label>
            </div>
            <button type="submit" className="btn btn-dark w-100">Connexion</button>
            <p className="my-4 text-center">Vous n'avez pas encore de compte ? <Link href="/register"><a>Inscription</a></Link></p>
        </form>
      </div>
    </div>
    </>
  )
}

export default Signin;