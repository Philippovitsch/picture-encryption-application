async function fetchSamplePictures() {
  const response = await fetch("http://localhost:8080/api/picture/sample-pictures");
  return (response.ok) ? await response.json() : [];
}

async function fetchBlob(url) {
  const response = await fetch(url);
  return (response.ok) ? response.blob() : null;
}

async function fetchPicture(url, method, formData) {
  let picture = null;
  try {
    const response = await fetch(url, {
      method: method,
      body: formData
    });
    picture = await response.blob();
  } catch (error) {
    console.log("Error: " + error);
  }
  return picture;
}

export { fetchSamplePictures, fetchPicture, fetchBlob };
