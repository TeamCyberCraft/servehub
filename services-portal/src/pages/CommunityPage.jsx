import Chat from '../components/Chat';

export default function CommunityPage() {
  return (
    <div className="community-page">
      <div className="page-header">
        <h1>Community Hub</h1>
        <p>Chat with other users and share your experiences with the services.</p>
      </div>

      <div className="community-content">
        <section className="community-section">
          <h2>Global Chat</h2>
          <Chat contextId="global" type="community" />
        </section>

        <section className="community-section">
          <h2>Guidelines</h2>
          <ul className="guidelines-list">
            <li>Be respectful to others.</li>
            <li>No spamming or advertising.</li>
            <li>Share helpful tips and configurations.</li>
            <li>Admin moderators may delete inappropriate messages.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
