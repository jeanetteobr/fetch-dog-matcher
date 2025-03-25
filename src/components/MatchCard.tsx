// src/components/MatchCard.tsx
import { Dog } from '../types';
import { motion } from 'framer-motion';

interface Props {
  match: Dog;
}

export default function MatchCard({ match }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      style={{
        padding: '1.5rem',
        borderRadius: '1rem',
        background: 'radial-gradient(circle at top left, #2b2b3b, #1c1c28)',
        boxShadow: '0 0 20px rgba(255, 105, 180, 0.3)',
        color: '#fff',
        maxWidth: '400px',
        margin: '1.5rem auto',
        textAlign: 'center',
        border: '1px solid #ff90b3',
      }}
    >
      <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
        💘 Your Perfect Match:
        <br />
        <span style={{ color: '#ff90b3' }}>{match.name}!</span>
      </h2>

      <img
        src={match.img}
        alt={`Your match: ${match.name}`}
        style={{
          width: '100%',
          height: '250px',
          objectFit: 'cover',
          borderRadius: '0.75rem',
          marginBottom: '1rem',
        }}
      />

      <p><strong>Breed:</strong> {match.breed}</p>
      <p><strong>Age:</strong> {match.age}</p>
      <p><strong>Zip Code:</strong> {match.zip_code}</p>
    </motion.div>
  );
}
