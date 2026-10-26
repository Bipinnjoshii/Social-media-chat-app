export const checkImage = (file) => {
    let err = "";
    if(!file){
        return err = "File does not exist.";
    }
    // Limit to 4MB
    if(file.size > 4 * 1024 * 1024){
         return (err = "File size must be less than 4 Mb.");
    }
    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        if (!item) continue;
        
        // If it's a camera snapshot (already data URL base64)
        if (item.camera) {
            imgArr.push({
                public_id: "cam_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
                url: item.camera
            });
            continue;
        }

        // If it's already an existing image object with url
        if (typeof item === 'string') {
            imgArr.push({ public_id: "str_" + Date.now(), url: item });
            continue;
        }
        if (item.url) {
            imgArr.push(item);
            continue;
        }

        // It is a File / Blob object: read as data URL
        try {
            const dataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(item);
            });

            imgArr.push({
                public_id: "img_" + Date.now() + "_" + Math.random().toString(36).substr(2, 6),
                url: dataUrl
            });
        } catch (e) {
            console.error("Error reading image:", e);
        }
    }
    return imgArr;
}
