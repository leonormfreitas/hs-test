export interface User {
    id: string;
    email: string;
}

export interface ConnectionData {
    room: string;
    email: string;
}

export interface CpuUsageData {
    client: string;
    cpuUsage: string;
    timestamp: Date;
    room: string;
}