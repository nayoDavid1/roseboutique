import Head from 'next/head';
import React, { useContext, useState, useEffect } from 'react';
import { notification, message } from 'antd';
import { useRouter } from 'next/router';

function Contact() {

  const initialState = { name: '', email: '', telephone: '', message: '' }
  const [userData, setUserData] = useState(initialState);
  const { email, name, telephone, message } = userData;

  const router = useRouter();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
}

const notificationSuccess = type => {
  notification[type]({
    message: 'Email envoé',
    description:
      'Votre email a bien été envoyé, nous vous répondrons dans les plus brefs délais',
  });
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch('/api/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    }).then((res) => {
      if(res.status === 200) {
        notificationSuccess('success');
        router.push('/')
      }
    })
  }

  return (
    <>
    <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>RoseBoutique-Chic | Contact</title>
    </Head>
    <div className="formulaire fluid-contenu">
      <div className='container'>

    <div className="contact-page">

      <div className='contact-page-text'>
        <h1 className='grand-titre'>Ecrivez-nous</h1>
        <p>Merci de remplir ce formulaire en suivant toutes les instructions mentionnées dans les champs.</p>
        <p>Merci de saisir votre numéro de téléphone avec l'indicatif de votre pays de résidence pour un meilleur contact téléphonique</p>
      </div>
      
      <form className="mx-auto my-4" onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <input type="text" id="name" className="form-control" name="name" value={name} onChange={handleChangeInput} autoComplete="off" required/>
          <label className="form-control" htmlFor="name">Nom</label>
        </div>
        <div className="form-outline mb-4">
          <input type="email" id="email" className="form-control" name="email" value={email} onChange={handleChangeInput} autoComplete="off" required/>
          <label className="form-control" htmlFor="email">Email</label>
        </div>
        <div className="form-outline mb-4">
          <input type="text" id="telephone" className="form-control" name="telephone" value={telephone} onChange={handleChangeInput} autoComplete="off" required/>
          <label className="form-control" htmlFor="telephone">Numéro de téléphone</label>
        </div>
        <div className="form-outline mb-2 mt-3">
            <textarea className="form-control" id="message" rows="5" name="message" value={message} onChange={handleChangeInput} required></textarea>
            <label className="form-control" htmlFor="message">Message</label>
        </div>
        <button type="submit" className="btn btn-dark w-10 rounded-4">Envoyer</button>      
      </form>
    </div>
      </div>
    </div>
    </>
  )
}

export default Contact;