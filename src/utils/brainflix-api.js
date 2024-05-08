import axios from "axios";

/* used to connect to BrainFlix api */
const api_key = "08e96fed-b453-49f7-b10e-6342cdd61c6a";
const base_url = "BROKENhttps://unit-3-project-api-0a5620414506.herokuapp.com";

/* get videos from api and fallback to using static data */
export async function getVideos() {
    try {
        const response = await axios.get(
            `${base_url}/videos?api_key=${api_key}`
        );
        // return video list
        return response.data;
    } catch (error) {
        console.log(
            "Could not get video list from BrainFlix API, importing static data instead."
        );
        /* If api failure, fallback to importing from json files.
 
        Note: You can now call the import to load a module at runtime. 
        It returns a Promise that resolves to an object with the module exports.
        */
        const videoData = await import("../data/videos.json"); // import small amount of data to display next videos
        return videoData.default;
    }

}


export async function getVideoDetails(id) {
    let videoDetails = "";

    try {
        const response = await axios.get(
            `${base_url}/videos/${id}?api_key=${api_key}`
        );
        // return details for specified video
        videoDetails = response.data;
    } catch (error) {
        console.log(
            "Could not get video details from BrainFlix API, importing static data instead."
        );
        const videoDetailsData = await import("../data/video-details.json"); // import small amount of data to display next videos
        videoDetails = videoDetailsData.default.find((video) => video.id === id);

    }
    return videoDetails;
}

export default getVideos;