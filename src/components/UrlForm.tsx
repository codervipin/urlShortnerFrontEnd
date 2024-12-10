import axios from "axios";
import { useState } from "react"

const UrlForm = () => {

  const [isShorten,setIsShorten] = useState<Boolean>(false);
  const [urlData,seturlData] = useState<string>("");
  const [shortUrl,setShortUrl] = useState<string>("");

  const  handleSubmit =async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(urlData.trim() === ''){
        alert("Url is empty")
    }else{
        try{
            const res =await axios.post('http://localhost:5000/url',{url : urlData});

            if(res.status !== 200){
                throw new Error('Error occured');
            }
            else{
                let data = res.data.id;
                setShortUrl(`http://localhost:5000/${data}`)
            }
        }catch(err:any){
            console.log(err);
        }

        
        setIsShorten(true);
        seturlData("");
    }
  }

  const handleCopy =()=>{
    if(shortUrl.trim() !== ""){
        navigator.clipboard.writeText(shortUrl);
        alert('Link copies to Clipboard')
    }else{
        alert('No link to copy')
    }
  }
  return (
    <div className="urlcontainer">
        <h2>Tired of Long Url's, Short it now</h2>

        <form onSubmit={handleSubmit}>
            <input type="text" name="url" placeholder="enter the url to short" value={urlData} onChange={(e)=> seturlData(e.target.value)} /> 
            <button type="submit"> Short Url</button>
        </form>

        {isShorten && <p className="shortenedurl">{shortUrl}   <button onClick={handleCopy}>copy</button></p>}

    </div>
  )
}

export default UrlForm