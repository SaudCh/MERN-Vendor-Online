import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";

export const useFirebase = () => {

    const uploadImages = async (images) => {
        const nimages = []

        for (let i = 0; i < images.length; i++) {
            const link = await uploadImageAsync(images[i])
            nimages.push(link)
        }

        return nimages
    }

    const uploadImageAsync = async (image) => {
        const blob = await fetch(image).then((res) => res.blob())
        const storageRef = ref(storage, "/images/" + new Date().getTime())
        const snapshot = await uploadBytes(storageRef, blob)
        const link = await getDownloadURL(snapshot.ref)

        return link
    }

    const uploadImage = async (image) => {
        const blob = await fetch(image).then((res) => res.blob())
        const storageRef = ref(storage, "/images/" + new Date().getTime())
        const snapshot = await uploadBytes(storageRef, blob)
        const link = await getDownloadURL(snapshot.ref)

        return link
    }

    return { uploadImage, uploadImages }


}