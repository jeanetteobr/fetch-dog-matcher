import { Dog } from '../types';

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <article
      style={{
        padding: '1rem',
        borderRadius: '0.75rem',
        color: '#fff',
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

      <h3 style={{ margin: '0 0 0.5rem 0' }}>{dog.name}</h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem', // 👈🏾 THIS tightens the spacing
          fontSize: '0.9rem',
        }}
      >
        <p style={{ margin: 0 }}><strong>Breed:</strong> {dog.breed}</p>
        <p style={{ margin: 0 }}><strong>Age:</strong> {dog.age}</p>
        <p style={{ margin: 0 }}><strong>Zip Code:</strong> {dog.zip_code}</p>
      </div>
    </article>
  );
}
