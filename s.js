// Set the date for the Library Annual Day
const eventDate = new Date("April 30, 2025 00:00:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    // Calculate time units
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    // Display countdown
    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

    // Stop countdown when event time is reached
    if (timeLeft < 0) {
        document.getElementById("countdown").innerHTML = "Event Started!";
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call to display countdown immediately
updateCountdown();
