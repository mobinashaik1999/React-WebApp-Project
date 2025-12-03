import React, { useEffect, useState } from "react";
const API_BASE_URL = process.env.REACT_APP_API_URL  || "https://react-webapp-project.onrender.com";
function Profiles() {
  const [profiles, setProfiles] = useState([]);
   const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profiles`)
      .then((res) => res.json())
      .then((data) => setProfiles(data))
      .catch((err) =>{ console.error("Error fetching profiles:", err)
                        setError("Server is not connected");}
    );
  }, []);
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  return (
    <div>
      <h2>All Profiles</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Gender</th>
            <th>Resume</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.firstName + profile.lastName}</td>
              <td>{profile.email}</td>
              <td>{profile.contact}</td>
              <td>{profile.gender}</td>
              <td>{profile.resume ? "Yes" : "No"}</td>
              <td>{profile.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Profiles;
