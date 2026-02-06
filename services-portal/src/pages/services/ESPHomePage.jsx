import ServicePage from '../ServicePage';

export default function ESPHomePage() {
  return (
    <ServicePage
      title="ESPHome"
      description="System to control ESP8266/ESP32 devices"
      icon="💡"
      features={[
        'YAML configuration',
        'OTA updates',
        'Home Assistant integration',
        'Sensor components',
        'GPIO control',
        'WiFi management',
      ]}
      status="running"
    />
  );
}
