import EmployeModal from "../model/EmpolyeSchema.js";

const getAllEmploye = async (req, res) => {

    try {
        let { page, limit, search } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;

        let searchCriteria = {};
        if (search) {
            searchCriteria = {
                name: {
                    $regex: search,
                    $options: 'i',
                }
            }
        }

        const totalEmployes = await EmployeModal.countDocuments(searchCriteria)

        const emp = await EmployeModal.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({ updatedAt: -1 });

        const totalpages = Math.ceil(totalEmployes / limit)

        res.json({
            message: "All Employees",
            status: true,
            data: {
                Employes: emp,
                pagination: {
                    totalEmployes,
                    currentpage: page,
                    totalpages,
                    pageSize: limit,
                }
            }
        })
    }
    catch (err) {
        console.log(err)
        res.json({
            message: 'Internal Server Error',
            status: false,
            error: err
        })

    }

}
const getEmployeById = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await EmployeModel.findOne({ _id: id });
        res.json({
            message: 'Employe Details',
            status: true,
            data: emp
        });
    } catch (err) {
        console.log(err);
        res.json({
            message: 'Internal Server Error',
            status: false,
            error: err
        })
    }
}
const createEmploye = async (req, res) => {

    try {
        const body = req.body;
        body.profileImage = req.file ? req.file.path : null;
        const emp = new EmployeModal(body);
        await emp.save()
        res.json({
            message: "Employe Created Successfully",
            status: true,
        })
    }
    catch (err) {
        res.json({
            message: 'Internal Server Error',
            status: false,
            error: err
        })

    }

}
const updateEmploye = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, phone, department, salary } = req.body;

        let updateData = {
            name, email, phone, department, salary, updatedAt: new Date()

        }
        if (req.file) {
            updateData.profileImage = req.file.path;
        }
        const updateEmploye = await EmployeModal.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        )
        if (!updateEmploye) {
            return res.json({
                message: "Employe Not Found",
                status: false
            })
        }

        res.json({
            message: "Employe Updated Successfully",
            status: true,
            data: updateEmploye
        })
    }
    catch (err) {
        res.json({
            message: 'Internal Server Error',
            status: false,
            error: err
        })

    }

}
const DeleteEmploye = async (req, res) => {
    const { id } = req.params;
    const data = await EmployeModal.findByIdAndDelete(id);
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


export { createEmploye, updateEmploye, getAllEmploye, getEmployeById, DeleteEmploye }