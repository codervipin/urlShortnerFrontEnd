import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Table } from "react-bootstrap";

const UserActivity = () => {
  const [urls, seturls] = useState<any[]>([]);

  const fetchData = async () => {
    const token = Cookies.get("token");
    // console.log(token);

    try {
      const res = await axios.post(
        "http://localhost:5000/user/activity",
        {}, // Empty body since you're sending data in headers
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token correctly in headers
          },
          withCredentials: true, // Ensure cookies are sent with the request
        }
      );

      if (res.status !== 200) {
        throw new Error(res.data);
      }

      // console.log(res);
      seturls(res.data.urls);
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="activity">
      <h2>Your Activity</h2>

      <Table striped bordered hover className="mt-5 "  >
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th >Sr. No</th>
            <th>Short Id</th>
            <th>Target Url</th>
            <th>No Of Clicks</th>
          </tr>
        </thead>
        <tbody>
          {urls.length > 0 ? (
            urls.map((ele, index) => (
              <tr key={ele._id} style={{ textAlign: "center" }}>
                <td>{index + 1}</td>
                <td>{ele.shortId}</td>
                <td>{ele.redirectUrl}</td>
                <td>{ele.visitHistory.length}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ textAlign: "center" }}>
                No URLs found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default UserActivity;
