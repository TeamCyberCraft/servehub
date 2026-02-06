import ServicePage from '../ServicePage';

export default function N8nPage() {
  return (
    <ServicePage
      title="n8n"
      description="Workflow automation platform for connecting apps and services"
      icon="⚙️"
      features={[
        'Visual workflow builder',
        'Over 200+ integrations',
        'Custom node creation',
        'Webhook triggers',
        'Scheduled workflows',
        'Error handling and retries',
      ]}
      status="running"
    />
  );
}
