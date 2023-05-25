import { Request, Response } from "express"
import asyncHandler from "express-async-handler";
import { User } from "../models/userModel";
import generateToken from "../utils/generateToken";

const authUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body as { email: string, password: string }

    if (!email || !password) throw new Error("complete all fields");

    const user = await User.findOne({ email });

    
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }

})

const registerUser = asyncHandler(async (req: Request, res: Response) => {

    const { name, email, password } = req.body as {
        name: string;
        email: string;
        password: string;
    };

    if (!name || !email || !password) throw new Error("complete all fields");

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})

const updateUserProfile = asyncHandler(async (req: any, res: Response) => {

    const user = await User.findById(req.user?._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


const getUserProfile = asyncHandler(async (req: any, res: Response) => {

    const { _id } = req.user;

    const user = await User.findById(_id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await User.find({});
    res.json(users);
});


const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };

    const user: any = await User.findById(id);
    if (user) {
        await user.remove();
        res.json({ message: "User removed" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const getUserById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await User.findById(id).select("-password");

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string };
    const user = await User.findById(id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

export {
    authUser,
    getUserProfile,
    registerUser,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
};
