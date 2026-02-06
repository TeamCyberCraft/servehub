import ServicePage from '../ServicePage';

export default function Zigbee2MqttPage() {
  return (
    <ServicePage
      title="Zigbee2MQTT"
      description="Bridge between Zigbee devices and MQTT"
      icon="📶"
      features={[
        'Wide device support',
        'OTA updates',
        'Device grouping',
        'Binding support',
        'Network map visualization',
        'No vendor lock-in',
      ]}
      status="running"
    />
  );
}
