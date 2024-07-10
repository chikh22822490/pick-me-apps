import { AxiosInstance } from 'axios'
import { DisplayRide } from './models'

export class RideClient {
  _axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance
  }

  async getAllRides(): Promise<DisplayRide[]> {
    try {
      const { data: rides } = await this._axiosInstance.get('/api/rides/all')
      return rides
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }
  async getUserRides(): Promise<DisplayRide[]> {
    try {
      const { data: rides } = await this._axiosInstance.get('/api/rides')
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
