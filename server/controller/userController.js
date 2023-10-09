import userModel from "../models/user.js"


// get all users functionality
const getAllUsers = async (req,res)=>{
    try {
        const allUsers = await userModel.find({})
        if(allUsers){
            return res.status(200).json(allUsers)
        }
    } catch (error) {
       return res.status(400).json(error)
    }
}

// create user functionality
const createUser = async (req,res)=>{
        const {name ,email,age} = req.body
        try {
            if(name && email && age){
                const newUser = await userModel({
                    name,email,age
                })
                const savedUser = await newUser.save();
                if(savedUser){
                    res.status(201).json(savedUser)
                }else{
                     return res.status(400).json({messag:"something went wrong"})
                }
            }else{
                return res.status(400).json({messag:"all fields are required"})
            }
        } catch (error) {
             return res.status(400).json(error)
        }    
}

// get single user functionality
const getSingleUser=async(req,res)=>{
    const {id} = req.params
    try {
        if(id){
            const singleUserData = await userModel.findById(id)
            res.status(200).json(singleUserData)
        }else{
             return res.status(400).json({messag:"id not found"})
        }
    } catch (error) {
         return res.status(400).json(error)
    }
}

// update user functionality
const updateUser = async(req,res)=>{
    const {id} = req.params
    try {
        if(id){
            const getUpdatedData = await userModel.findByIdAndUpdate(id ,req.body)
             return res.status(200).json(getUpdatedData)
        }else{
            return res.status(400).json({messag:"id not found"})
        } 
    } catch (error) {
        return res.status(400).json(error)
    }
}; 

// delete user functionality
const deletUser =async (req,res)=>{
    const {id} = req.params
    try {
       if(id){
            const deletedUser = await userModel.findByIdAndDelete(id)
            return res.status(200).json(deletedUser)
        }else{
            return res.status(400).json({message:"id not found"})
        }
    } catch (error) {
        return res.status(400).json(error)
    }
};

export default getAllUsers  ;
export {createUser , getSingleUser, updateUser , deletUser} 