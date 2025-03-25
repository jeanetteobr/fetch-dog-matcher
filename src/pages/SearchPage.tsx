import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchBreeds, fetchDogs, generateMatch } from '../api/api';
import { Dog, Breed } from '../types';
import DogCard from '../components/DogCard';
import MatchCard from '../components/MatchCard';
import { useFavorites } from '../context/FavoritesContext';

export default function SearchPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [breeds, setBreeds] = useState<Breed[]>([]);
    const [selectedBreed, setSelectedBreed] = useState('');
    const [sortField, setSortField] = useState<'breed' | 'name' | 'age'>('breed');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [page, setPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(12);
    const [totalResults, setTotalResults] = useState(0);
    const [dogs, setDogs] = useState<Dog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [match, setMatch] = useState<Dog | null>(null);
    const { favorites } = useFavorites();

    // Redirect if not logged in
    useEffect(() => {
        if (!isAuthenticated) navigate('/');
    }, [isAuthenticated, navigate]);

    // Fetch breeds once
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

    // Fetch dogs when filters or pagination change
    useEffect(() => {
        const loadDogs = async () => {
            try {
                setLoading(true);
                const { dogs: fetchedDogs, total } = await fetchDogs({
                    breeds: selectedBreed ? [selectedBreed] : [],
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    sort: `${sortField}:${sortOrder}` as any,
                    page,
                    limit: dogsPerPage,
                });

                setDogs(fetchedDogs);
                setTotalResults(total);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch dogs.');
            } finally {
                setLoading(false);
            }
        };

        loadDogs();
    }, [selectedBreed, sortField, sortOrder, page, dogsPerPage]);

    const getSortLabel = (order: 'asc' | 'desc') => {
        if (sortField === 'age') {
            return order === 'asc' ? 'Low → High' : 'High → Low';
        }
        return order === 'asc' ? 'A → Z' : 'Z → A';
    };

    const handleGenerateMatch = async () => {
        const ids = favorites.map((dog) => dog.id);
        if (!ids.length) return;

        try {
            const result = await generateMatch(ids);
            setMatch(result);
        } catch (error) {
            console.error('Failed to generate match:', error);
        }
    };

    return (
        <>
            <h2>Find Your Pack 🐕</h2>
            <p style={{ marginBottom: '1rem' }}>
                Filter by breed, sort by age or name, and add your favorites. When you’re ready, we’ll sniff out your perfect match. 💘
            </p>

            <blockquote style={{ fontStyle: 'italic', color: '#aaa' }}>
                “You can’t buy love, but you can rescue it.” – Unknown
            </blockquote>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {favorites.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                        onClick={handleGenerateMatch}
                        style={{
                            padding: '0.75rem 1.5rem',
                            fontSize: '1rem',
                            borderRadius: '0.5rem',
                            backgroundColor: '#f472b6',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        🎯 Find My Match
                    </button>
                </div>
            )}
            {match && <MatchCard match={match} />}

            <form
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    alignItems: 'center',
                    marginBottom: '1rem',
                }}
            >
                <label>
                    Filter by Breed:
                    <select
                        value={selectedBreed}
                        onChange={(e) => {
                            setSelectedBreed(e.target.value);
                            setPage(1); // Reset page on filter change
                        }}
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
                    Sort Field:
                    <select
                        value={sortField}
                        onChange={(e) => {
                            setSortField(e.target.value as 'breed' | 'name' | 'age');
                            setPage(1);
                        }}
                    >
                        <option value="breed">Breed</option>
                        <option value="name">Name</option>
                        <option value="age">Age</option>
                    </select>
                </label>

                <label>
                    Sort Order:
                    <select
                        value={sortOrder}
                        onChange={(e) => {
                            setSortOrder(e.target.value as 'asc' | 'desc');
                            setPage(1);
                        }}
                    >
                        <option value="asc">{getSortLabel('asc')}</option>
                        <option value="desc">{getSortLabel('desc')}</option>
                    </select>
                </label>

                <label>
                    Dogs per page:
                    <select
                        value={dogsPerPage}
                        onChange={(e) => {
                            setDogsPerPage(Number(e.target.value));
                            setPage(1);
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={12}>12</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </select>
                </label>
            </form>

            {loading && <p>Loading dogs...</p>}

            {favorites.length === 0 && (
                <p style={{ marginTop: '1rem', color: '#999' }}>
                    You haven’t picked any favorites yet! Don’t worry, we won’t tell the dogs. 🐶
                </p>
            )}


            <section
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1rem',
                }}
            >
                {dogs.length > 0 ? (
                    dogs.map((dog) => <DogCard key={dog.id} dog={dog} />)
                ) : (
                    !loading && <p>No dogs found 🐾</p>
                )}
            </section>

            {/* Pagination Controls */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '2rem',
                }}
            >
                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                    Prev
                </button>
                <span>
                    Page {page} of {Math.ceil(totalResults / dogsPerPage)}
                </span>
                <button
                    disabled={page * dogsPerPage >= totalResults}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>
            </div>
        </>
    );
}
