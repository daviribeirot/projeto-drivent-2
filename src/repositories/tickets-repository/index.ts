import { Ticket, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTicketsByType() {
  return prisma.ticketType.findMany();
}

async function findTicketByUserId(ticketId: number) {
  return prisma.ticket.findFirst({ where: { id: ticketId } });
}

const ticketRepository = {
  getAllTicketsByType,
  findTicketByUserId,
};

export default ticketRepository;
