import { Router } from 'express';
import { createTicket, getAllTicketsByType, getAllUserTickets } from '@/controllers/tickets-controllers';
import { authenticateToken } from '@/middlewares';

const ticketsRouter = Router();

ticketsRouter
  .all('/*', authenticateToken)
  .get('/types', getAllTicketsByType)
  .get('', getAllUserTickets)
  .post('', createTicket);

export { ticketsRouter };
