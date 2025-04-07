<template>
    <div class="container">
        <div id = "header">
            <h1 class="title">Welcome to NUS Venue Booking System</h1>
        </div>
        <!-- Search and Filter Section -->
        <div class="search-filter">
            <input
                type="text"
                v-model="searchQuery"
                placeholder="Search venues..."
                class="search-bar"
            />
            <button class="filter-button">Filter</button>
        </div>

        <!-- Venue List -->
        <div class="venue-list">
            <div 
                class="venue" 
                v-for="venue in filteredVenues" 
                :key="venue.id"
            >
                <span class="venue-name">{{ venue.name }}</span>
                <div id ="lock-detail">
                    <img src = "../assets/Lock.png" class = "lock" />
                    <button @click="bookVenue(venue)">Details</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: "", // Search Query Model
            venues: [
                { id: 1, name: "Fine Food" },
                { id: 2, name: "Flavours" },
                { id: 3, name: "Frontier" },
                { id: 4, name: "The Terrace" },
                { id: 5, name: "The Deck" },
                { id: 6, name: "LT27" },
                { id: 7, name: "MPSH1" },
                { id: 8, name: "CLB" },
                { id: 9, name: "YIH" },
                { id: 8, name: "PGP Dining Hall" },
                { id: 8, name: "PGP Dining Hall" },
            ]
        };
    },
    computed: {
        // Filtered Venues Based on Search Query
        filteredVenues() {
            return this.venues.filter((venue) =>
                venue.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }
    },
    methods: {
        bookVenue(venue) {
            alert(`You have booked: ${venue.name}`);
        }
    }
};
</script>

<style scoped>
/* --- 🌟 Background Styling --- */
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: url('@/assets/Utown.png') no-repeat center center/cover;
    padding: 20px;
}

#header{
    display: flex;
    flex-direction: row;
    width: 80%;
    max-width: 1000px;
}
.logo{
    width: 80px;
    height: 50px;
    margin: 10px;
    border-radius: 5px;
    margin-right: 10px;
    
}

/* --- 📌 Title Styling --- */
.title {
    font-size: 38px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px;
    display: flex;
    flex: 1;
    justify-content: center;
}

/* --- 🔍 Search & Filter Section --- */
.search-filter {
    display: flex;
    width: 80%;
    max-width: 1000px;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-left: 10px;
}

/* --- 🔍 Search Bar Styling --- */
.search-bar {
    flex: 1;
    padding: 12px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    outline: none;
    background-color: #ffffff;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

/* --- 🔽 Filter Button --- */
.filter-button {
    margin-left: 10px;
    background-color: #ffae00;
    color: black;
    font-size: 18px;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s ease-in-out;
}

.filter-button:hover {
    background-color: #FFC107;
    transform: scale(1.05);
}

/* --- 📌 Venue List Section --- */
.venue-list {
    display: flex;
    flex-direction: column;
    width: 80%;
    max-width: 1000px;
    gap: 15px;
    max-height: 75vh; /* Adjust height for scrolling */
    overflow-y: auto; /* Enables vertical scrolling */
    padding-left: 10px;
    padding-right: 10px;
}

/* --- 🏛 Venue Styling --- */
.venue {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease-in-out;
    
}

.venue:hover {
    transform: scale(1.02);
}

/* --- 🏷 Venue Name --- */
.venue-name {
    font-size: 20px;
    font-weight: 600;
    color: #333;
}

#lock-detail {
    display: flex;
    align-items: center;
}

.lock {
    width: 25px;
    height: 28px;
    margin-right: 10px;
}

/* --- 📌 Book Now Button --- */
button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 12px 20px;
    font-size: 18px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
}

button:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
</style>
