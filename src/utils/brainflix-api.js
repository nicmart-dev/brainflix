import axios from "axios";

/* used to connect to BrainFlix api */
const api_key = "08e96fed-b453-49f7-b10e-6342cdd61c6a";

/* get videos from api */
export async function getVideos() {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/videos?api_key=${api_key}`
        );
        // return video list
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/* get details of a specific video from api */
export async function getVideoDetails(id) {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/videos/${id}?api_key=${api_key}`
        );
        // return details for specified video
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch video details");
    }
}


/* upload image poster api */


export async function uploadImage(imageData) {
    try {
        const formData = new FormData();
        formData.append("poster", imageData);

        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/videos/image?api_key=${api_key}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        if (response.status === 200) {
            console.log("Image uploaded successfully");
        }
    } catch (error) {
        console.error("Error uploading image", error);
    }
};

/* post video using api */
export async function postVideo(video) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/videos?api_key=${api_key}`, video
        );
        // return posted comment
        return response;
    } catch (error) {
        console.log(error);
    }
}


/* post comment using api */
export async function postComment(videoId, comment) {
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/videos/${videoId}/comments?api_key=${api_key}`, comment
        );
        // return posted comment
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/* delete comment using api */
export async function deleteComment(videoId, commentId) {
    try {
        const response = await axios.delete(
            `${process.env.REACT_APP_API_URL}/videos/${videoId}/comments/${commentId}?api_key=${api_key}`
        );
        // return posted comment
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export default getVideos;