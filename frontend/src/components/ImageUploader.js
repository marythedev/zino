import { useState, useEffect, useRef } from "react";

const ImageUploader = ({ publicKey, secretKey, multiple = false, children, images, onChange }) => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [status, setStatus] = useState("ok");
    const fileInputRef = useRef(null);

    useEffect(() => {
        if (onChange && uploadedFiles.length > 0) {
            const filesReady = uploadedFiles
                .filter(file => file.status === 'ready')
                .map(file => `https://ucarecdn.com/${file.id}/`);

            onChange(filesReady);
        }
    }, [uploadedFiles, onChange]);

    const handleImageChange = async (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const selectedFiles = multiple ? Array.from(e.target.files) : [e.target.files[0]];

            const oversizedFiles = selectedFiles.filter(file => file.size > 200 * 1024);

            if (oversizedFiles.length > 0) {
                alert("One or more images are too large. Please select files smaller than 500 MB.");
                return;
            }
            else
                await uploadImages(selectedFiles);
        }
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const uploadImages = async (files) => {
        const uploadedFilesInfo = [];

        if (images && images.length === 0 && uploadedFiles.length > 0) {
            setUploadedFiles([]);
        }

        try {
            for (const file of files) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("UPLOADCARE_PUB_KEY", publicKey);
                formData.append("UPLOADCARE_STORE", "auto");

                const response = await fetch("https://upload.uploadcare.com/base/", {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload ${file.name}`);
                }

                const data = await response.json();
                uploadedFilesInfo.push({ id: data.file, name: file.name, status: 'loading' });
            }

            setUploadedFiles((prev) => [...prev, ...uploadedFilesInfo]);
            setStatus("ok");

            // Check if files are ready on CDN
            for (const file of uploadedFilesInfo) {
                await checkFileReady(file.id);
            }
        } catch (error) {
            console.error("Upload error:", error);
            setStatus("fail");
        }
    };

    const checkFileReady = async (fileId) => {
        const maxAttempts = 100;
        const delayMs = 1000;

        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            try {
                const response = await fetch(`https://ucarecdn.com/${fileId}/`);
                if (response.ok) {
                    setUploadedFiles(prev =>
                        prev.map(file => file.id === fileId ? { ...file, status: 'ready' } : file)
                    );
                    return;
                }
            } catch (error) {
                console.error("Error checking file:", error);
            }
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
        console.error(`File ${fileId} not ready after ${maxAttempts} attempts`);
    };

    useEffect(() => {
        if (status === "fail") {
            alert("Failed to upload. Please try again.");
            setStatus("ok");
        }
    }, [status]);

    const handleDeleteImage = async (fileId) => {
        const deleteUrl = `https://api.uploadcare.com/files/${fileId}/storage/`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/vnd.uploadcare-v0.7+json',
                    'Authorization': `Uploadcare.Simple ${publicKey}:${secretKey}`
                }
            });

            if (response.ok) {
                await response.json();
                setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
            } else {
                console.error('Failed to delete file:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end", // Align content to the right
        }}>
            <div style={{ margin: "10px 5px" }}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    multiple={multiple}
                    style={{ display: "none" }}
                    id="image-uploader-input"
                />
                <label htmlFor="image-uploader-input" style={{ cursor: "pointer" }}>
                    {children || <button>Select Images</button>}
                </label>
            </div>

            {uploadedFiles.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", marginTop: "10px" }}>
                    {uploadedFiles.map((file) => (
                        <div
                            key={file.id}
                            style={{
                                position: "relative",
                                width: "50px",
                                height: "50px",
                                margin: "5px",
                                borderRadius: "8px",
                                overflow: "hidden",
                            }}
                        >
                            {file.status === 'loading' ? (
                                <div
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f0f0f0",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "fit-content",
                                            fontSize: "10px",
                                            color: "#555",
                                        }}
                                    >
                                        Uploading...
                                    </span>
                                </div>
                            ) : (
                                <img
                                    src={`https://ucarecdn.com/${file.id}/-/preview/300x300/`}
                                    alt={file.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <div
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    backgroundColor: "rgba(0,0,0,0.75)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity: 0,
                                    transition: "opacity 0.3s",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                                onMouseLeave={(e) => e.currentTarget.style.opacity = 0}
                                onClick={() => handleDeleteImage(file.id)}
                            >
                                <img
                                    src={window.location.origin + '/icons/delete.png'}
                                    alt="Delete"
                                    style={{ height: "15px" }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;