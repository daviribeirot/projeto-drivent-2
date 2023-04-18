import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/tickets-repository';
import { notFoundError } from '@/errors';

async function getAllTicketsByType() {
  const result = await ticketRepository.getAllTicketsByType();

  if (!result) throw notFoundError();

  return result;
}

async function getAllUserTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const result = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  if (!result) throw notFoundError();

  return result;
}

async function create(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);

  if (!enrollment) throw notFoundError();

  const data = await ticketRepository.createTicket(enrollment.id, ticketTypeId);

  if (!data) throw notFoundError();

  return data;
}

const ticketService = {
  getAllUserTickets,
  getAllTicketsByType,
  create,
};

export default ticketService;
