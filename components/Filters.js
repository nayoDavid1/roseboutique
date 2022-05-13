import Reaact, { useState, useEffect } from 'react';
import FilterModule from '../utils/FilterModule';
import { getData } from '../utils/fetchData';
import { useRouter } from 'next/router';
import { Select } from 'antd';
const { Option } = Select;

const Filters = ({ state }) => {
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('')
    const [category, setCategory] = useState('')

    const { categories } = state;

    const router = useRouter()

    const handleCategory = (e) => {
        setCategory(e.target.value)
        FilterModule({ router, category: e.target.value })
    }

    function handleChange(category) {
        setCategory(category)
        FilterModule({ router, category })
      }

    useEffect(() => {
        FilterModule({ router, search: search ? search : 'all' })
    }, [search])

    return (
        <div className="input-group">
            <div className="input-group-prepend col-md-4 px-0 mt-2">
                <span className="titre-barres-recherches">Sélectionnez une catégorie</span><br /><br />
                <Select defaultValue={category} onChange={handleChange} style={{ width: 300 }}>
                    <Option value="all">Tous les articles</Option>
                    {
                        categories.map(item => (
                            <Option key={item._id} value={item._id}>{item.name}</Option>
                        ))
                    }
                </Select>
            </div>
            <div className="col-md-2">

            </div>

            <form autoComplete="off" className="mt-2 col-md-6 px-0">
                <span className="titre-barres-recherches">Saisissez le nom d'un article</span><br /><br />
                <input type="text" placeholder='Quel article recherchez-vous ?' className="form-control search" list="Titre des articles"
                    value={search.toLowerCase()} onChange={e => setSearch(e.target.value)}
                />

            </form>


        </div>
    )
}

export default Filters;