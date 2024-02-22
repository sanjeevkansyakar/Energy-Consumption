import mongoose from "mongoose";

export async function connect() {
    try {
        const connectionInstance = await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            `MONGODB connected !! DB Host ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log(`MongoDB Connection FAILED : ${error}`);
        // process.exit(1);
    }
}
