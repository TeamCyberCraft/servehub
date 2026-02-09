export class MemoryStore {
  constructor() {
    this.ratings = new Map(); // serviceId -> array of {user,rating,timestamp}
    this.messages = new Map(); // key (serviceId|community) -> array of {user,text,timestamp}
  }

  timestamp() {
    return new Date().toISOString();
  }

  addRating(serviceId, rating, user) {
    if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
      throw new Error('rating must be between 1 and 5');
    }
    const entry = { rating, user: user || 'anonymous', timestamp: this.timestamp() };
    const list = this.ratings.get(serviceId) || [];
    list.push(entry);
    this.ratings.set(serviceId, list);
    return entry;
  }

  getRatings(serviceId) {
    return this.ratings.get(serviceId) || [];
  }

  getRatingSummary(serviceId) {
    const ratings = this.getRatings(serviceId);
    const average = ratings.length
      ? ratings.reduce((sum, r) => sum + Number(r.rating), 0) / ratings.length
      : 0;
    return { ratings, average, count: ratings.length };
  }

  addMessage(contextId, text, user) {
    const entry = { text, user: user || 'anonymous', timestamp: this.timestamp() };
    const list = this.messages.get(contextId) || [];
    list.push(entry);
    this.messages.set(contextId, list);
    return entry;
  }

  getMessages(contextId) {
    return this.messages.get(contextId) || [];
  }
}
