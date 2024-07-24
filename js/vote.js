if (!localStorage.getItem("currentUser")) {
  alert("Please login first");
  window.location.href = "auth.html";
}

document.addEventListener("DOMContentLoaded", loadPolls);

function loadPolls() {
  const polls = JSON.parse(localStorage.getItem("polls")) || [];
  const pollSelect = document.getElementById("poll-select");

  polls.forEach((poll) => {
    const option = document.createElement("option");
    option.value = poll.id;
    option.textContent = poll.question;
    pollSelect.appendChild(option);
  });
}

function loadSelectedPoll() {
  const pollId = document.getElementById("poll-select").value;
  if (!pollId) {
    document.getElementById("poll-options-container").style.display = "none";
    return;
  }

  const polls = JSON.parse(localStorage.getItem("polls")) || [];
  const poll = polls.find((p) => p.id == pollId);

  if (!poll) {
    alert("Poll not found!");
    return;
  }

  document.getElementById("poll-question").textContent = poll.question;

  const optionsDiv = document.getElementById("poll-options");
  optionsDiv.innerHTML = "";
  poll.options.forEach((option, index) => {
    const optionLabel = document.createElement("label");
    const optionInput = document.createElement("input");
    optionInput.type = "radio";
    optionInput.name = "option";
    optionInput.value = index;
    optionLabel.appendChild(optionInput);
    optionLabel.appendChild(document.createTextNode(option.text));
    optionsDiv.appendChild(optionLabel);
    optionsDiv.appendChild(document.createElement("br"));
  });

  document.getElementById("poll-options-container").style.display = "block";

  document.getElementById("voteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    submitVote(pollId);
  });
}

function submitVote(pollId) {
  const form = document.getElementById("voteForm");
  const formData = new FormData(form);
  const selectedOption = formData.get("option");

  let polls = JSON.parse(localStorage.getItem("polls")) || [];
  const poll = polls.find((p) => p.id == pollId);

  if (poll && selectedOption !== null) {
    poll.options[selectedOption].votes += 1;
    localStorage.setItem("polls", JSON.stringify(polls));
    alert("Vote submitted successfully!");
  } else {
    alert("Failed to submit vote.");
  }
}
