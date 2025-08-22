import { Prisma, Reservation, ReservationStatus } from '@prisma/client';

export { type Reservation, ReservationStatus };

export type ReservationCreateInput = Prisma.ReservationCreateInput;
