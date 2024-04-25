import { getDownloadURL } from "firebase/storage";
import firebase from "firebase/app";
import "firebase/compat/storage";

const uploadImage = async (file) => {
  const firebaseConfig = {
    // ...
    storageBucket: "gs://auth-c921f.appspot.com",
  };

  try {
    await firebase.initializeApp(firebaseConfig);

    const storage = firebase.storage().ref();
    const imagesRef = storage.child(file.name);
    await imagesRef.put(file);

    const url = await getDownloadURL(imagesRef);
    console.log(url);
  } catch (error) {
    console.log(error);
  }
};

export default uploadImage;