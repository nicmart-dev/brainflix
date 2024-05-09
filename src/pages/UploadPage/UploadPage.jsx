import "./UploadPage.scss";
import Form from "../../components/Form/Form";

function UploadPage() {
  return (
    <main className="upload-page">
      <h1 className="upload-page__title">Upload Video</h1>
      <Form cta="publish" />
    </main>
  );
}

export default UploadPage;
