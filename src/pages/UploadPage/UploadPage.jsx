import "./UploadPage.scss";
import uploadVideoPreview from "../../assets/images/Upload-video-preview.jpg";
import Form from "../../components/Form/Form";
import Btn from "../../components/Btn";

function UploadPage() {
  return (
    <main className="upload-page">
      <h1 className="upload-page__title">Upload Video</h1>
      <div className="upload-page__container">
        <div>
          <h2 className="upload-page__subtitle">Video Thumbnail</h2>
          <img src={uploadVideoPreview} alt="" className="upload-page__img" />
        </div>
        <Form cta="publish" />
      </div>
      <div className="upload-page__cta-btn-nav">
        <div className="upload-page__cta-btn-container">
          <Btn label="publish" />
        </div>
        <div className="upload-page__cta-btn-container">
          <Btn label="cancel" />
        </div>
      </div>
    </main>
  );
}

export default UploadPage;
