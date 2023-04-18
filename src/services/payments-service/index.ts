import ticketRepository from '@/repositories/tickets-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import paymentRepository from '@/repositories/payments-repository';
import { notFoundError, unauthorizedError } from '@/errors';
import { CardData } from '@/protocols';

async function getPaymentByTicketId(userId: number, ticketId: number) {
  const ticket = await ticketRepository.getTicketByTicketId(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId != userId) throw unauthorizedError();

  const data = await paymentRepository.getPaymentByTicketId(ticketId);

  if (!data) throw notFoundError();

  return data;
}

async function createPaymentService(cardData: CardData, ticketId: number, userId: number) {
  const ticket = await ticketRepository.getTicketByTicketId(ticketId);

  if (!ticket) throw notFoundError();

  const enrollment = await enrollmentRepository.getEnrollmentById(ticket.enrollmentId);

  if (!enrollment) throw notFoundError();

  if (enrollment.userId !== userId) throw unauthorizedError();

  const ticketWithType = await ticketRepository.getTicketTypeByTicketId(ticketId);

  const payment = {
    ticketId,
    value: ticketWithType.TicketType.price,
    cardIssuer: cardData.issuer,
    cardLastDigits: cardData.number.toString().slice(-4),
  };

  await ticketRepository.updateTicketStatus(ticketId);

  const data = await paymentRepository.createPaymentInfo(ticketId, payment);

  return data;
}

const paymentService = {
  getPaymentByTicketId,
  createPaymentService,
};

export default paymentService;
