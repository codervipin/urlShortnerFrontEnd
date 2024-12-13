import Cookies from "js-cookie";
import { useEffect, useState } from "react";
const Header = () => {

  

  const [isToken,setIsToken] = useState<string>()

  useEffect(()=>{
    const token = Cookies.get('token');
      setIsToken(token);
  },[])
  return (
    <div className="header">
        
        <h1>ShortUrl</h1>

      {isToken && <a href="/activity"><button> Your Activity</button></a>}
        <button>Made with ❣️ by Vipin</button>
        
    </div>
  )
}

export default Header