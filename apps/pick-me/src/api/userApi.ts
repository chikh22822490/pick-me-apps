import { AxiosInstance } from "axios"

export class UsersClient {
  _axiosInstance: AxiosInstance

  constructor(axiosInstance: AxiosInstance) {
    this._axiosInstance = axiosInstance
  }

  async updateUser(firstName: string, lastName: string, email: string): Promise<void> {
    try {
      await this._axiosInstance.put('/api/user/updateInfo/',{
        firstName: firstName,
        lastName: lastName,
        email: email
      })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }

  async updateUserCredentials(newPassword: string): Promise<void> {
    try {
      await this._axiosInstance.put('/api/user/updateCredentials', { newPassword: newPassword })
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      } else {
        throw new Error('Unknown error occurred')
      }
    }
  }

  async setUserAvatar(newAvatar: File): Promise<void> {
    try {
      const formData = new FormData()
      formData.append('file', newAvatar)
      await this._axiosInstance.patch('/api/user/setAvatar', formData, {
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

  async getUserAvatar(): Promise<string> {
    const { data: avatar } = await this._axiosInstance.get('/api/user/getAvatar')
    return avatar
  }
}
