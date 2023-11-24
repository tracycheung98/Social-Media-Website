import React, { useState } from "react";
import { auth } from '../firebase.config';
import { getDatabase, ref, push, update } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import Card from 'react-bootstrap/Card';

export default function Upload() {
    const [photo, setPhoto] = useState(null);
    const [caption, setCaption] = useState("");

    const handlePhotoChange = async (e) => {
        const selectedPhoto = e.target.files[0];

        const resizedPhoto = await resizePhoto(selectedPhoto, 300);

        setPhoto(resizedPhoto);
    };

    const resizePhoto = (file, maxWidth) => {
        return new Promise((resolve) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");

                    const aspectRatio = img.width / img.height;
                    const newHeight = maxWidth / aspectRatio;

                    canvas.width = maxWidth;
                    canvas.height = newHeight;

                    ctx.drawImage(img, 0, 0, maxWidth, newHeight);

                    canvas.toBlob((blob) => {
                        resolve(new File([blob], file.name, { type: file.type }));
                    }, file.type);
                };
            };

            reader.readAsDataURL(file);
        });
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handlePublicSubmit = async () => {
        if (!photo || !caption) {
            console.log("Both photo and caption are required.");
            return;
        }

        const db = getDatabase();
        const storage = getStorage();

        try {
            const newPostKey = push(ref(db, 'posts')).key;

            const currentUser = auth.currentUser;

            const photoRef = storageRef(storage, `photos/${newPostKey}`);
            await uploadBytes(photoRef, photo);

            const photoUrl = await getDownloadURL(photoRef);

            console.log("posting publicly")

            const postData = {
                timestamp: new Date().toISOString(),
                userId: currentUser.uid,
                username: currentUser.displayName,
                caption: caption,
                photoUrl: photoUrl,
                public: true
            }
            update(ref(db, `posts/${newPostKey}`), postData);

            console.log("Photo uploaded successfully!");

            setPhoto(null);
            setCaption("");
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    const handlePrivateSubmit = async () => {
        if (!photo || !caption) {
            console.log("Both photo and caption are required.");
            return;
        }

        const db = getDatabase();
        const storage = getStorage();

        try {
            const newPostKey = push(ref(db, 'posts')).key;

            const currentUser = auth.currentUser;

            const photoRef = storageRef(storage, `photos/${newPostKey}`);
            await uploadBytes(photoRef, photo);

            const photoUrl = await getDownloadURL(photoRef);

            console.log("posting privately")
            const postData = {
                timestamp: new Date().toISOString(),
                userId: currentUser.uid,
                username: currentUser.displayName,
                caption: caption,
                photoUrl: photoUrl,
                public: false
                // ... (any other data you want to store)
            }


            // Store the photo data in the Realtime Database under the generated ID
            update(ref(db), { [`posts/${newPostKey}`]: postData });

            console.log("Photo uploaded successfully!");

            // Clear the form after submission
            setPhoto(null);
            setCaption("");
        } catch (error) {
            console.error('Error uploading photo:', error);
        }
    };

    return (
        <div className="upload">
            <div className="upload-form">
                <form className="mb-3" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label className="form-label" htmlFor="photo">Upload Photo:</label>
                        <input className="form-control"
                            type="file"
                            id="photo"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            required
                        />
                        {/* Display photo preview if needed
                        {photo && <img src={URL.createObjectURL(photo)} alt="Preview" />} */}
                    </div>
                    <div>
                        <input className="form-control"
                            type="text"
                            placeholder="Caption"
                            id="caption"
                            value={caption}
                            onChange={handleCaptionChange}
                            required
                        />
                    </div>
                    <button type="submit" className="button" onClick={handlePublicSubmit} disabled={!photo || !caption}>Post publicly</button>
                    <button type="submit" className="button" onClick={handlePrivateSubmit} disabled={!photo || !caption}>Post for friends only</button>
                </form>
            </div>

            <div className="upload-preview">
                {photo &&
                    <Card>
                        <Card.Img src={URL.createObjectURL(photo)} />
                        <Card.Body>
                            <Card.Text>
                                {caption}
                            </Card.Text>
                        </Card.Body>
                    </Card>

                }
            </div>

        </div>
    );
}
