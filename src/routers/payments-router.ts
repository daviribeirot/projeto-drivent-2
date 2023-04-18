import { Router } from 'express';
import { getPaymentByTicketId, createPayment } from '@/controllers/payments-controllers';
import { authenticateToken } from '@/middlewares';

const paymentsRouter = Router();

paymentsRouter.all('/*', authenticateToken).get('', getPaymentByTicketId).post('/process', createPayment);

export { paymentsRouter };
