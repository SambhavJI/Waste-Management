const modelURL = "model/model.json";
const metadataURL = "model/metadata.json";

let model;

// Load the model
async function loadModel() {
  model = await tmImage.load(modelURL, metadataURL);
  console.log("Model loaded!");
}
loadModel();

// Handle file upload
document.getElementById("upload").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file || !model) return;

  // Preview image
  const preview = document.getElementById("preview");
  preview.src = URL.createObjectURL(file);

  // Wait for preview to load before predicting
  preview.onload = async () => {
    const prediction = await model.predict(preview);
    console.log(prediction);

    let output = "";
    prediction.forEach(p => {
      output += `${p.className}: ${(p.probability * 100).toFixed(2)}%\n`;
    });

    document.getElementById("result").textContent = output;
  };
});
