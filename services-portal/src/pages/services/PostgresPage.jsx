import ServicePage from '../ServicePage';

export default function PostgresPage() {
  return (
    <ServicePage
      title="PostgreSQL"
      description="Advanced open-source relational database"
      icon="🐘"
      features={[
        'ACID compliance',
        'JSON/JSONB support',
        'Full-text search',
        'Extensible type system',
        'Advanced indexing',
        'Replication support',
      ]}
      status="running"
    />
  );
}
