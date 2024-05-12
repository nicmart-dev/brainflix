import axios from "axios";

/* used to connect to BrainFlix api */
const api_key = "08e96fed-b453-49f7-b10e-6342cdd61c6a";
const base_url = "https://unit-3-project-api-0a5620414506.herokuapp.com";


/* get videos from api */
export async function getVideos() {
    try {
        const response = await axios.get(
            `${base_url}/videos?api_key=${api_key}`
        );
        // return video list
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
/* import video data from json file.
Note: You can now call the import to load a module at runtime. 
It returns a Promise that resolves to an object with the module exports. */
export async function getStaticData() {
    const videoData = await import("../data/videos.json");
    return videoData.default;
}

/* get details of a specific video from api */
export async function getVideoDetails(id) {
    try {
        const response = await axios.get(
            `${base_url}/videos/${id}?api_key=${api_key}`
        );
        // return details for specified video
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

/* import detailed video data from json file. */
export async function getStaticDetailsData(id) {
    const videoDetailsData = await import("../data/video-details.json"); // import small amount of data to display next videos
    const videoDetails = videoDetailsData.default.find((video) => video.id === id);
    return videoDetails;
}

/* post comment using api and fallback to just add comments manually to state
if api error or if useAPI flag set to false */
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




export default getVideos;