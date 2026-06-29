function Footer() {
    return(
        <div className="footer"id="footer">
         
            <div className="footer-column">
                    <img src="/Logo1.png" alt="Logo" />
                    <p>WE are a residential design firm located in<br/> Portland. Our boutique offers more than</p>

                <div className="footer-icon">
                    <a href="https://twitter.com"><img src="/Twitter.png" alt="Twitter" /></a>
                    <a href="https://facebook.com"><img src="/Facebook.png" alt="Facebook" /></a>
                    <a href="https://tiktok.com"><img src="/Tiktok.png" alt="TikTok" /></a>
                    <a href="https://instagram.com"><img src="/Instagram.png" alt="Instagram" /></a>
                </div>
            </div>
                <div className="footer-column1">
                    <h3 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 400,
  }}>Services</h3>

                    <a href="#">Bonus program</a>
                    <a href="#">Gift cards</a>
                    <a href="#">Credits and payments</a>
                    <a href="#">Services contracts</a>
                    <a href="#">Non-cash account</a>
                    <a href="#">Payment</a>
                </div>
                
                <div className="footer-column1">
                    <h3 style={{
    fontFamily: "var(--font-inter)",
    fontWeight: 400,
  }}>Assistance to the buyer</h3>

                    <a href="#">Find an order</a>
                    <a href="#">Exchange and terms of goods</a>
                    <a href="#">Guarantee</a>
                    <a href="#">Frequently asked questions</a>
                    <a href="#">Terms of use of the site</a>
                </div>

        </div>
    );
}

export default Footer;