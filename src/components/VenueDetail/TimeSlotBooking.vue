<template>
  <div class="slot-section">
    <h2>Available Slots on {{ selectedDate }}</h2>
    <div class="slots">
      <div v-for="slot in slots" :key="slot.time" class="slot-card">
        <div class="slot-info">
          <span class="time">{{ slot.time }}</span>
          <span class="vacancy">Vacancy: {{ slot.vacancy }}</span>
        </div>
        <button :disabled="slot.vacancy <= 0" @click="bookSlot(slot)">
          {{ slot.vacancy <= 0 ? "Full" : "Book" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFirestore, collection, getDocs } from "firebase/firestore";
import firebaseApp from "@/firebase";
import { watch, ref } from "vue";

const db = getFirestore(firebaseApp);

const props = defineProps({
  venueId: String,
  selectedDate: String,
});
const emit = defineEmits(["slotBooked"]); // define the event

const slots = ref([]);

const fetchTimeSlots = async () => {
  if (!props.venueId || !props.selectedDate) return;

  const slotRef = collection(
    db,
    `venues/${props.venueId}/dates/${props.selectedDate}/timeslots`
  );

  try {
    const snapshot = await getDocs(slotRef);
    slots.value = snapshot.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching slots:", error);
    slots.value = [];
  }
};

// refetch when selectedDate or venueId changes
watch(() => [props.venueId, props.selectedDate], fetchTimeSlots, {
  immediate: true,
});

const bookSlot = (slot) => {
  emit("slotBooked", { ...slot, date: props.selectedDate });
};
</script>

<style scoped>
.slot-section h2 {
  font-size: 20px;
  margin-bottom: 10px;
  color: black;
  display: flex;
  justify-content: center;
  font-weight: bold;
}

.slots {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.slot-card {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: 12px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slot-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-left: 10px;
  justify-content: space-between;
  flex: 1;
  margin-right: 15px;
}

.time,
.vacancy {
  font-weight: 500;
  color: black;
  margin-bottom: 4px;
}

button {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  min-width: 55px;
}

button:hover {
  background-color: #2563eb;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  color: #666;
}

</style>
