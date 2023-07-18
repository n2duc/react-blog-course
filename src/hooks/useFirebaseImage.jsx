import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { userRole } from "../utils/contants";
import Swal from "sweetalert2";

export default function useFirebaseImage(setValue, getValues, imageName = null, cb = null) {
    const { userInfo } = useAuth();
    const [progress, setProgress] = useState(0);
    const [imgUrl, setImageUrl] = useState("");
    
    if (!setValue || !getValues) return;
    
    useEffect(() => {
        setImageUrl("");
    }, [getValues("image_name")]);
    
    const handleUploadImage = (file) => {
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const storage = getStorage();
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progressPercent);
                switch (snapshot.state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        console.log("Nothing");
                }
            },
            (error) => {
                // A full list of error codes is available at
                switch (error.code) {
                    case "storage/unauthorized":
                        console.log(
                            "User doesn't have permission to access the object"
                        );
                        break;
                    case "storage/canceled":
                        console.log("User canceled the upload");
                        break;
                    case "storage/unknown":
                        console.log(
                            "Unknown error occurred, inspect error.serverResponse"
                        );
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);
                    setImageUrl(downloadURL);
                });
            }
        );
    };

    const handleSelectImage = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setValue("image_name", file.name);
        handleUploadImage(file);
    };

    const handleDeleteImage = () => {
        if (userInfo?.role !== userRole.ADMIN) {
            Swal.fire("Failed", "You have no right to do this action", "warning");
            return;
        }
        const storage = getStorage();
        const imageRef = ref(storage, "images/" + (imageName || getValues("image_name")) );
        
        // Delete the file
        deleteObject(imageRef)
            .then(() => {
                // File deleted successfully
                console.log("deleted successfully");
                setImageUrl("");
                setProgress(0);
                cb && cb();
            })
            .catch((error) => {
                // Uh-oh, an error occurred!
                console.log("error occurred!");
                console.log(error)
                setImageUrl("");
            });
    };
    const handleResetUpload = () => {
        setImageUrl("");
        setProgress(0);
    };
    return {
        imgUrl,
        setImageUrl,
        progress,
        handleSelectImage,
        handleDeleteImage,
        handleResetUpload
    };
}
