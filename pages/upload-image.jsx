import Head from "next/head";
import { useState } from "react";
import { Container, Stack, Form, Button } from "react-bootstrap";

export default function UploadImage() {
  const [imageSrc, setImageSrc] = useState();
  const [cloudinaryData, setCloudinaryData] = useState();
  const [loading, setLoading] = useState(false);

  function handleOnChange(changeEvent) {
    if (!changeEvent.target.files[0]) {
      setImageSrc(undefined);
      setCloudinaryData(undefined);
      return;
    }

    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setCloudinaryData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <Container className="py-3">
      <Head>
        <title>Upload Image with Cloudinary Example</title>
      </Head>

      <Form
        style={{ maxWidth: 600, margin: "auto" }}
        method="post"
        onChange={handleOnChange}
      >
        <Stack gap={3}>
          <h3>Upload Image with Cloudinary Example</h3>

          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control name="formFile" type="file" accept="image/*" />
          </Form.Group>

          {imageSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imageSrc} alt="Image Upload Result" width="100%" />
          )}

          {imageSrc && !cloudinaryData && (
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          )}

          {cloudinaryData && (
            <code>
              <pre>{JSON.stringify(cloudinaryData, null, 2)}</pre>
            </code>
          )}
        </Stack>
      </Form>
    </Container>
  );
}
