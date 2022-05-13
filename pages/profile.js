import React, { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import { DataContext } from '../store/GlobalState';
import { CameraOutlined } from '@ant-design/icons';

import valid from '../utils/valid';
import { patchData } from '../utils/fetchData';

import {imageUpload} from '../utils/imageUpload';

function Profile() {

    const initialState = {
        avatar: '',
        email: '',
        name: '',
        password: '',
        confirmPassword: ''
    }

    const [data, setData] = useState(initialState)
    const { avatar, email, name, password, confirmPassword } = data

    const { state, dispatch } = useContext(DataContext);
    const { auth, notify } = state;


    useEffect(() => {
        if (auth.user) setData({ ...data, name: auth.user.name, email: auth.user.email })
    }, [auth.user]);

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]:value })
        dispatch({ type: 'NOTIFY', payload: {} })
    }



    const handleUpdateProfile = (e) => {
        e.preventDefault();
        if(password) {
            const errMsg = valid(name, email, password, confirmPassword)
            if(errMsg) return dispatch({ type: 'NOTIFY', payload: { error: errMsg } })
            updatePassword()
        }

        if(name !== auth.user.name || avatar) updateInfor()
        if(email !== auth.user.email || avatar) updateInfor()
    }

    const updatePassword = () => {
        dispatch({ type: 'NOTIFY', payload: {loading: true} });
        patchData('user/resetPassword', { password }, auth.token)
        .then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })

    }

    const changeAvatar = (e) => {
        const file = e.target.files[0]
        if (!file)
            return dispatch({ type: 'NOTIFY', payload: { error: 'Fichier inexistant.' } })

        if (file.size > 1024 * 1024)
            return dispatch({ type: 'NOTIFY', payload: { error: 'la largeur de la photo doit etre inférieur à 1mb' } })

        if (file.type !== "image/jpeg" && file.type !== "image/png")
            return dispatch({ type: 'NOTIFY', payload: { error: 'Formqt incorrecte.' } })

        setData({ ...data, avatar: file })
    }

    const updateInfor = async () => {
        let media;
        // dispatch({ type: 'NOTIFY', payload: {loading: true} })

        if(avatar) media = await imageUpload([avatar])

        patchData('user', {
            name, email, avatar: avatar ? media[0].url : auth.user.avatar
        }, auth.token).then(res => {
            if(res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })

            dispatch({ type: 'AUTH', payload: {
                token: auth.token,
                user: res.user
            } })
            return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
        })

    }

    if(!auth.user) return null;

  return (
      <>
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>RoseBoutique-Chic | Profile</title>
        </Head>
        <div className="fluid-contenu">
            <div className='container profile-page'>

            <h1 className='grand-titre'>Profile de l'administrateur</h1>

            <section className='row text-secondary my-3 formulaire'>
                <div className="col-md-6">
                

                <div className="avatar">
                    <img src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar} alt={auth.user.avatar} />
                    <span>
                    <CameraOutlined className='icon-camera'/>
                    <p>Change</p>
                    <input type="file" name="file" id="file_up" accept="image/*" onChange={changeAvatar} />
                    </span>
                </div>

                <div className="form-outline mb-4">
                <input type="text" id="name" className="form-control" name="name" autoComplete="off" value={name} onChange={handleChange}/>
                <label className="form-control" htmlFor="name">Nouveau Nom</label>
                </div>
                <div className="form-outline mb-4">
                <input type="email" id="email" className="form-control" name="email" autoComplete="off" value={email} onChange={handleChange} />
                <label className="form-control" htmlFor="email">Nouvel Email</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" className="form-control" id="password" name="password" autoComplete="off" value={password} onChange={handleChange} />
                    <label htmlFor="password" className="form-control">Nouveau mot de passe</label>
                </div>
                <div className="form-outline mb-4">
                    <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" autoComplete="off" value={confirmPassword} onChange={handleChange} />
                    <label htmlFor="confirmPassword" className="form-control">Veuillez confirmer le mot de passe</label>
                </div>
                <button className="btn btn-dark" disabled={notify.loading} onClick={handleUpdateProfile}>Valider</button>
                </div>

                <div className="col-md-6">
                    
                </div>
            </section>
        </div>
    </div>
    </>
  )
}

export default Profile;