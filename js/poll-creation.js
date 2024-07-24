if (!localStorage.getItem("currentUser")) {
  alert("Please login first");
  window.location.href = "index.html";
}

document.getElementById("pollForm").addEventListener("submit", createPoll);

function addOption() {
  const optionsDiv = document.getElementById("options");
  const newOptionDiv = document.createElement("div");
  newOptionDiv.classList.add('option');

  const newOption = document.createElement('input');
  newOption.type = "text";
  newOption.name = "option";
  newOption.required = true;

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.classList.add('remove-button');
  removeButton.textContent = 'Remove';
  removeButton.onclick = () => removeOption(removeButton);

  newOptionDiv.appendChild(newOption);
  newOptionDiv.appendChild(removeButton);
  optionsDiv.appendChild(newOptionDiv);

}

function removeOption(button) {
  const optionDiv = button.parseElement;
  optionDiv.remove();
}

function createPoll(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const question = formData.get("question");
  const options = formData.getAll("option");
  const currentUser = localStorage.getItem("currentUser");

  const poll = { id: Date.now(), question, options: options.map(option => ({ text: option, votes: 0 })), createdBy: currentUser };
  let polls = JSON.parse(localStorage.getItem('polls')) || [];
  polls.push(poll);
  localStorage.setItem('polls', JSON.stringify(polls));

  alert("Poll created successfully!");
  form.reset();
}
