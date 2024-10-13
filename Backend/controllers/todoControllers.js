import TodoModel from "../model/todoSchema.js";

export const getData = async (req, res) => {
    const data = await TodoModel.find();
    console.log(data)
    if (!data) {
        res.json({
            message: "Internal Server Error",
            status: false
        })
    } else {
        res.json({
            message: "Todos Get",
            status: true,
            data: data,
        })
    }
}

export const SendDate = async (req, res) => {
    const body = req.body;
    console.log("Body Data", body)
    if (!body.todo) {
        // res.status(400).json({
        res.json({
            message: "Required Fields are missing",
            status: false
        })
        return;
    }


    const obj = {
        todo: body.todo
    }
    const data = await TodoModel.create(obj);
    if (!data) {
        res.json({
            message: "Internal Server Error",
            status: false
        })
    } else {
        res.json({
            message: "Successfully Created ",
            status: true
        })

    }
}

export const DeleteData = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    const data = await TodoModel.findByIdAndDelete(id);
    if (!data) {
        res.json({
            message: "Internal Server Error",
            status: false
        })
    } else {
        res.json({
            message: "Successfully Deleted ",
            status: true
        })
    }
}

export const UpdateData = async (req, res) => {
    const body = req.body;
    if (!body.todo) {
        // res.status(400).json({
        res.json({
            message: "Required Fields are missing",
            status: false
        })
        return;
    }
    const obj = {
        todo: body.todo
    }
    const data = await TodoModel.findByIdAndUpdate(body.id, obj);
    if (!data) {
        res.json({
            message: "Internal Server Error",
            status: false
        })
    } else {
        res.json({
            message: "Successfully Updated ",
            status: true
        })

    }
}