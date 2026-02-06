import ServicePage from '../ServicePage';

export default function NtfyPage() {
  return (
    <ServicePage
      title="ntfy"
      description="Simple HTTP-based pub-sub notification service"
      icon="🔔"
      features={[
        'Push notifications',
        'Topic subscriptions',
        'REST API',
        'Mobile apps',
        'Email integration',
        'Priority levels',
      ]}
      status="running"
    />
  );
}
