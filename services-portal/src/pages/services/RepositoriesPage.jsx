import ServicePage from '../ServicePage';

export default function RepositoriesPage() {
  return (
    <ServicePage
      title="Repositories"
      description="Git repositories management and storage"
      icon="📁"
      features={[
        'Repository browsing',
        'Clone/pull/push access',
        'Branch management',
        'Access control',
        'Backup management',
        'Storage monitoring',
      ]}
      status="running"
    />
  );
}
