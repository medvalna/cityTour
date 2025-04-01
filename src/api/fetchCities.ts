import { apiKey, userName } from '@/environment'
import type { City } from '@/types/city'

export const fetchCities = async (): Promise<City[]> => {
  try {
    const res = await fetch(`/api/v1/cities?api_key=${apiKey}&username=${userName}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: City[] = await res.json()
    return data
  } catch (error) {
    throw new Error(`Some error occured! Error: ${error}`)
  }
}
