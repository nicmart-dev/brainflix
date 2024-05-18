import axios from "axios";

/* used to connect to BrainFlix api */
const api_key = "08e96fed-b453-49f7-b10e-6342cdd61c6a";

// remove when comments APIs refactor completed
const base_url = "https://unit-3-project-api-0a5620414506.herokuapp.com";


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
    }
}


/* post comment using api */
export async function postComment(videoId, comment) {
    try {
        const response = await axios.post(
            `${base_url}/videos/${videoId}/comments?api_key=${api_key}`, comment
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
            `${base_url}/videos/${videoId}/comments/${commentId}?api_key=${api_key}`
        );
        // return posted comment
        return response.data;
    } catch (error) {
        console.log(error);
    }
}





export default getVideos;