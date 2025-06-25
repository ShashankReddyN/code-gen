const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("promptInput");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const previousPrompt = document.getElementById("previousPrompt");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  if (!prompt) {
    output.textContent = "Please enter a prompt.";
    return;
  }

  previousPrompt.textContent = prompt;
  output.textContent = " Generating...";

  try {
    const res = await fetch("/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const data = await res.json();
    output.textContent = data.code || " No code generated.";
  } catch (error) {
    output.textContent = "Failed to fetch response.";
    console.error("Client fetch error:", error);
  }
});

copyBtn.addEventListener("click", () => {
  const code = output.textContent.trim();
  if (code) {
    navigator.clipboard.writeText(code)
      .then(() => console.log("Copied to clipboard"))
      .catch(err => console.error("Clipboard copy failed", err));
  }
});
