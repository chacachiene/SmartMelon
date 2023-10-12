

// let getAllUsers = async (req, res) => {
//     try {
//         let users = await User.find({})
//         return res.status(200).json(users)
//     } catch (error) {
//         return res.status(500).json(error)
//     }
// }

// let createUser = async (req, res) => {
//     try{
//         let user = await User.createUser(req.body)
//         return res.status(201).json({
//             "user": user,
//             "message": "User created successfully"
//         })
//     }
//     catch(error){
//         return res.status(500).json(error)
//     }
// }


import User from "../models/User.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);

    } catch(err) {
        res.status(404).json(err);
    }
}

