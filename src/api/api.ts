import axios from 'axios';
import { Dog, Breed } from '../types';

export const api = axios.create({
  baseURL: 'https://frontend-take-home-service.fetch.com',
  withCredentials: true,
});

type SortParam =
  | 'breed:asc'
  | 'breed:desc'
  | 'name:asc'
  | 'name:desc'
  | 'age:asc'
  | 'age:desc';

interface FetchDogsOptions {
  breeds?: string[];
  sort?: SortParam;
  page?: number;      // still user-friendly for the UI
  limit?: number;     // same — translates to "size"
}

export const fetchBreeds = async (): Promise<Breed[]> => {
  const res = await api.get('/dogs/breeds');
  return res.data;
};

export const fetchDogs = async ({
  breeds,
  sort = 'breed:asc',
  page = 1,
  limit = 25,
}: FetchDogsOptions): Promise<{ dogs: Dog[]; total: number }> => {
  const params: Record<string, unknown> = {
    sort,
    size: limit,
    from: (page - 1) * limit, // ✨ Key pagination fix
  };

  if (breeds?.length) {
    params.breeds = breeds.join(',');
  }

  const searchRes = await api.get('/dogs/search', { params });
  const ids: string[] = searchRes.data.resultIds;
  const total: number = searchRes.data.total;

  if (!ids?.length) return { dogs: [], total: 0 };

  const dogsRes = await api.post('/dogs', ids);
  const unorderedDogs: Dog[] = dogsRes.data;

  const ordered = ids
    .map((id) => unorderedDogs.find((dog) => dog.id === id))
    .filter((d): d is Dog => d !== undefined);

  return { dogs: ordered, total };
};

export const generateMatch = async (dogIds: string[]) => {
  const matchRes = await api.post('/dogs/match', dogIds);
  const matchId = matchRes.data.match;

  const dogRes = await api.post('/dogs', [matchId]);
  return dogRes.data[0]; // return the full matched dog object
};