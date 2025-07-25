document.getElementById("testBtn").addEventListener("click", testAPI);
async function testAPI() {
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const responseDiv = document.getElementById("response");

  if (!email && !phone) {
    alert("pleaase provide either email or phone number");
    return;
  }

  const requestBody = {};
  if (email) requestBody.email = email;
  if (phone) requestBody.phoneNumber = phone;

  try {
    responseDiv.style.display = "block";
    responseDiv.textContent = "Sending request...";

    const response = await fetch("/identify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    responseDiv.textContent = JSON.stringify(result, null, 2);

    if (!response.ok) {
      responseDiv.style.backgroundColor = "#fed7d7";
      responseDiv.style.borderColor = "#f56565";
    } else {
      responseDiv.style.backgroundColor = "#f0fff4";
      responseDiv.style.borderColor = "#68d391";
    }
  } catch (error) {
    responseDiv.style.display = "block";
    responseDiv.style.backgroundColor = "#fed7d7";
    responseDiv.style.borderColor = "#f56565";
    responseDiv.textContent = "Error: " + error.message;
  }
}
