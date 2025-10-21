import React from "react";
import { Link } from "react-router-dom";

export default function Success() {
  return (
    <section className="container center" style={{paddingTop:40}}>
      <div style={{maxWidth:600, margin:"0 auto", color:"#fff"}}>
        <h2>🎉 Thank You!</h2>
        <p className="muted">Your donation has been received successfully. We appreciate your kindness and support.</p>
        <div style={{marginTop:12}}>
          <Link to="/" className="btn">Back to Home</Link>
        </div>
      </div>
    </section>
  );
}
