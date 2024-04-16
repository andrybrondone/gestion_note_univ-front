import axios from "axios";
import { useEffect, useState } from "react";

export default function Testimg() {
  const [file, setFile] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/").then((res) => {
      setData(res.data[0]);
      console.log(res.data);
    });
  }, []);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    const formdata = new FormData();
    formdata.append("photo", file);
    axios
      .post("http://localhost:3001/etudiant", formdata)
      .then((res) => {
        if (res.data.Status === "success") {
          console.log("ok");
        } else {
          console.log("non");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="text-caption1">
      <input type="file" name="photo" onChange={handleFile} />
      <button onClick={handleUpload}>send</button>
      <br />
      <img src={`http://localhost:3001/images/` + data.image} alt="" />
    </div>
  );
}
