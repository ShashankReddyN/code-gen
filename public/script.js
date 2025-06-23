async function generateCode() {
  const prompt = document.getElementById("promptInput").value;
  const output = document.getElementById("outputArea");
  const copyBtn = document.getElementById("copyButton");

  output.innerText = "";
  output.classList.add("typing");
  copyBtn.style.display = "none";

  try {
    const response = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    const code = data.code || "❌ No code generated.";
    
    typeText(code, output, () => {
      output.classList.remove("typing");
      copyBtn.style.display = "block";
    });
  } catch (err) {
    output.innerText = "❌ Error contacting the server.";
    output.classList.remove("typing");
  }
}

function typeText(text, element, callback) {
  let i = 0;
  const speed = 20;

  function type() {
    if (i < text.length) {
      element.innerText += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else {
      callback();
    }
  }

  type();
}

function copyToClipboard() {
  const text = document.getElementById("outputArea").innerText;
  navigator.clipboard.writeText(text).then(() => {
    const btn = document.getElementById("copyButton");
    btn.innerText = "✅ Copied!";
    setTimeout(() => (btn.innerText = "📋 Copy"), 1500);
  });
}
