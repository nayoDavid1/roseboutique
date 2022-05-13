import connectDB from '../../../utils/connectDB'
import Categories from '../../../models/categories'
import Articles from '../../../models/article'
import auth from '../../../middleware/auth';

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "PUT":
            await updateCategory(req, res)
            break;
        case "DELETE":
            await deleteCategory(req, res)
            break;
    }
}

const updateCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: "Authentication invalide." })

        const { id } = req.query
        const { name } = req.body

        const newCategory = await Categories.findOneAndUpdate({ _id: id }, { name })
        res.json({
            msg: "Success! Mise à jour de la categorie",
            category: {
                ...newCategory._doc,
                name
            }
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: "Authentication invalide." })

        const { id } = req.query

        const articles = await Articles.findOne({ category: id })
        if (articles) return res.status(400).json({
            err: "Veuillez supprimer d'abord tous les articles de cette catégorie"
        })

        await Categories.findByIdAndDelete(id)

        res.json({ msg: "Success! Suppression réussit" })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}