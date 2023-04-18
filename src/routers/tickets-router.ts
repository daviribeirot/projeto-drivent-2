import { Router } from 'express';
import { getAllTicketsByType, getAllUserTickets } from '@/controllers/tickets-controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter.all('/*', authenticateToken).get('/types', getAllTicketsByType).get('', getAllUserTickets).post('');

export { ticketsRouter };
