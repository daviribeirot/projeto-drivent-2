import { prisma } from '@/config';
import { PaymentData } from '@/protocols';

async function getPaymentByTicketId(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId,
    },
  });
}

async function createPaymentInfo(ticketId: number, { cardIssuer, cardLastDigits, value }: PaymentData) {
  return prisma.payment.create({
    data: {
      ticketId: ticketId,
      value,
      cardIssuer,
      cardLastDigits,
    },
  });
}

const paymentRepository = {
  getPaymentByTicketId,
  createPaymentInfo,
};

export default paymentRepository;
