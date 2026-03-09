import { useState, useRef, useCallback } from "react";

const ImageResizer = () => {
  const [image, setImage] = useState(null);
  const [originalSize, setOriginalSize] = useState({ width: 0, height: 0 });
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [lockAspect, setLockAspect] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(1);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setImage(url);
      setOriginalSize({ width: img.width, height: img.height });
      setWidth(img.width);
      setHeight(img.height);
      setAspectRatio(img.width / img.height);
      imgRef.current = img;
    };
    img.src = url;
  };

  const handleWidthChange = (val) => {
    const w = parseInt(val) || "";
    setWidth(w);
    if (lockAspect && w) {
      setHeight(Math.round(w / aspectRatio));
    }
  };

  const handleHeightChange = (val) => {
    const h = parseInt(val) || "";
    setHeight(h);
    if (lockAspect && h) {
      setWidth(Math.round(h * aspectRatio));
    }
  };

  const handleResize = () => {
    if (!imgRef.current || !width || !height) return;
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(imgRef.current, 0, 0, width, height);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || canvas.width === 0) return;
    const link = document.createElement("a");
    link.download = "resized-image.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const resetToOriginal = () => {
    setWidth(originalSize.width);
    setHeight(originalSize.height);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f1f5f9", fontFamily: "system-ui, sans-serif", padding: "32px 16px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 700, marginBottom: 8, color: "#38bdf8" }}>🖼️ Image Resizer</h1>
        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: 32 }}>Width ও Height আলাদাভাবে সেট করুন</p>

        {/* Upload */}
        <div
          onClick={() => fileInputRef.current.click()}
          style={{
            border: "2px dashed #334155", borderRadius: 16, padding: "40px 20px",
            textAlign: "center", cursor: "pointer", marginBottom: 28,
            background: image ? "#1e293b" : "#0f172a",
            transition: "all 0.2s"
          }}
        >
          {image ? (
            <img src={image} alt="uploaded" style={{ maxHeight: 200, maxWidth: "100%", borderRadius: 8 }} />
          ) : (
            <>
              <div style={{ fontSize: 48, marginBottom: 8 }}>📁</div>
              <p style={{ color: "#64748b" }}>ছবি আপলোড করতে ক্লিক করুন</p>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
        </div>

        {image && (
          <>
            {/* Original Size Info */}
            <div style={{ background: "#1e293b", borderRadius: 10, padding: "10px 16px", marginBottom: 20, fontSize: 14, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
              <span>📐 Original: <b style={{ color: "#f1f5f9" }}>{originalSize.width} × {originalSize.height} px</b></span>
              <button onClick={resetToOriginal} style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", fontSize: 13 }}>↺ Reset</button>
            </div>

            {/* Width Height Inputs */}
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "#94a3b8" }}>Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f1f5f9", fontSize: 18, outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {/* Lock Button */}
              <div style={{ paddingTop: 22, textAlign: "center" }}>
                <button
                  onClick={() => setLockAspect(!lockAspect)}
                  title={lockAspect ? "Aspect Ratio Locked" : "Aspect Ratio Unlocked"}
                  style={{
                    width: 42, height: 42, borderRadius: 10, border: "none", cursor: "pointer",
                    background: lockAspect ? "#0369a1" : "#334155",
                    color: "#fff", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  {lockAspect ? "🔒" : "🔓"}
                </button>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ display: "block", marginBottom: 6, fontSize: 13, color: "#94a3b8" }}>Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  style={{ width: "100%", padding: "12px 14px", background: "#1e293b", border: "1px solid #334155", borderRadius: 10, color: "#f1f5f9", fontSize: 18, outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>

            {/* Lock Info */}
            <p style={{ textAlign: "center", fontSize: 13, color: lockAspect ? "#38bdf8" : "#64748b", marginBottom: 24 }}>
              {lockAspect ? "🔒 Aspect Ratio লক আছে — একটি বদলালে অন্যটি auto হবে" : "🔓 Width ও Height স্বাধীনভাবে সেট করুন"}
            </p>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={handleResize}
                style={{ flex: 1, padding: "14px", background: "#0284c7", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
              >
                ✂️ Resize করুন
              </button>
              <button
                onClick={handleDownload}
                style={{ flex: 1, padding: "14px", background: "#059669", border: "none", borderRadius: 12, color: "#fff", fontSize: 16, fontWeight: 600, cursor: "pointer" }}
              >
                ⬇️ Download
              </button>
            </div>

            {/* Preview Canvas */}
            <div style={{ marginTop: 28, textAlign: "center" }}>
              <canvas ref={canvasRef} style={{ maxWidth: "100%", borderRadius: 10, border: "1px solid #1e293b" }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageResizer;
