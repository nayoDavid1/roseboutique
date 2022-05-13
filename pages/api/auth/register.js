import connectDB from '../../../utils/connectDB';
import { hashPassword, comparePassword } from "../../../utils/auth";
import Users from '../../../models/user';
import valid from '../../../utils/valid';
import { nanoid } from 'nanoid';

connectDB()

export default async (req, res) => {
    switch (req.method) {
        case "POST":
            await register(req, res)
            break;
    }
}

const register = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        const errMsg = valid(name, email, password, confirmPassword)
        if (errMsg) return res.status(400).json({ err: errMsg })

        const user = await Users.findOne({ email })
        if (user) return res.status(400).json({ err: 'Email déjà utilisé.' })
        // hash password
        const hashedPassword = await hashPassword(password);

        const newUser = new Users({
            name, email, password: hashedPassword, confirmPassword
        })

        await newUser.save()
        res.json({ msg: "Inscription réussit!" })

    } catch (err) { 
        return res.status(500).json({ err: err.message })
    }
};