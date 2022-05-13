import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useState, useEffect } from 'react';
import valid from '../utils/valid';
import { DataContext } from '../store/GlobalState';
import { postData } from '../utils/fetchData';
import { useRouter } from 'next/router';

const Register = () => {

  const initialState = { name: '', email: '', password: '', confirmPassword: '' }
    const [userData, setUserData] = useState(initialState);
    const { name, email, password, confirmPassword } = userData;

    const {state, dispatch} = useContext(DataContext);
    

    const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: 'NOTIFY', payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return dispatch({ type: 'NOTIFY', payload: {error: errMsg } })

    dispatch({ type: 'NOTIFY', payload: {loading: true} })

    const res = await postData('auth/register', userData);

    if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err} })

    return dispatch({ type: 'NOTIFY', payload: {success: res.msg } })
  }

  return (
    <>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>RoseBoutique-Chic | Inscription</title>
    </Head>
    <div className='container'>
      <div className='fluid-contenu'>
      <h1 className='grand-titre'>Inscrivez-vous</h1>
        <form className="mx-auto my-4" style={{ maxWidth: '500px' }} onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <input type="text" id="name" className="form-control" name="name"  value={name} onChange={handleChangeInput}  />
            <label className="form-label" htmlFor="name">Veuillez saisir votre Nom</label>
          </div>
          <div className="form-outline mb-4">
            <input type="email" id="email" className="form-control" name="email" value={email} onChange={handleChangeInput} />
            <label className="form-label" htmlFor="email">Veuillez saisir votre Email</label>
          </div>
          <div className="form-outline mb-4">
              <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleChangeInput} />
              <label htmlFor="password" className="form-label">Veuillez saisir votre mot de passe</label>
          </div>
          <div className="form-outline mb-4">
              <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleChangeInput} />
              <label htmlFor="confirmPassword" className="form-label">Veuillez confirmer le mot de passe</label>
          </div>
          <button type="submit" className="btn btn-dark w-100">Inscription</button>
          <p className="my-4 text-center">Vous n'avez pas encore de compte ? <Link href="/signin"><a>Connexion</a></Link></p>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;