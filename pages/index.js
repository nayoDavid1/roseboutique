import Head from 'next/head';
import { getData } from '../utils/fetchData';
import React, { useState, useContext, useEffect } from 'react';
import ArticleItem from '../components/article/articleItem';
import { DataContext } from '../store/GlobalState';
import FilterModule from '../utils/FilterModule';

import { useRouter } from 'next/router'
import Filters from '../components/Filters';

const  Home = (props) => {
  const { state, dispatch } = useContext(DataContext)
    const { auth } = state;
  const [articles, setArticles] = useState(props.articles);

  const [isChecked, setIsChecked] = useState(false)

  const [page, setPage] = useState(1)

  const router = useRouter();

  useEffect(() => {
    setArticles(props.articles)
  }, [props.articles])

  useEffect(() => {
    if (Object.keys(router.query).length === 0) {
      setPage(1)
    }

  }, [router.query])

  const handleCheck = (id) => {
    articles.forEach(article => {
      if(article._id === id) article.checked = !article.checked;
    })
    setArticles([...articles])
  }

  const handleCheckALL = () => {
    articles.forEach(article => article.checked = !isChecked)
    setArticles([...articles])
    setIsChecked(!isChecked)
  }

  const handleDeleteAll = () => {
    let deleteArr = [];
    articles.forEach(article => {
      if(article.checked) {
        deleteArr.push({ 
          data: '', 
          id: article._id, 
          title: 'Supprimer tous les articles sélectionnés ?', 
          type: 'DELETE_ARTICLE' })
      }
    })
    dispatch({ type: 'ADD_MODAL', payload: deleteArr })
  }

   const handleLoadmore = () => {
    setPage(page + 1)
    FilterModule({ router, page: page + 1 })
   }

  return (
    <>
    <Head>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>RoseBoutique-Chic | Accueil</title>
    </Head>
    <div className="fluid-contenu page-1">
      <div className='container page-accueil'>
      <h1 className='grand-titre'>Découvrez nos articles</h1>
      <Filters state={state} />
    {
      auth.user && auth.user.role === 'admin' &&
      <div className="btn-delete-all btn mt-2" style={{ marginBottom: '-10px' }}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckALL} style={{ width: '25px', height: '25px', transform: 'tranlateY(8px)' }} />
        <button className="btn btn-danger ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal"
          onClick={handleDeleteAll}
        >
          Tout supprimer
        </button>
      </div>
    }
        <div className="cadre">
          {
            articles.length === 0
            ? <h2>Aucun articles disponibles pour le moment</h2>
            : articles.map(article => (
              <ArticleItem key={article._id} article={article} handleCheck={handleCheck} />
              
            ))
          }
        </div>


        <div className='text-center'>
          {
            props.result < page * 4 ? ""
            : <button className='btn btn-outline-info mt-5 charger-plus' onClick={handleLoadmore}>
                Charger plus d'articles
              </button>
          }
        </div>

      </div>
    </div>

    </>
  );
};

export async function getServerSideProps({ query }) {

  const page = query.page || 1
  const category = query.category || 'all'
  const sort = query.sort || ''
  const search = query.search || 'all'

  const res = await getData(
    `article?limit=${page * 4}&category=${category}&sort=${sort}&title=${search}`
  )

  return {
    props: {
      articles: res.articles,
      result: res.result
    },
  }
};

export default Home;