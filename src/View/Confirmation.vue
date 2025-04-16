<template>
  <div class="container">
    <h2>Booking Confirmation</h2>
    <p>Thank you for your booking. Your booking has been successfully confirmed!</p>

    <div v-if="bookingDetails">
      <p><strong>Name:</strong> {{ bookingDetails.name }}</p>
      <p><strong>Email:</strong> {{ bookingDetails.email }}</p>
      <p><strong>Date:</strong> {{ formattedDate }}</p>
      <p><strong>Slot:</strong> {{ bookingDetails.slot }}</p>

      <p><strong>QR Code:</strong></p>
      <img v-if="qrCodeSvg" :src="qrCodeSvg" alt="QR Code" class="qr-code" />
    </div>

    <div v-else>
      <p>Booking details not available. Please check your email for confirmation details.</p>
    </div>

    <button @click="goHome">Return to Main Page</button>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import emailjs from 'emailjs-com'

export default {
  name: 'Confirmation',
  data() {
    return {
      bookingDetails: null,
      qrCodeSvg: ''
    }
  },
  computed: {
    formattedDate() {
      if (this.bookingDetails && this.bookingDetails.date) {
        return new Date(this.bookingDetails.date).toLocaleDateString()
      }
      return 'No date provided'
    }
  },
  async mounted() {
    const q = this.$route.query

    this.bookingDetails = {
      name: q.name || 'No name provided',
      email: q.email || 'No email provided',
      slot: q.slot || 'No slot provided',
      date: q.date || 'No date provided',
      venue: q.venue || 'No venue provided',
      bookingId: q.bookingId || 'No ID'
    }

    const ticketUrl = `https://bt-3103-project-38gclmfxh-lisiqis-projects.vercel.app/ticket?id=${q.bookingId}`; // ← update this after deploying

    try {
      // ✅ Generate QR code
      this.qrCodeSvg = await QRCode.toDataURL(ticketUrl)

      // ✅ Send email via EmailJS
      const templateParams = {
        to_name: this.bookingDetails.name,
        email: this.bookingDetails.email,
        ticket_url: ticketUrl
      }

      await emailjs.send(
        'service_4v6x3cd',      // Your service ID
        'template_ygx2jyu',     // Your template ID
        templateParams,
        'ovhRFm2SAGW3kLIzH'     // Your public key
      )

      console.log('Email sent successfully!')
    } catch (err) {
      console.error('Error:', err)
    }
  },
  methods: {
    goHome() {
      this.$router.push('/main')
    }
  }
}
</script>

<style scoped>
.container {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 400px;
  margin: 50px auto;
  opacity: 0.9;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.qr-code {
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: block;
}
</style>
