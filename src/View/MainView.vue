<template>
  
  <div class="main-page">
  
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1>Discover NUS</h1>
        <p class="subtitle">Explore the most popular locations across the National University of Singapore</p>
        <div class="search-bar">
          <input type="text" placeholder="Search locations..." v-model="searchQuery">
          <button class="search-button">Search</button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="content-container">

      <h2 class="section-title">Popular Locations</h2>
      <p class="section-description">Check out these frequently visited spots around campus</p>
      
      <ul class="locations-list">
        <li v-for="(location, index) in filteredLocations" :key="index" :class="['location-item', { 'top-tag': index < 3 }]">
          <div class="location-info">
            <!-- Red tag for top 3 locations -->
            <div v-if="index < 3" class="tag">Top {{ index + 1 }}</div>
            <div class="location-content">
              <h3>{{ location.name }}</h3>
              <p class="location-description">{{ location.description }}</p>
              <div class="location-meta">
                <span class="rating">★★★★☆</span>
                <span class="distance">~5 min walk</span>
              </div>
            </div>
          </div>
          <button @click="goToDetails(location.name)" class="details-button">View Details →</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      searchQuery: '',
      locations: [
        { id: 1, name: 'NUS Central Library', description: 'Main library for research and study with extensive collections and study spaces.' },
        { id: 2, name: 'Food Court 1', description: 'Popular spot for lunch and dinner with diverse food options.' },
        { id: 3, name: 'Student Activity Center', description: 'A hub for student events, activities, and club meetings.' },
        { id: 4, name: 'University Hall', description: 'Administrative building and venue for conferences and seminars.' },
        { id: 5, name: 'Business School', description: 'Modern facility for business-related courses and networking events.' },
        { id: 6, name: 'Engineering Faculty', description: 'Innovative spaces for engineering students and cutting-edge research.' },
        { id: 7, name: 'Science Faculty', description: 'State-of-the-art labs and classrooms for science education.' },
        { id: 8, name: 'Art and Social Sciences', description: 'Vibrant academic building for arts and social sciences programs.' },
        { id: 9, name: 'Canteen 2', description: 'A busy canteen known for its affordable meals and quick service.' },
        { id: 10, name: 'Sports Complex', description: 'Comprehensive facility for sports, fitness, and recreational activities.' },
      ]
    };
  },
  computed: {
    filteredLocations() {
      return this.locations.filter(location => 
        location.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        location.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
  goToDetails(locationId) {
    this.$router.push({ 
      name: 'VenueDetail', 
      params: { venueId: locationId },
    });
  }
}
};
</script>

<style scoped>
.main-page {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f9f9f9;
}

.hero {
  background-image: url('https://content.presspage.com/uploads/2580/1920_utown.jpg?10000');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

/* Optional: Overlay for better text contrast 
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(135deg, rgba(0,106,78,0.7) 0%, rgba(0,91,65,0.7) 100%);
  z-index: -1;
}*/


.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-weight: bold;
}

.search-bar {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 30px 0 0 30px;
  font-size: 1rem;
}

.search-button {
  padding: 12px 25px;
  background-color: #ffd700;
  color: #333;
  border: none;
  border-radius: 0 30px 30px 0;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #ffc800;
}

/* Content Container */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-title {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #006a4e;
}

.section-description {
  color: #666;
  margin-bottom: 2rem;
  font-size: 1.1rem;
}

/* Locations List */
.locations-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.location-item {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.location-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
}

.location-info {
  padding: 1.5rem;
  flex: 1;
  position: relative;
}

.tag {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: #e63946;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.location-content h3 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #006a4e;
}

.location-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.location-meta {
  display: flex;
  justify-content: space-between;
  color: #888;
  font-size: 0.9rem;
  margin-top: 1rem;
}

.details-button {
  background-color: #006a4e;
  color: white;
  border: none;
  padding: 12px;
  width: 100%;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.details-button:hover {
  background-color: #005b41;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .locations-list {
    grid-template-columns: 1fr;
  }
}
</style>