import mongoose from 'mongoose';


const DB_NAME = 'Medicine-Data';
// MONGO_URL = mongodb+srv://bhartinagpure2409:123bharti@cluster0.5hu6t.mongodb.net/Medicine-Data?retryWrites=true&w=majority

export async function connect() {
    try {
        const response = await mongoose.connect(`mongodb+srv://bhartinagpure2409:123bharti@cluster0.5hu6t.mongodb.net/Medicine-Data?retryWrites=true&w=majority`);
        // const response = await mongoose.connect(`mongodb+srv://bhartinagpure2409:123bharti@cluster0.5hu6t.mongodb.net/${DB_NAME}`)
        // const connection = mongoose.connection;
        // console.log('Connected to MongoDB', response);

        // connection.on('connected', () => {
        //     console.log('MongoDB connected successfully');
        // });

        // connection.on('error', (err) => {
        //     console.log('MongoDB connection error: ' + err);
        //     process.exit();
        // });

    } catch (error) {
        console.log('Something went wrong!');
        console.log(error);
    }
}