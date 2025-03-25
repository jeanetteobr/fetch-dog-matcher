import { Dog } from '../types';
import { useFavorites } from '../context/FavoritesContext';

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const favorited = isFavorited(dog.id);

  const toggleFavorite = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    favorited ? removeFavorite(dog.id) : addFavorite(dog);
  };

  return (
    <article
      style={{
        padding: '1rem',
        borderRadius: '0.75rem',
        color: '#fff',
        position: 'relative',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        <img
          src={dog.img}
          alt={`A dog named ${dog.name}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>

      <button
        onClick={toggleFavorite}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: favorited ? 'red' : 'gray',
          textShadow: '1px 1px 3px rgba(0,0,0,0.6)'
        }}
        aria-label={favorited ? 'Unfavorite dog' : 'Favorite dog'}
      >
        {favorited ? '❤️' : '🤍'}
      </button>

      <h3 style={{ margin: '0 0 0.5rem 0' }}>{dog.name}</h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          fontSize: '0.9rem',
        }}
      >
        <p style={{ margin: 0 }}>
          <strong>Breed:</strong> {dog.breed}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Age:</strong> {dog.age}
        </p>
        <p style={{ margin: 0 }}>
          <strong>Zip Code:</strong> {dog.zip_code}
        </p>
      </div>
    </article>
  );
}
