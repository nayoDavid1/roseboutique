import connectDB from '../../../utils/connectDB'
import Articles from '../../../models/article'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "GET":
            await getArticles(req, res)
            break;
        case "POST":
            await createArticle(req, res)
            break;
    }
}


class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = { ...this.queryString }

        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(el => delete (queryObj[el]))

        if (queryObj.category !== 'all')
            this.query.find({ category: queryObj.category })
        if (queryObj.title !== 'all')
            this.query.find({ title: { $regex: queryObj.title } })

        this.query.find()
        return this;
    }

    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join('')
            this.query = this.query.sort(sortBy)
        } else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 4
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}


const getArticles = async (req, res) => {
    try {
        const features = new APIfeatures(Articles.find(), req.query)
            .filtering().sorting().paginating()

        const articles = await features.query
        res.json({
            status: 'Success',
            result: articles.length,
            articles
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    };
};

const createArticle = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin') return res.status(400).json({ err: 'Authentication invalide.' })

        const { title, price, inStock, description, content, category, images } = req.body

        if ( !title || !price || !inStock || !description || !content || category === 'all' || images.length === 0)
            return res.status(400).json({ err: 'Merci de vérifier les champs.' })

        const newArticle = new Articles({
            title: title.toLowerCase(), price, inStock, description, content, category, images
        })

        await newArticle.save()

        res.json({ msg: 'Success! Nouvel Article créé' })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

