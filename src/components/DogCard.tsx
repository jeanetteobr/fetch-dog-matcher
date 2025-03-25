import { Dog } from '../types';

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <article>
      <div
        style={{
          width: '100%',
          height: '200px',
          overflow: 'hidden',
          borderRadius: '0.5rem',
          marginBottom: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000', // fallback in case of weird aspect
        }}
      >
        <img
          src={dog.img}
          alt={`A dog named ${dog.name}`}
          style={{
            height: '100%',
            width: 'auto',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
      <h3>{dog.name}</h3>
      <ul>
        <li><strong>Breed:</strong> {dog.breed}</li>
        <li><strong>Age:</strong> {dog.age}</li>
        <li><strong>Zip Code:</strong> {dog.zip_code}</li>
      </ul>
    </article>
  );
}
