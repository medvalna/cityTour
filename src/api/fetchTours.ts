import { apiKey, userName } from '@/environment'
import type { Tour } from '@/types/tour'

export const fetchTours = async (): Promise<Tour[]> => {
  try {
    const res = await fetch(`/api/v1/products?api_key=${apiKey}&username=${userName}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data: Tour[] = await res.json()
    return data
  } catch (error) {
    throw new Error(`Some error occured! Error: ${error}`)
  }
}
