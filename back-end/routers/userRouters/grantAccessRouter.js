import express from "express";
import { getAllUsers, createUser ,editUserAccess, deleteUserAccess } from "../../controllers/userController/grantAccessController.js";
const router = express.Router();

router.get("/users", getAllUsers);

router.post("/users", createUser );

router.put('/users/:userId', editUserAccess);

router.delete('/users/:userId', deleteUserAccess);


export default router;