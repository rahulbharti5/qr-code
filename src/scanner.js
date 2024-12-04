document.addEventListener("DOMContentLoaded", () => {
    const scanResultElement = document.getElementById("scan-result");
    const fileInput = document.getElementById("file-input");

    const qrReader = new Html5Qrcode("qr-reader");

    // qrReader.start(
    //     { facingMode: "environment" },
    //     { fps: 10, qrbox: 250 },
    //     (decodedText) => {
    //         scanResultElement.innerHTML = decodedText;
    //         qrReader.stop().catch((err) => console.error("Failed to stop scanner:", err));
    //     },
    //     (error) => console.warn("Scan failed:", error)
    // );
    const startbtn = document.getElementById('scan-btn');
    let scanning = false;
    startbtn.addEventListener('click', () => {
        if (!scanning) {
            qrReader.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                (decodedText) => {
                    scanResultElement.innerHTML = decodedText;
                    qrReader.stop().catch((err) => console.error("Failed to stop scanner:", err));
                },
                // (error) => console.warn("Scan failed:", error)
            );
            startbtn.innerHTML = 'Stop Scanning';
            scanning = true;
            fileInput.style.display = 'none';
        } else {
            console.log(qrReader);
            qrReader.stop().catch((err) => console.error("Failed to stop scanner:", err));
            startbtn.innerHTML = 'Start Scanning';
            scanning = false;
            fileInput.style.display = 'flex';
        }
    });
    fileInput.addEventListener("change", async () => {
        const file = fileInput.files[0];
        if (file) {
            try {
                const result = await qrReader.scanFile(file, false);
                scanResultElement.innerHTML = result;
            } catch (error) {
                scanResultElement.innerHTML = "Error scanning file!";
                console.error("File scan failed:", error);
            }
        }
    });
});
