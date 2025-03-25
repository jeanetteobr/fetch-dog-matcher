import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchBreeds, fetchDogs } from '../api/api';
import { Dog, Breed } from '../types';
import DogCard from '../components/DogCard';

export default function SearchPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();


    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    // Fetch all breeds
    useEffect(() => {
        const loadBreeds = async () => {
            try {
                const data = await fetchBreeds();
                setBreeds(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch breeds.');
            }
        };

        loadBreeds();
    }, []);

    // Fetch dogs based on filters
    useEffect(() => {
        const loadDogs = async () => {
            try {
                setLoading(true);
                const data = await fetchDogs({
                    breeds: selectedBreed ? [selectedBreed] : [],
                    sort: sortOrder,
                    page,
                    limit: 12,
                });
                setDogs(data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch dogs.');
            } finally {
                setLoading(false);
            }
        };

        loadDogs();
    }, [selectedBreed, sortOrder, page]);

    return (
        <>
            <h1>Dog Browser 🐾</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <label>
                    Filter by Breed:
                    <select
                        value={selectedBreed}
                        onChange={(e) => setSelectedBreed(e.target.value)}
                    >
                        <option value="">All Breeds</option>
                        {breeds.map((breed) => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Sort by Breed:
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    >
                        <option value="asc">A → Z</option>
                        <option value="desc">Z → A</option>
                    </select>
                </label>
            </form>

            {loading && <p>Loading dogs...</p>}

            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                    marginTop: '2rem',
                }}
            >
                {Array.isArray(dogs) && dogs.length > 0 ? (
                    dogs.map((dog) => (
                        <DogCard key={dog.id} dog={dog} />
                    ))
                ) : (
                    !loading && <p>No dogs found 🐾</p>
                )}
            </section>
        </>
    );
}
