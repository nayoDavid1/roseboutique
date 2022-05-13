import connectDB from '../../../utils/connectDB';
import Articles from '../../../models/article';
import auth from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getArticle(req, res)
            break;
        case "PUT":
            await updateArticle(req, res)
            break;
        case "DELETE":
            await deleteArticle(req, res)
            break;
    }
}


const getArticle = async (req, res) => {
    try {
        const { id } = req.query;

        const article = await Articles.findById(id)
        if (!article) return res.status(400).json({ err: "Cet article n'existe pas." })

        res.json({
            article
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const updateArticle = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication incorrecte.' })

        const { id } = req.query
        const { title, price, inStock, description, content, category, images } = req.body

        if (!title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
            return res.status(400).json({ err: 'Veuillez vérifier les champs svp.' })

        await Articles.findOneAndUpdate({ _id: id }, {
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        res.json({ msg: 'Success! Mise à jour du produit réussit' })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const deleteArticle = async (req, res) => {
    try {
        const result = await auth(req, res)

        if (result.role !== 'admin')
            return res.status(400).json({ err: 'Authentication incorrecte.' })

        const { id } = req.query

        await Articles.findByIdAndDelete(id)
        res.json({ msg: "Suppression de l'article." })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}