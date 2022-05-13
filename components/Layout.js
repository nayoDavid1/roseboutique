import React from 'react';
import Navbar from './Navbar';
import Notify from './Notify';
import Modal from './Modal';
import { Carousel } from 'antd';
import Link from 'next/link';
import {
    FacebookIcon,
    FacebookShareButton,
    WhatsappIcon,
    WhatsappShareButton,
    InstapaperShareButton,
    InstapaperIcon,
    TelegramShareButton,
    TelegramIcon,
    EmailIcon,
    EmailShareButton
  } from "react-share";

function Layout({ children }) {
    return (
        <div>
            <div className="popup">
            <a
                href="https://wa.me/+212634133122"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="icon"><i className="fa-brands fa-whatsapp"></i></div>
                <div className="content">WhatsApp</div>
            </a>
            </div>
            <div className="popup-1">
            <a
                href="https://web.facebook.com/Rose-boutique-110163938309034"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="icon-facebook"><i className="fa-brands fa-facebook-f"></i></div>
                <div className="content">Facebook</div>
            </a>
            </div>
            <div className="popup-2">
            <a
                href="#"
                className="whatsapp_float"
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className="icon"><i className="fa-brands fa-instagram"></i></div>
                <div className="content">Instagram</div>
            </a>
            </div>
   
            <Navbar />
            <Notify />
            <Modal />
                <div className="banniere">
                    <div className="container">
                        <div className="contenu">
                            <div className="contenu-droit">
                                    <h1 className="mb-3">RoseBoutique-<span className='font-style'>Chic</span></h1>
                                <Carousel autoplay>
                                <div>
                                    <h4 className="mb-3">Pour une mode et un style de valeur</h4>
                                </div>
                                <div>
                                    <h4 className="mb-3">Vente de divers articles</h4>
                                </div>
                                <div>
                                    <h4 className="mb-3">Faites votre choix</h4>
                                </div>
                                </Carousel>
                                <Link href='/contact'>
                                    <a className="btn btn-principal" role="button">Contactez-nous maintenant</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            {children}
            <footer className="text-center text-lg-start text-muted">
                <div className='container text-center footer-contenu'>
                <Link href="/">
                    <a className="logo">RoseBoutique-Chic</a>
                </Link>
                <div className='footer-info'>
                    <div className="bouton">
                        <span>Partagez</span>
                        <div className='bouton-social'>
                        <FacebookShareButton url={"https://www.roseboutique-chic.com"}>
                           <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>

                        <WhatsappShareButton url={"https://www.roseboutique-chic.com"}>
                           <WhatsappIcon size={40} round={true} />
                        </WhatsappShareButton>

                        <InstapaperShareButton url={"https://www.roseboutique-chic.com"}>
                           <InstapaperIcon size={40} round={true} />
                        </InstapaperShareButton>

                        <TelegramShareButton url={"https://www.roseboutique-chic.com"}>
                           <TelegramIcon size={40} round={true} />
                        </TelegramShareButton>

                        <EmailShareButton url={"https://www.roseboutique-chic.com"}>
                           <EmailIcon size={40} round={true} />
                        </EmailShareButton>
                        </div>
                    </div>
                    <div className="copyright">
                        © 2022 Copyright: <Link href="/"><a className='site-horeb'>RoseBoutique-Chic.com</a></Link>
                    </div>
                    <div className="heberger">
                    Développé et hébergé par{" "}
                    <Link href="https://horebmastertech.com">
                        <a target="_blank" className="site-horeb">HorebMasterTech</a>
                    </Link>
                    </div>
                </div>
                </div>
            </footer>
        </div>
    );
}

export default Layout;