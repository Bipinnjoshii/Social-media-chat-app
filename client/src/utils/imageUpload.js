export const checkImage = (file) => {
    let err = "";
    if(!file){
        return err = "File does not exist.";
    }
    // Limit to 2MB for direct upload
    if(file.size > 2 * 1024 * 1024){
         return (err = "File size must be less than 2 Mb.");
    }

    if (!file.type.startsWith('image/')) {
      return (err = "Please select a valid image format.");
    }

    return err;
}

export const imageUpload = async (images) => {
    let imgArr = [];
    for(const item of images){
        const file = item.camera || item;
        
        // Read file as base64 data URL
        const dataUrl = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            reader.readAsDataURL(file);
        });

        imgArr.push({
            public_id: "img_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
            url: dataUrl
        });
    }
    return imgArr;
}
