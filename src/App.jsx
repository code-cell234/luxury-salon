import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { db } from "./firebase";
import { ref, push, onValue  } from "firebase/database";



function App() {const
   [formData, setFormData] = useState({
  name: "",
  phone: "",
  service: "Haircut",
  date: "",
});const cardStyle = {
  background: "#1b1b1b",
  padding: "30px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid #333",
};

const imageStyle = {
  width: "100%",
  height: "300px",
  objectFit: "cover",
  borderRadius: "12px",
};

const inputStyle = {
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #333",
  background: "#1b1b1b",
  color: "white",
  fontSize: "16px",
};
const navLinkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "10px 18px",
  borderRadius: "12px",
  transition: "all 0.3s ease",
};
  const saveAppointment = async () => {
  try {
    if (
  !formData.name.trim() ||
  !formData.phone.trim() ||
  !formData.date
) {
  alert("Please fill all fields.");
  return;
}
if (!/^[6-9]\d{9}$/.test(formData.phone)) {
  alert(
    "Please enter a valid 10-digit Indian mobile number."
  );
  return;
}
    const prices = {
  Haircut: 500,
  "Hair Coloring": 2000,
  Facial: 1500,
  "Bridal Makeup": 10000,
};
const [prices, setPrices] = useState({});
useEffect(() => {
  const servicesRef = ref(db, "services");

  onValue(servicesRef, (snapshot) => {
    if (snapshot.exists()) {
      setPrices(snapshot.val());
    }
  });
}, []);

await push(ref(db, "appointments"), {
  name: formData.name,
  phone: formData.phone,
  service: formData.service,
  price: prices[formData.service],
  date: formData.date,
  createdAt: new Date().toISOString(),
});

    alert(
  "Appointment request received! Please wait for WhatsApp confirmation from the salon."
);

    setFormData({
      name: "",
      phone: "",
      service: "Haircut",
      date: "",
    });
  } catch (error) {
    console.error(error);
    alert("Error saving appointment");
  }
};

return(
  
    <div
  style={{
    background: "#0a0a0a",
    color: "white",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    overflowX: "hidden",
  }}
>
      <nav
  style={{
    display: "flex",
    justifyContent: "space-between",
    padding: "20px 40px",
    borderBottom: "1px solid #333",
    position: "sticky",
    top: 0,
    background: "#0a0a0a",
    zIndex: 1000,
  }}
>
  <div>
    <h1
      style={{
        color: "#D4AF37",
        fontSize: "2rem",
        margin: 0,
      }}
    >
      ✨ Luxury Salon
    </h1>
  </div>

  <div
    style={{
      display: "flex",
      gap: "25px",
      alignItems: "center",
    }}
  >
    <a
  href="#services"
  style={navLinkStyle}
  onMouseEnter={(e) => {
    e.target.style.background =
      "rgba(212,175,55,0.15)";
    e.target.style.color = "#D4AF37";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "white";
  }}
>
  ✂ Services
</a>

    <a
      href="#gallery"
      style={navLinkStyle}
  onMouseEnter={(e) => {
    e.target.style.background =
      "rgba(212,175,55,0.15)";
    e.target.style.color = "#D4AF37";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "white";
  }}
    >
      🖼 Gallery
    </a>

    <a
      href="#reviews"
      style={navLinkStyle}
  onMouseEnter={(e) => {
    e.target.style.background =
      "rgba(212,175,55,0.15)";
    e.target.style.color = "#D4AF37";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "white";
  }}
    >
      ⭐ Reviews
    </a>

    <a
      href="#contact"
      style={navLinkStyle}
  onMouseEnter={(e) => {
    e.target.style.background =
      "rgba(212,175,55,0.15)";
    e.target.style.color = "#D4AF37";
  }}
  onMouseLeave={(e) => {
    e.target.style.background = "transparent";
    e.target.style.color = "white";
  }}
    >
      📞 Contact
    </a>

    <button
      onClick={() =>
        window.open(
          "https://wa.me/919999999999",
          "_blank"
        )
      }
      style={{
        background: "transparent",
        color: "#D4AF37",
        border: "1px solid #D4AF37",
        padding: "12px 20px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "bold",
        transition: "0.3s",
      }}
    >
      <FaWhatsapp />Book Now
    </button>
  </div>
</nav>

      <section
  style={{
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    overflow: "hidden",
  }}
>
  {/* Background Image */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundImage:
        "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      filter: "brightness(0.35)",
    }}
  />

  {/* Dark Overlay */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.85))",
    }}
  />

  {/* Content */}
  <div
    style={{
      position: "relative",
      zIndex: 2,
      maxWidth: "900px",
      padding: "20px",
    }}
  >
    <div
      style={{
        color: "#D4AF37",
        letterSpacing: "6px",
        textTransform: "uppercase",
        marginBottom: "20px",
        fontSize: "0.9rem",
        fontWeight: "600",
      }}
    >
      Premium Luxury Salon
    </div>

    <h1
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "clamp(4rem, 8vw, 7rem)",
        lineHeight: "1",
        marginBottom: "25px",
        color: "white",
        textShadow:
          "0 0 30px rgba(212,175,55,0.25)",
      }}
    >
      Where Elegance
      <br />
      Meets Beauty
    </h1>

    <p
      style={{
        color: "#e5e5e5",
        fontSize: "1.25rem",
        lineHeight: "1.8",
        maxWidth: "700px",
        margin: "0 auto 40px",
      }}
    >
      Premium Hair Styling • Bridal Makeup •
      Luxury Skin Care • Professional Grooming
    </p>

    <button
      onClick={() =>
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" })
      }
      style={{
        background: "#D4AF37",
        color: "black",
        border: "none",
        padding: "18px 40px",
        borderRadius: "50px",
        fontSize: "1rem",
        fontWeight: "700",
        cursor: "pointer",
        boxShadow:
          "0 0 25px rgba(212,175,55,0.4)",
      }}
    >
      Book Appointment
    </button>
  </div>
