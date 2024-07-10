import { AxiosInstance } from 'axios'
import { DisplayRide } from './models'

export class RideClient {
  _axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance
  }

  async getAllRides(): Promise<DisplayRide[]> {
    try {
      const { data: rides } = await this._axiosInstance.get('/api/ride/all')
      return rides
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }
}
