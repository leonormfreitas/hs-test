import mongoose from "mongoose";

const ClientCPUSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },
    cpuUsage: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    room: {
        type: String,
        required: true
    }
})

export const clientCPUModel = mongoose.model('ClientCPU', ClientCPUSchema);

export const getClientsCPUs = () => {
    console.log('hello inside')
    return clientCPUModel.find();
}

