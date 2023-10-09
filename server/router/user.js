import express from "express"
import getAllUsers, { createUser, deletUser, getSingleUser , updateUser } from "../controller/userController.js";
const router = express.Router();


router.get("/users",getAllUsers)
router.post("/users", createUser)
router.get("/users/single/:id", getSingleUser)
router.put("/users/:id" , updateUser)
router.delete("/users/:id" , deletUser )


export default router  