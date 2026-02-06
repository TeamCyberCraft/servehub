import ServicePage from '../ServicePage';

export default function RedisPage() {
  return (
    <ServicePage
      title="Redis"
      description="In-memory data structure store for caching and message brokering"
      icon="🔴"
      features={[
        'Key-value store',
        'Pub/Sub messaging',
        'Data persistence',
        'Cluster support',
        'Lua scripting',
        'High availability',
      ]}
      status="running"
    />
  );
}
