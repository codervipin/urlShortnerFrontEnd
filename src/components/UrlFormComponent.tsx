import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const UrlFormComponent = () => {
  const navigate = useNavigate();

  const [isShorten, setIsShorten] = useState<Boolean>(false);
  const [urlData, seturlData] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (urlData.trim() === "") {
      alert("Url is empty");
    } else {
      const token = Cookies.get("token");
      // console.log(token);
      if (!token) {
        toast.error("Log In to generate url")
        navigate("/login");
      } else {
        try {
          const res = await axios.post(
            "http://localhost:5000/url",
            { url: urlData },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res);
          if (res.status !== 200) {
            throw new Error("Error occured");   
          } else {
            let data = res.data.id;
            setShortUrl(`http://localhost:5000/${data}`);
            toast.success("Url generated")
          }
        } catch (err: any) {
          console.log(err);
        }
      }

      setIsShorten(true);
      seturlData("");
    }
  };

  const handleCopy = () => {
    if (shortUrl.trim() !== "") {
      navigator.clipboard.writeText(shortUrl);
      alert("Link copies to Clipboard");
    } else {
      alert("No link to copy");
    }
  };
  return (
    <>
      <div className="urlcontainer">
        <h2>Tired of Long Url's, Short it now</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="url"
            placeholder="enter the url to short"
            value={urlData}
            onChange={(e) => seturlData(e.target.value)}
          />
          <button type="submit"> Short Url</button>
        </form>

        {isShorten && (
          <p className="shortenedurl">
            {shortUrl} <button onClick={handleCopy}>copy</button>
          </p>
        )}
      </div>
    </>
  );
};

export default UrlFormComponent;
