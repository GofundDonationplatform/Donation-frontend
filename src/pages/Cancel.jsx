import React from "react";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <section className="container center" style={{paddingTop:40}}>
      <div style={{maxWidth:600, margin:"0 auto", color:"#fff"}}>
        <h2>Payment Cancelled</h2>
        <p className="muted">It looks like your donation was canceled. You can try again anytime.</p>
        <div style={{marginTop:12}}>
          <Link to="/donate" className="btn">Try Again</Link>
        </div>
      </div>
    </section>
  );
}
