import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketService from '@/services/tickets-service';

export async function getAllUserTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const ticket = await ticketService.getAllUserTickets(userId);
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getAllTicketsByType(req: AuthenticatedRequest, res: Response) {
  try {
    const ticket = await ticketService.getAllTicketsByType();
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const { ticketTypeId } = req.body;

  if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);

  try {
    const data = await ticketService.create(userId, ticketTypeId);

    return res.status(httpStatus.CREATED).send(data);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
