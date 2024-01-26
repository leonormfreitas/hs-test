import { Router } from 'express';
import cpuUsageRouter from './cpuUsage';

const router = Router();

export default (): Router => {
    cpuUsageRouter(router);
    return router;
}