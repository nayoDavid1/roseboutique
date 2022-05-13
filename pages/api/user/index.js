import connectDB from '../../../utils/connectDB'
import Users from '../../../models/user'
import auth from '../../../middleware/auth'

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "PATCH":
            await uploadInfor(req, res)
            break;
        case "GET":
            await getUsers(req, res)
            break;
    }
}

const getUsers = async (req, res) => {
    try {
        const result = await auth(req, res)
        if (result.role !== 'admin')
            return res.status(400).json({ err: "Authentication invalide" })

        const users = await Users.find().select('-password')
        res.json({ users })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


const uploadInfor = async (req, res) => {
    try {
        const result = await auth(req, res)
        const { name, avatar, email } = req.body

        const newUser = await Users.findOneAndUpdate({ _id: result.id }, { name, avatar, email }).select("-password")

        res.json({
            msg: "Mise à jour réussit!",
            user: {
                name,
                avatar,
                email,
                role: newUser.role
            }
        })
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}


