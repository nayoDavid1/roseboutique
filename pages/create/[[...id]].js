import Head from 'next/head'
import { useState, useContext, useEffect } from 'react'
import { DataContext } from '../../store/GlobalState'
import { imageUpload } from '../../utils/imageUpload'
import { postData, getData, putData } from '../../utils/fetchData'
import { useRouter } from 'next/router';
import { Select } from 'antd';
const { Option } = Select;


const GestionArticles = () => {

    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: ''
    }

    const [article, setArticle] = useState(initialState)
    const { title, price, inStock, description, content, category } = article

    const [images, setImages] = useState([]);

    const { state, dispatch } = useContext(DataContext)
    const { auth, categories } = state

    const router = useRouter()
    const { id } = router.query;
    const [onEdit, setOnEdit] = useState(false);

    useEffect(() => {
        if(id) {
            setOnEdit(true);
            getData(`article/${id}`).then(res => {
                setArticle(res.article)
                setImages(res.article.images)
            })
        } else {
            setOnEdit(false)
            setArticle(initialState)
            setImages([])
        }
    }, [id])

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setArticle({ ...article, [name]:value })
    }

    const handleUploadInput = e => {
        dispatch({ type: 'NOTIFY', payload: {}})
        let newImages = []
        let num = 0
        let err = ''
        const files = [...e.target.files]

        if(files.length === 0) 
        return  dispatch({ type: 'NOTIFY', payload: {error: 'Fichier inexistant.'}})
        
        files.forEach(file => {
            if(!file.size > 1024 * 1024)
            return err = 'le fiichier doit être inférieur à 1mb.'

            if (file.type !== 'image/jpeg' && file.type !== 'image/png')
            return err = 'Format de fichier incorrecte'

            num += 1;
            if (num <= 5) newImages.push(file)
            return newImages;
        })
        if (err) dispatch({ type: 'NOTIFY', payload: { error: err } })

        const imgCount = images.length
        if(imgCount + newImages.length > 5) 
        return dispatch({ type: 'NOTIFY', payload: {erro: "Vous devez choisir 5 images."} })
        setImages([ ...images, ...newImages ])
    }

    function handleChange(category) {
        console.log(`selected ${category}`);
        setArticle({ ...article, category })
      }

      const deleteImage = index => {
          const newArr = [...images]
          newArr.splice(index, 1)
          setImages(newArr)
      }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(auth.user.role !== 'admin')
        return dispatch({ type: 'NOTIFY', payload: {error: 'Authentification invalide.'} })

        if ( !title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
        return dispatch({ type: 'NOTIFY', payload: {error: 'Merci de vérifier les champs.'} })

        dispatch({type: 'NOTIFY', payload: {loading: true} })
        let media = []
        const imgNewURL = images.filter(img => !img.url)
        const imgOldURL = images.filter(img => img.url)

        if(imgNewURL.length > 0) media = await imageUpload(imgNewURL)

        let res;
        if(onEdit) {
            res = await putData(`article/${id}`, {...article, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})
        }else {
            res = await postData('article', {...article, images: [...imgOldURL, ...media]}, auth.token)
            if(res.err) return dispatch({ type: 'NOTIFY', payload: {error: res.err}})
        }
        
        return dispatch({ type: 'NOTIFY', payload: { success: res.msg } })
    }

    if(!auth.user) return null;
 
    return (
        <>
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>RoseBoutique-Chic | Articles</title>
            </Head>
            <div className="fluid-contenu">
        <div className='page-gestion-article container formulaire'>

        <h1 className='grand-titre'>Création d'article</h1>

                <form className='row' onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <div className="form-outline mb-2 mt-3">
                            <input type="text" id="title" className="form-control" name="title" autoComplete="off" value={title} onChange={handleChangeInput} />
                            <label className="form-control" htmlFor="title">Nom de l'Article</label>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-outline mb-2 mt-3">
                                <input type="number" id="price" className="form-control" name="price" autoComplete="off" value={price} onChange={handleChangeInput} />
                                <label className="form-control" htmlFor="price">Prix de l'Article</label>
                            </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-outline mb-2 mt-3">
                                <input type="number" id="inStock" className="form-control" name="inStock" autoComplete="off" value={inStock} onChange={handleChangeInput} />
                                <label className="form-control" htmlFor="inStock">Article en stock</label>
                            </div>
                            </div>
                        </div>
                        <div class="form-outline mb-2 mt-3">
                            <textarea className="form-control" id="description" rows="4" name="description" value={description} onChange={handleChangeInput}></textarea>
                            <label className="form-control" htmlFor="description">Description de l'Article</label>
                        </div>
                        <div className="form-outline mb-2 mt-3">
                            <textarea className="form-control" id="content" rows="5" name="content" value={content} onChange={handleChangeInput}></textarea>
                            <label className="form-control" htmlFor="content">Contenu</label>
                        </div>
                        <div className="mb-2 mt-3">
                            <span className='categorie'>Catégorie</span><br />
                        <Select defaultValue={category} name="category" onChange={handleChange} style={{ width: 300 }}>
                            <Option value="All">Tous articles</Option>
                            {
                                categories.map(item => (
                                    <Option key={item._id} value={item._id}>{item.name}</Option>
                                ))
                            }
                        </Select>
                        </div>

                    <button type='submit' className='btn btn-creation my-3 px-4'>
                        {onEdit ? "Mise à jour" : "Créer"}
                    </button>


                    </div>
                    <div className="col-md-6 my-4">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <div class="custom-file border rounded">
                                <input type="file" name="" className="custom-file-input"
                                    onChange={handleUploadInput} multiple accept="image/*" id=""/>
                            </div>
                        </div>
                        <div className="row img-up">
                            {
                                images.map((img, index) => (
                                    <div key={index} className="file_img my-2">
                                        <img src={img.url ? img.url : URL.createObjectURL(img)} alt="" className='img-thumbnail rounded' />
                                        <span onClick={() => deleteImage(index)}>x</span>
                                    </div>
                                ))
                            }
                        </div>
                    
                    </div>
                </form>
        </div>
        </div>
        </>
    )
}

export default GestionArticles;