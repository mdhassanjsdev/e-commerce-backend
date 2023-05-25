import { model, Schema } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true, // Automatically create createdAt timestamp
    }
);

userSchema.methods.matchPassword = async function (this: any, enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre("save", async function (this: any, next) {
    if (!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

export const User = model<IUser>("User", userSchema);