import httpStatus from 'http-status';
import { Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import paymentService from '@/services/payments-service';

export async function getPaymentByTicketId(req: AuthenticatedRequest, res: Response) {
  const ticketId = Number(req.query.ticketId);
  const { userId } = req;

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const data = await paymentService.getPaymentByTicketId(userId, ticketId);

    if (!data) return res.sendStatus(httpStatus.NOT_FOUND);

    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createPayment(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;

    const { ticketId, cardData } = req.body;

    if (!ticketId || !cardData) return res.sendStatus(httpStatus.BAD_REQUEST);

    const data = await paymentService.createPaymentService(ticketId, cardData, userId);
    return res.status(httpStatus.OK).send(data);
  } catch (error) {
    if (error.name === 'UnauthorizedError') return res.status(httpStatus.UNAUTHORIZED).send(error.message);
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
