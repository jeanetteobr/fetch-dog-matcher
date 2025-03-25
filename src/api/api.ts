import axios from 'axios';
import { Breed, Dog } from '../types';

export const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

// Fetch all breeds
export const fetchBreeds = async (): Promise<Breed[]> => {
  const res = await api.get('/dogs/breeds');
  return res.data;
};

// Fetch dogs w/ pagination, sorting, filtering
interface FetchDogsOptions {
  breeds?: string[];
  sort?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const fetchDogs = async ({
  breeds,
  sort = 'asc',
  page = 1,
  limit = 25,
}: FetchDogsOptions): Promise<Dog[]> => {
  const params: Record<string, any> = {
    sort: `breed:${sort}`,
    page,
    limit,
  };

  if (breeds?.length) {
    params.breeds = breeds.join(',');
  }

  // Step 1: Get the IDs
  const searchRes = await api.get('/dogs/search', { params });
  const ids: string[] = searchRes.data.resultIds;

  if (!ids?.length) return [];

  // Step 2: Fetch full dog objects
  const dogsRes = await api.post('/dogs', ids);
  const unorderedDogs: Dog[] = dogsRes.data;

  // 🧠 Step 3: Reorder by resultIds
  const ordered = ids
    .map((id) => unorderedDogs.find((dog) => dog.id === id))
    .filter((d): d is Dog => d !== undefined); // Type guard

  return ordered;
};

