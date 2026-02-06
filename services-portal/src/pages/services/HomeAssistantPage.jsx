import ServicePage from '../ServicePage';

export default function HomeAssistantPage() {
  return (
    <ServicePage
      title="Home Assistant"
      description="Open-source home automation platform"
      icon="🏡"
      features={[
        'Device integration',
        'Automation rules',
        'Energy management',
        'Voice assistants',
        'Dashboard customization',
        'Mobile app support',
      ]}
      status="running"
    />
  );
}
