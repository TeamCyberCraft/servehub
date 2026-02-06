import ServicePage from '../ServicePage';

export default function GrafanaPage() {
  return (
    <ServicePage
      title="Grafana"
      description="Analytics and monitoring platform"
      icon="📈"
      features={[
        'Custom dashboards',
        'Data source plugins',
        'Alerting rules',
        'User permissions',
        'Panel plugins',
        'Annotations',
      ]}
      status="running"
    />
  );
}
