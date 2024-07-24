if (!localStorage.getItem('currentUser')) {
  alert('Please login first');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', loadPolls);

let chart;

function loadPolls() {
  const polls = JSON.parse(localStorage.getItem('polls')) || [];
  const pollSelect = document.getElementById('poll-select');

  polls.forEach(poll => {
      const option = document.createElement('option');
      option.value = poll.id;
      option.textContent = poll.question;
      pollSelect.appendChild(option);
  });
}

function loadSelectedPollResults() {
  const pollId = document.getElementById('poll-select').value;
  if (!pollId) {
      document.getElementById('poll-results-container').style.display = 'none';
      return;
  }

  const polls = JSON.parse(localStorage.getItem('polls')) || [];
  const poll = polls.find(p => p.id == pollId);

  if (!poll) {
      alert('Poll not found!');
      return;
  }

  document.getElementById('results-question').textContent = poll.question;

  if (chart) {
      chart.destroy();
  }

  const ctx = document.getElementById('results-chart').getContext('2d');
  const colors = generateColors(poll.options.length);
  chart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: poll.options.map(option => option.text),
          datasets: [{
              data: poll.options.map(option => option.votes),
              backgroundColor: colors,
          }]
      },
      options: {
          responsive: false,
          maintainAspectRatio: false,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          const label = tooltipItem.label;
                          const value = tooltipItem.raw;
                          return `${label}: ${value} votes`;
                      }
                  }
              }
          }
      }
  });

  updateVoteCounts(poll.options);

  document.getElementById('poll-results-container').style.display = 'block';

  // Watch for updates in localStorage and update the chart
  window.addEventListener('storage', (event) => {
      if (event.key === 'polls') {
          const updatedPolls = JSON.parse(event.newValue) || [];
          const updatedPoll = updatedPolls.find(p => p.id == pollId);
          if (updatedPoll) {
              chart.data.datasets[0].data = updatedPoll.options.map(option => option.votes);
              chart.update();
              updateVoteCounts(updatedPoll.options);
          }
      }
  });
}

function generateColors(count) {
  const colors = [];
  for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 255);
      const g = Math.floor(Math.random() * 255);
      const b = Math.floor(Math.random() * 255);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.6)`);
  }
  return colors;
}

function updateVoteCounts(options) {
  const voteCountsDiv = document.getElementById('vote-counts');
  voteCountsDiv.innerHTML = '';
  options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.textContent = `${option.text}: ${option.votes} votes`;
      voteCountsDiv.appendChild(optionDiv);
  });
}

