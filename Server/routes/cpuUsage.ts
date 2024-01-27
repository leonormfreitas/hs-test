import express, { Request, Response } from 'express';
import { getClientsCPUs, createClientMeasure } from '../models/cpuUsage';
import { Router } from 'express';

const router = Router();

export default (router: Router) => {
    router.get('/clientCPU', async (req: Request, res: Response) => {
        try {
            const clientCPUs = await getClientsCPUs();
            return res.status(200).json(clientCPUs)
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    })

    router.post('/clientCPU/new', async (req: Request, res: Response) => {
        try {
            const { client, cpuUsage, timestamp, room} = req.body;
            if(!client){
                return res.sendStatus(400);
            }

            const clientCPUs = await createClientMeasure({
                client,
                cpuUsage, 
                timestamp, 
                room
            });
            res.set("Access-Control-Allow-Origin", "http://localhost:4200"); 
            return res.status(200).json(clientCPUs)
        } catch (error) {
            console.log(error);
            return res.sendStatus(400);
        }
    })

}