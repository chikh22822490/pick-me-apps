import { AxiosInstance } from 'axios'
import { DisplayReservation } from './models'

export class ReservationClient {
  _axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance
  }

  async getUserReservations(): Promise<DisplayReservation[]> {
    try {
      const { data: rides } = await this._axiosInstance.get('/api/reservations/')
      return rides
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }

  async creatNewReservation(rideId: string, bookedSeats: number): Promise<void> {
    try {
      await this._axiosInstance.post('/api/reservations/create', { rideId, bookedSeats })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }
}
