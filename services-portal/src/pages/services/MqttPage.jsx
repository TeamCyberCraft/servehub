import ServicePage from '../ServicePage';

export default function MqttPage() {
  return (
    <ServicePage
      title="Mosquitto MQTT"
      description="Lightweight MQTT message broker for IoT devices"
      icon="📡"
      features={[
        'MQTT 3.1/3.1.1/5.0 support',
        'TLS/SSL encryption',
        'WebSocket support',
        'Bridge configuration',
        'Authentication plugins',
        'Low resource usage',
      ]}
      status="running"
    />
  );
}
