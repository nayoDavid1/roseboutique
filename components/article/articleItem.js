import Link from 'next/link';
import { useContext } from 'react';
import { DataContext } from '../../store/GlobalState';

const ArticleItem = ({article, handleCheck}) => {
    const { state, dispatch } = useContext(DataContext);
    const { auth } = state;

    const userLink = () => {
        return (
            <Link href={`article/${article._id}`}>
                <a className="btn carde-btn">Voir le détail</a>
            </Link>
        )
    }

    const adminLink = () => {
        return (
            <>
            <Link href={`create/${article._id}`}>
                <a className="btn carde-btn">Modifier</a>
            </Link>
            <button className="btn btn-supprimer btn-danger" style={{ marginLeft: '5px', flex: 1 }} 
            data-bs-toggle="modal" data-bs-target="#exampleModal" 
            onClick={() => dispatch({ type: 'ADD_MODAL', payload: [{ data: '', id: article._id, title: article.title, type: 'DELETE_ARTICLE' }] })}>
                Supprimer
            </button>
            </>
        )
    }



    return(
        <div>
            <div className="card" style={{ width: '20rem' }}>
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={article.checked} 
                className="position-absolute"
                style={{ height: '20px', width: '20px', zIndex: 1 }}
                onClick={() => handleCheck(article._id)}
                />
            }
            <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={article.images[0].url} alt={article.images[0].url} className="img-fluid"/>
                <a href="#!">
                <div className="mask bg-black"></div>
                </a>
            </div>
            <div className="card-body text-center">

                <h3 className="card-title text-capitalize" title={article.title}>{article.title}</h3>
                <p className="card-text" title={article.description}>{article.description}
                </p>
                {!auth.user || auth.user.role !== 'admin' ? userLink() : adminLink() }
            </div>
            </div>
        </div>
    )
};

export default ArticleItem;