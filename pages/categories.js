import Head from 'next/head';
import React, { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { updateItem } from '../store/Actions';
import { postData, putData } from '../utils/fetchData';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Categories = () => {
    const [name, setName] = useState('')
    const { state, dispatch } = useContext(DataContext);
    const { auth, categories } = state;

    const [id, setId] = useState('');

    const createCategory = async () => {
        if (auth.user.role !== 'admin') return dispatch({ type: 'NOTIFY', payload: {error: "Authentification invalide"}})

        if(!name) return dispatch({ type: 'NOTIFY', payload: {error: "Veuillez saisir la Catégorie."}})

        dispatch({ type: 'NOTIFY', payload: {loading: true}})

        let res;
        if(id) {
            res = await putData(`categories/${id}`, {name}, auth.token)
            if(res.err)  return dispatch({ type: 'NOTIFY', payload: {error: res.err}})
            dispatch(updateItem(categories, id, res.category, 'ADD_CATEGORIES'))

        } else {
            res = await postData('categories', { name }, auth.token)
            if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
            dispatch({ type: "ADD_CATEGORIES", payload: [...categories, res.newCategory] })

        }

        setName('')
        setId('')
        return dispatch({ type: 'NOTIFY', payload: {success: res.msg}})
    }

    const handleEditCategory = (category) => {
        setId(category._id)
        setName(category.name)

    }

    if(!auth.user) return null;

    return (
        <>
        <Head>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>RoseBoutique-Chic | Categories</title>
        </Head>
        <div className="fluid-contenu">
        <div className="container page-categories formulaire">

        <h1 className='grand-titre'>Gestion des catégories</h1>

            <div className="row">
                <div className="col-md-6 mx-auto my-3">

                    <div className="form-outline mb-2 mt-3">
                        <input type="text" id="name" className="form-control" name="name" autoComplete="off" value={name} onChange={e => setName(e.target.value)}/>
                        <label className="form-control" htmlFor="name">Nouvelle catégorie</label>
                    </div>
                    <button className="btn btn-dark" onClick={createCategory}>
                        {id ? "Mise à jour" : "Créer"}
                    </button>
                </div>

                <div className="col-md-6 mx-auto my-3">
                {
                    categories.map(category => (
                        <div key={category._id} className="card my-2 text-capitalize">
                            <div className='card-body d-flex justify-content-between'>
                                {category.name}

                                <div style={{ cursor: 'pointer' }}>
                                    <EditOutlined className="icone-edit" title="Mise à jour" onClick={() => handleEditCategory(category)} />

                                    <DeleteOutlined className="icone-delete" data-bs-toggle="modal" data-bs-target="#exampleModal" 
                                        onClick={() => dispatch({
                                            type: 'ADD_MODAL',
                                            payload: [{ data: categories, id: category._id, title: category.name, type: 'ADD_CATEGORIES' }]
                                        })}
                                    />
                                </div>

                            </div> 
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default Categories;

