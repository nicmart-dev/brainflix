import "./UploadPage.scss";
import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";
import Form from "../../components/Form/Form";

function UploadPage() {
  return (
    <main className="upload-page">
      <h1>Upload Video</h1>
      <h2>Video Thumbnail</h2>
      <img src={uploadVideoPreview} alt="" className="upload-page__img" />
      <Form cta="publish" />
    </main>
  );
}

export default UploadPage;
