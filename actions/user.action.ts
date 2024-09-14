"use server";

import db from "@/lib/db";
import { v4 as uuidv4 } from 'uuid';

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });

        if (!user) return null;

        return user;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createGuestUser = async () => {
    try {
        const uid = uuidv4();

        const guest = await db.user.create({
            data: {
                uid: "guest_" + uid
            }
        });

        return guest;
    } catch (error) {
        console.error("Error creating guest user: ", error);
        return null;
    }
};