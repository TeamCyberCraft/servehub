import ServicePage from '../ServicePage';

export default function KallitheaPage() {
  return (
    <ServicePage
      title="Kallithea"
      description="Source code management system for Git and Mercurial"
      icon="📦"
      features={[
        'Git & Mercurial support',
        'Code review system',
        'Issue tracking',
        'Wiki pages',
        'User permissions',
        'Repository groups',
      ]}
      status="running"
    />
  );
}
