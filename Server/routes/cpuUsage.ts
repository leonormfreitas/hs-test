import express, { Request, Response } from 'express';
import { getClientsCPUs } from '../models/cpuUsage';
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
    
    router.post('/clientCPU/new', (req: Request, res: Response) => {
        return res.send('added new client cpu usage measurement')
    })
}