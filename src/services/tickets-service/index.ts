import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

async function getAllTicketsByType() {
  const result = await ticketRepository.getAllTicketsByType();

  if (!result) throw notFoundError();

  return result;
}

async function getAllTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.findTicketByUserId(enrollment.id);

  if (!ticket) throw notFoundError();

  return ticket;
}

async function getTicketByUserId(userId: number) {
  return console.log('oi');
}

const ticketService = {
  getAllTickets,
  getTicketByUserId,
  getAllTicketsByType,
};

export default ticketService;
