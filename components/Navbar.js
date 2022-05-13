import React, { useContext, useState, useEffect } from 'react';
import { Layout, Menu, Drawer, Button, Avatar, Dropdown, Space } from 'antd';
import { HomeOutlined, WindowsOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext }  from '../store/GlobalState';
import Cookie from 'js-cookie';
import { DownOutlined, SmileOutlined, AppstoreOutlined } from '@ant-design/icons';

function Navbar() {
  const [scroll, setScroll] = useState(false)
  const router = useRouter();
  const {state, dispatch} = useContext(DataContext);
  const { auth } = state;


  const isActiveNav = (r) => {
    if (r === router.pathname) {
        return ' activeNav'
    } else {
        return ''
    }
}

  const [visible, setVisible] = useState(false);
  const [size, setSize] = useState();
  const showDrawer = () => {
    setVisible(true);
  };

  const showDefaultDrawer = () => {
    setSize('default');
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };


  const handleLogout = () => {
    Cookie.remove('refreshtoken', {path: 'api/auth/accessToken' })
    localStorage.removeItem('firstLogin')
    dispatch({ type: 'AUTH', payload: {} })
    dispatch({ type: 'NOTIFY', payload: {success: 'Logged out!'} })
    return router.push('/')
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10)
    })
  }, [])

  return (
    <>
    <nav className={scroll ? "navbar fixed-top navbar-expand-lg navbar-light bg-light active" : "navbar fixed-top navbar-expand-lg navbar-light bg-light"}>
      <div className="container">
        <Link href="/">
          <a className="logo">RoseBoutique-Chic</a>
        </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/">
                <a className={"nav-link" + isActiveNav('/')}>Accueil</a> 
              </Link>
            </li>
            {
              Object.keys(auth).length === 0 ?
              <>
            <li className="nav-item">
              <Link href='/contact'>
                <a className={"nav-link" + isActiveNav('/contact')}>Contact</a>
              </Link>
            </li>
            </> : <> </>
            
          }


            {
              Object.keys(auth).length === 0 ?
              <>
              <li className="nav-item">
                <Link href="/signin">
                  <a className={"nav-link" + isActiveNav('/signin')}><i className="fa-solid fa-unlock-keyhole"></i>{" "}{" "}Connexion</a>
                </Link>
              </li>
              </>
              : 
              <>
              
              <li className="nav-item">
                <Link href='/create'>
                  <a className={"nav-link" + isActiveNav('/create')}><AppstoreOutlined className='icone-nav' /> {" "}Gestion des articles</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href='/categories'>
                  <a className={"nav-link" + isActiveNav('/categories')}><AppstoreOutlined className='icone-nav' /> {" "}Gestion des catégories</a>
                </Link>
              </li>
              <li className="nav-item">
                <Link href='/profile'>
                  <a className={"nav-link" + isActiveNav('/profile')}>Profile</a>
                </Link>
              </li>
              <li className="nav-item">
                <a className="text-center logout" onClick={handleLogout}>
                  Déconnexion
                </a>
              </li>
              
              </>
            
            }

          </ul>
      </div>
    </nav>
          <div className='mobileVisible'>
              <Button onClick={showDefaultDrawer}>
                <i className="fa-solid fa-bars"></i>
              </Button>
              <Drawer placement="right" onClose={onClose} visible={visible} size={size}>
                <div className="onglet-mobile">
                    <ol className="nav-item" onClick={onClose}>
                      <Link href="/">
                        <a className={"nav-link" + isActiveNav('/')}>Accueil</a> 
                      </Link>
                    </ol>
                    {
                      Object.keys(auth).length === 0 ?
                      <>
                    <ol className="nav-item" onClick={onClose}>
                      <Link href='/contact'>
                        <a className={"nav-link" + isActiveNav('/contact')}>Contact</a>
                      </Link>
                    </ol>
                    </> : <> </>
                    
                  }
                  {
                  Object.keys(auth).length === 0 ?
                  <>
                  <ol className="nav-item" onClick={onClose}>
                    <Link href="/signin">
                      <a className={"nav-link" + isActiveNav('/signin')}><i className="fa-solid fa-unlock-keyhole"></i>{" "}{" "}Connexion</a>
                    </Link>
                  </ol>
                  </>
                  : 
                  <>
                  
                  <ol className="nav-item" onClick={onClose}>
                    <Link href='/create'>
                      <a className={"nav-link" + isActiveNav('/create')}><AppstoreOutlined className='icone-nav' /> {" "}Gestion des articles</a>
                    </Link>
                  </ol>
                  <ol className="nav-item" onClick={onClose}>
                    <Link href='/categories'>
                      <a className={"nav-link" + isActiveNav('/categories')}><AppstoreOutlined className='icone-nav' /> {" "}Gestion des catégories</a>
                    </Link>
                  </ol>
                  <ol className="nav-item" onClick={onClose}>
                    <Link href='/profile'>
                      <a className={"nav-link" + isActiveNav('/profile')}>Profile</a>
                    </Link>
                  </ol>
                  <ol className="nav-item" onClick={onClose}>
                    <a className="text-center logout" onClick={handleLogout}>
                      Déconnexion
                    </a>
                  </ol>
                  
                  </>
                
                }
                </div>
              </Drawer>
          </div>
    
    </>
  )
}

export default Navbar;