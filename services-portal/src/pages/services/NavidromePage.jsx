import ServicePage from '../ServicePage';

export default function NavidromePage() {
  return (
    <ServicePage
      title="Navidrome"
      description="Modern music server and streamer"
      icon="🎵"
      features={[
        'Music library management',
        'Subsonic API compatible',
        'Multi-user support',
        'Scrobbling support',
        'Smart playlists',
        'Album art fetching',
      ]}
      status="running"
    />
  );
}
