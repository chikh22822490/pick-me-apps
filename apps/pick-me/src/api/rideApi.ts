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
      const { data: rides } = await this._axiosInstance.get('/api/rides/')
      return rides
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }

  async creatNewRide(
    selectedDestinationState: string,
    selectedDestinationRegion: string,
    selectedDeartureState: string,
    selectedDeartureRegion: string,
    selectedDate: Date,
    availableSeats: number,
    price: number,
    carModel: string,
    carImage: File,
    email: string,
    phone: string,
    whatsapp: string
  ): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('file', carImage)
      formData.append('destination', selectedDestinationState + ', ' + selectedDestinationRegion)
      formData.append('departure', selectedDeartureState + ', ' + selectedDeartureRegion)
      formData.append('dateTime', selectedDate.toString())
      formData.append('availableSeats', availableSeats.toString())
      formData.append('price', price.toString())
      formData.append('email', email)
      formData.append('carModel', carModel)
      formData.append('phone', phone)
      formData.append('whatsapp', whatsapp)
      await this._axiosInstance.post('/api/rides/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }
}
