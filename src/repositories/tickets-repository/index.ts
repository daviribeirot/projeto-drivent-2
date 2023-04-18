import { TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function getAllTicketsByType() {
  return prisma.ticketType.findMany();
}

async function getTicketByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      Enrollment: true,
    },
  });
}

async function getTicketTypeByTicketId(ticketId: number) {
  return prisma.ticket.findFirst({
    where: {
      id: ticketId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketByEnrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return await prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED,
    },
    include: {
      TicketType: true,
    },
  });
}

async function updateTicketStatus(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: TicketStatus.PAID,
    },
  });
}

const ticketRepository = {
  getAllTicketsByType,
  getTicketByTicketId,
  getTicketTypeByTicketId,
  findTicketByEnrollmentId,
  createTicket,
  updateTicketStatus,
};

export default ticketRepository;
