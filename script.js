// Enhanced JavaScript for Crextio HR Platform
class CrextioApp {
  constructor() {
    this.currentTime = { hours: 2, minutes: 35, seconds: 0 };
    this.timerRunning = false;
    this.timerInterval = null;
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupTimer();
    this.setupCharts();
    this.setupAnimations();
  }

  setupNavigation() {
    // Add active class to current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      }
    });
  }

  setupTimer() {
    const playBtn = document.getElementById('playBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const timeDisplay = document.getElementById('timeDisplay');

    if (playBtn && pauseBtn && timeDisplay) {
      playBtn.addEventListener('click', () => this.startTimer());
      pauseBtn.addEventListener('click', () => this.pauseTimer());
      this.updateTimeDisplay();
    }
  }

  startTimer() {
    if (!this.timerRunning) {
      this.timerRunning = true;
      this.timerInterval = setInterval(() => {
        this.currentTime.seconds++;
        if (this.currentTime.seconds >= 60) {
          this.currentTime.seconds = 0;
          this.currentTime.minutes++;
          if (this.currentTime.minutes >= 60) {
            this.currentTime.minutes = 0;
            this.currentTime.hours++;
          }
        }
        this.updateTimeDisplay();
      }, 1000);
    }
  }

  pauseTimer() {
    if (this.timerRunning) {
      this.timerRunning = false;
      clearInterval(this.timerInterval);
    }
  }

  updateTimeDisplay() {
    const timeDisplay = document.getElementById('timeDisplay');
    if (timeDisplay) {
      const hours = String(this.currentTime.hours).padStart(2, '0');
      const minutes = String(this.currentTime.minutes).padStart(2, '0');
      timeDisplay.textContent = `${hours}:${minutes}`;
    }
  }

  setupCharts() {
    // Progress Chart
    const progressCtx = document.getElementById('progressChart');
    if (progressCtx) {
      new Chart(progressCtx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          datasets: [{
            label: 'Hours',
            data: [6, 8, 7, 9, 6, 4],
            backgroundColor: '#6366f1',
            borderRadius: 4,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: { display: false },
            x: { display: false }
          }
        }
      });
    }

    // Department Chart
    const deptCtx = document.getElementById('departmentChart');
    if (deptCtx) {
      new Chart(deptCtx, {
        type: 'doughnut',
        data: {
          labels: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR'],
          datasets: [{
            data: [35, 20, 15, 20, 10],
            backgroundColor: ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6']
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }
  }

  setupAnimations() {
    // Animate stat numbers on page load
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.textContent);
      let current = 0;
      const increment = target / 30;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = target;
          clearInterval(timer);
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 50);
    });

    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .stat-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('fade-in');
      }, index * 100);
    });
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CrextioApp();
});

// Chart.js global defaults
if (typeof Chart !== 'undefined') {
  Chart.defaults.font.family = 'Inter, sans-serif';
  Chart.defaults.color = '#64748b';
}
