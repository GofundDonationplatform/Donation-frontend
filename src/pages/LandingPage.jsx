import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
return (
<div className="landing-container" style={styles.bg}>
{/* Dark overlay */}
<div style={styles.overlay}></div>

{/* Centered content */}  
  <div style={styles.content}>  
  <img  
    src="/images/gfssga-logo1.png"  
    alt="GFSSGA Impact Network Logo"  
    className="w-20 mx-auto mb-6"  
   />  

    <h1 style={styles.title}>GFSSGA IMPACT NETWORK</h1>  
    <h2 style={styles.subtitle}>GofundSS Donation Platform</h2>  

    <p style={styles.text}>  
      A platform designed to support <strong>education</strong>,  
      <strong> women empowerment</strong>, and building a future for the  
      less privileged through transparent and impactful crowdfunding.  
    </p>  

    <Link to="/home">  
      <button style={styles.button}>Enter Platform</button>  
    </Link>  
  </div>  
</div>

);
}

/* === STYLES === */
const styles = {
bg: {
backgroundImage:
"url('https://images.unsplash.com/photo-1509099836639-18ba1795216d')",
backgroundSize: "cover",
backgroundPosition: "center",
height: "100vh",
width: "100vw",
position: "relative",
display: "flex",
justifyContent: "center",
alignItems: "center",
},

overlay: {
position: "absolute",
top: 0,
left: 0,
right: 0,
bottom: 0,
background: "rgba(0, 0, 0, 0.55)",
},

content: {
position: "relative",
color: "white",
textAlign: "center",
padding: "20px",
maxWidth: "90%",
},

logo: {
width: "180px",
height: "auto",
marginBottom: "10px",
},

title: {
fontSize: "2.3rem",
fontWeight: "700",
marginBottom: "8px",
},

subtitle: {
fontSize: "1.3rem",
letterSpacing: "1px",
marginBottom: "18px",
},

text: {
fontSize: "1rem",
lineHeight: "1.6",
maxWidth: "500px",
margin: "auto",
marginBottom: "30px",
},

button: {
padding: "14px 28px",
fontSize: "1.1rem",
fontWeight: "600",
color: "white",
background: "linear-gradient(90deg, #4f46e5, #3b82f6)",
border: "none",
borderRadius: "8px",
cursor: "pointer",
transition: "0.3s",
},
};

Here is my landingpage my gee

