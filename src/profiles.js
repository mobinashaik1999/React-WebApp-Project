import React, { useEffect, useState } from "react";
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://react-webapp-project.onrender.com";

function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE_URL}/api/profiles`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) setProfiles(data || []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
        if (!cancelled) setError("Server is not connected");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", flexDirection: "column" }} aria-busy="true">
        <div style={{ width: 48, height: 48, border: "6px solid #eee", borderTopColor: "#0078d4", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <div style={{ marginTop: 12 }}>Loading profiles…</div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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
          {profiles && profiles.length ? profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{`${profile.firstname || ""} ${profile.lastname || ""}`.trim()}</td>
              <td>{profile.email}</td>
              <td>{profile.contact}</td>
              <td>{profile.gender}</td>
              <td>{profile.resume ? "Yes" : "No"}</td>
              <td>{profile.url}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={7} style={{ textAlign: "center" }}>No profiles found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Profiles;
