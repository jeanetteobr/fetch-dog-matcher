import axios from 'axios';
import { Dog, Breed } from '../types';

export const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

type SortParam = 'breed:asc' | 'breed:desc' | 'name:asc' | 'name:desc' | 'age:asc' | 'age:desc';

interface FetchDogsOptions {
  breeds?: string[];
  sort?: SortParam;
  page?: number;
  limit?: number;
}

// Fetch all breeds
export const fetchBreeds = async (): Promise<Breed[]> => {
  const res = await api.get('/dogs/breeds');
  return res.data;
};

// Fetch sorted and filtered dogs
export const fetchDogs = async ({
  breeds,
  sort = 'breed:asc',
  page = 1,
  limit = 25,
}: FetchDogsOptions): Promise<Dog[]> => {
  const params: Record<string, any> = {
    sort,
    page,
    limit,
  };

  if (breeds?.length) {
    params.breeds = breeds.join(',');
  }

  const searchRes = await api.get('/dogs/search', { params });
  const ids: string[] = searchRes.data.resultIds;

  if (!ids || ids.length === 0) return [];

  const dogsRes = await api.post('/dogs', ids);
  const unorderedDogs: Dog[] = dogsRes.data;

  // ✨ Reorder dogs to match resultIds
  const ordered = ids
    .map((id) => unorderedDogs.find((dog) => dog.id === id))
    .filter((d): d is Dog => d !== undefined);

  return ordered;
};
