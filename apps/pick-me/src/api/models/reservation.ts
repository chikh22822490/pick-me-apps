import { DisplayRide } from './ride'

export type DisplayReservation = {
  id: string
  userId: string
  bookedSeats: string
  ride: DisplayRide
}
