import ServicePage from '../ServicePage';

export default function JellyfinPage() {
  return (
    <ServicePage
      title="Jellyfin"
      description="Free media streaming server"
      icon="🎬"
      features={[
        'Movies & TV shows',
        'Live TV & DVR',
        'Hardware transcoding',
        'User management',
        'Mobile & TV apps',
        'Plugins & themes',
      ]}
      status="running"
    />
  );
}
