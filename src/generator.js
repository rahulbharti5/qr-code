document.addEventListener("DOMContentLoaded", () => {
    const qrInput = document.getElementById("qr-input");
    const generateBtn = document.getElementById("generate-btn");
    const qrOutput = document.getElementById("qr-output");

    generateBtn.addEventListener("click", () => {
        const text = qrInput.value.trim();
        if (!text) {
            alert("Please enter text to generate QR code!");
            return;
        }

        QRCode.toCanvas(text, (error, canvas) => {
            if (error) {
                console.error("QR Code generation failed:", error);
                return;
            }
            canvas.style.width = "200px";
            canvas.style.height = "200px";
            qrOutput.innerHTML = ""; // Clear previous QR codes
            qrOutput.appendChild(canvas);
        });
    });
});
