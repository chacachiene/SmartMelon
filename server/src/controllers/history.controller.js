import History from "../models/History.js";

export const getAllHistory = async (req, res) => {
    try {
        const history = await History.find();
        res.status(200).json(history);

    } catch(err) {
        res.status(404).json({message: err});
    }
}

export const createHistory = async (req, res) => {
    const history = req.body;
    const newHistory = new History(history);
    try {
        await newHistory.save();
        res.status(201).json(newHistory);
    } catch(err) {
        res.status(409).json({message: err});
    }
}
