import CheckPoint from './CheckPoint'
export default interface Session {
    id: string;
    title: string;
    date: Date;
    notes: string;
    checkPoints:CheckPoint[];
  }
  