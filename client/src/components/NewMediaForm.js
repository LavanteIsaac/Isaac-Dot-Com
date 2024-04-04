import React, { useState } from "react";

function NewMediaForm({ addMedia }) {
  const [imageUrl, setImageUrl] = useState("");
  // const [footageUrl, setFootageUrl] = useState("")
  // // const [lifeUrl, setLifeUrl] = useState("")
  const [discription, setDiscription] = useState("");
  
    const handleSubmit = (event) => {
    event.preventDefault();
    addMedia({ image_url: imageUrl, discription});
    setImageUrl("");
    setDiscription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="discription">Title:</label>
      <input
        type="text"
        id="number"
        value={discription}
        onChange={(event) => setDiscription(event.target.value)}
      />


      <button type="submit">Submit</button>


    </form>
  );
}

export default NewMediaForm;


