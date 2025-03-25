import { Dog } from '../types';

interface Props {
  dog: Dog;
}

export default function DogCard({ dog }: Props) {
  return (
    <article>
      <img
        src={dog.img}
        alt={`A dog named ${dog.name}`}
        style={{ width: '100%', borderRadius: '0.5rem' }}
      />
      <h3>{dog.name}</h3>
      <ul>
        <li><strong>Breed:</strong> {dog.breed}</li>
        <li><strong>Age:</strong> {dog.age}</li>
        <li><strong>Zip Code:</strong> {dog.zip_code}</li>
      </ul>
    </article>
  );
}
