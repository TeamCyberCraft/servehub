import ServicePage from '../ServicePage';

export default function HomepagePage() {
  return (
    <ServicePage
      title="Homepage / Dashy"
      description="Dashboard and homepage configuration"
      icon="📊"
      features={[
        'Custom widgets',
        'Service monitoring',
        'Weather integration',
        'Search providers',
        'Theme customization',
        'YAML configuration',
      ]}
      status="running"
    />
  );
}
