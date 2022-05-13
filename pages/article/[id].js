import { useState } from 'react';
import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { Modal, Button } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';

const DetailArticle = (props) => {
    const [article] = useState(props.article)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const router = useRouter();

    const [tab, setTab] = useState(0);

    const isActive = (index) => {
        if (tab === index) return " activeImage";
        return ""
    }

    function info() {
        Modal.info({
          title: 'Numéro du vendeur',
          content: (
            <div>
              <p>+212699387270</p>
            </div>
          ),
          onOk() {},
        });
      }

    return (
        <div className="fluid-contenu">
            <Head>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>RoseBoutique-Chic | Détails Article</title>
            </Head>
        <div className='container'>
        <h1 className='grand-titre'>Détail de l'article</h1>
            <div className="row">
                <div className="col-md-6">
                    <img src={article.images[tab].url} alt={article.images[tab].url} className="d-block img-thumbnail rounded mt-4 w-100" style={{ height: '400px' }}/>

                    <div className="row mx-0" style={{ cursor: 'pointer' }}>
                        {article.images.map((img, index) => (
                            <img key={index} src={img.url} alt={img.url} 
                            className={`img-thumbnail rounded ${isActive(index)}`} style={{ height: '80px', width: '20%' }}
                            onClick={() => setTab(index)}
                            />
                        ))}
                    </div>
                
                </div>

                <div className="col-md-6 mt-5">
                    <h2 className="text-uppercase h2-detail-article">{article.title}</h2>
                    {/* <h5 className="text-danger">$ {article.price}</h5> */}

                    {/* <div class="row mx-0 d-flex justify-content-between">
                        {
                            article.inStock > 0
                                ? <h6 className="text-danger">In Stock: {article.inStock}</h6>
                                : <h6 className="text-danger">Out Stock</h6>
                        }
                        <h6 className="text-danger">Sold: {article.sold}</h6>
                    </div> */}
                    <div className="my-2 h5 text-description">{article.description}</div>
                    <div className="my-2 h5 text-description">{article.content}</div>

                    <div>
                        <a className="btn carde-btn my-5" onClick={info}>
                            Afficher le numéro
                        </a>
                        <Link href='/contact'>
                            <a className="btn carde-btn mx-2 my-5" >
                                Ecrire au vendeur
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
};

export async function getServerSideProps({ params: {id} }) {
    const res = await getData(`article/${id}`); 
  
    return {
      props: { article: res.article },
    }
  };

export default DetailArticle;