</section>
<section
  id="gallery"
  style={{
    padding: "80px 20px",
    background: "#0a0a0a",
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#D4AF37",
      fontSize: "2.5rem",
      marginBottom: "40px",
    }}
  >
    Our Work
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "20px",
    }}
  >
    <img
      src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800"
      alt="Salon"
      style={imageStyle}
    />

    <img
      src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800"
      alt="Salon"
      style={imageStyle}
    />

    <img
      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800"
      alt="Salon"
      style={imageStyle}
    />
  </div>
</section>
<section
  id="reviews"
  style={{
    padding: "80px 20px",
    background: "#111",
  }}
>
  <h2
    style={{
      textAlign: "center",
      color: "#D4AF37",
      marginBottom: "40px",
    }}
  >
    Customer Reviews
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "20px",
    }}
  >
    <div style={cardStyle}>
      ⭐⭐⭐⭐⭐
      <p>
        Best salon experience I've ever had.
      </p>
      <strong>- Rahul</strong>
    </div>

    <div style={cardStyle}>
      ⭐⭐⭐⭐⭐
      <p>
        Amazing haircut and friendly staff.
      </p>
      <strong>- Priya</strong>
    </div>

    <div style={cardStyle}>
      ⭐⭐⭐⭐⭐
      <p>
        Premium service at a great price.
      </p>
      <strong>- Aman</strong>
    </div>
  </div>
</section>
<section
  id="contact"
  style={{
    padding: "80px 20px",
    textAlign: "center",
  }}
>
  <h2
    style={{
      color: "#D4AF37",
      marginBottom: "30px",
    }}
  >
    Book Appointment
  </h2>

  <div
    style={{
      maxWidth: "500px",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    }}
  >
    <input
      type="text"
      placeholder="Your Name"
      value={formData.name}
      onChange={(e) =>
        setFormData({
          ...formData,
          name: e.target.value,
        })
      }
      style={inputStyle}
    />

    <input
  type="tel"
  maxLength="10"
  pattern="[6-9]{1}[0-9]{9}"
      placeholder="Phone Number"
      value={formData.phone}
      onChange={(e) =>
        setFormData({
          ...formData,
          phone: e.target.value,
        })
      }
      style={inputStyle}
    />

    <select
      value={formData.service}
      onChange={(e) =>
        setFormData({
          ...formData,
          service: e.target.value,
        })
      }
      style={inputStyle}
    >
      {Object.entries(prices).map(([service, price]) => (
  <option key={service} value={service}>
    {service} - ₹{price}
  </option>
))}
    </select>
    

    <input
      type="date"
      value={formData.date}
      onChange={(e) =>
        setFormData({
          ...formData,
          date: e.target.value,
        })
      }
      style={inputStyle}
    />

    <button
  onClick={saveAppointment}
  style={{
    background: "#D4AF37",
    color: "black",
    padding: "15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Book Appointment
</button>
  </div>
</section><footer
  style={{
    textAlign: "center",
    padding: "30px",
    borderTop: "1px solid #333",
    background: "#111",
  }}
>
  <p>
    © 2026 Luxury Salon. All Rights Reserved.
  </p>
</footer>
    </div>
  );
}

export default App;