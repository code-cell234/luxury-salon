import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { db } from "./firebase";
import { ref, onValue, remove, update, set} from "firebase/database";
import { FaWhatsapp } from "react-icons/fa";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";


function Admin() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [prices, setPrices] = useState({});
  const filteredAppointments = appointments.filter((item) =>
  item.name?.toLowerCase().includes(search.toLowerCase())
);
  const completeAppointment = async (id) => {
  await update(ref(db, `appointments/${id}`), {
    completed: true,
  });
};
useEffect(() => {
  const servicesRef = ref(db, "services");

  onValue(servicesRef, (snapshot) => {
    if (snapshot.exists()) {
      setPrices(snapshot.val());
    }
  });
}, []);

 

  useEffect(() => {
    if (!loggedIn) return;

    const appointmentsRef = ref(db, "appointments");

    onValue(appointmentsRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setAppointments(list);
      } else {
        setAppointments([]);
      }
    });
  }, [loggedIn]);

 
const deleteAppointment = async (id) => {
    if (!window.confirm("Delete appointment?")) return;

    await remove(ref(db, `appointments/${id}`));
  };
  const pendingCount = appointments.filter(
  (item) => !item.completed
).length;

const completedCount = appointments.filter(
  (item) => item.completed
).length;
const monthlyIncome = appointments
  .filter((item) => item.completed)
  .reduce(
    (total, item) => total + (item.price || 0),
    0
  );
  const cardStyle = {
  background:"#1b1b1b",
  padding:"15px",
  borderRadius:"12px",
  textAlign:"center",
};
const [email, setEmail] = useState("");
useEffect(() => {
  const unsubscribe =
    onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
    });

  return unsubscribe;
}, []);

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#1b1b1b",
            padding: "40px",
            borderRadius: "15px",
            width: "350px",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#D4AF37" }}>
            Admin Login
          </h1>
          <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    borderRadius: "8px",
    border: "none",
  }}
/>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <button
  onClick={async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      setLoggedIn(true);
    } catch {
      alert("Invalid credentials");
    }
  }}
  style={{
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#D4AF37",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Login
</button>
        </div>
      </div>
    );
  }

  return (
  <div
className="admin-container"
style={{
  background:"#0a0a0a",
  minHeight:"100vh",
  color:"white",
  display:"flex",
}}
>
  <button
  className="hamburger"
  onClick={() => setMenuOpen(!menuOpen)}
>
  ☰
</button>
{menuOpen && (
  <div
    className="menu-overlay"
    onClick={() => setMenuOpen(false)}
  />
)}
    {/* Sidebar */}
    <div
className={`sidebar ${menuOpen ? "open" : ""}`}
style={{
 width:"250px",
    background: "#111",
    padding: "30px 20px",
    borderRight: "1px solid #222",
    display: "flex",
    flexDirection: "column",
  }}
>
      <div
  style={{
    background: "#1b1b1b",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    marginBottom: "40px",
    border: "1px solid #222",
  }}
>
  <h2
    style={{
      color: "#D4AF37",
      margin: 0,
    }}
  >
    ✨ Luxury Salon
  </h2>

  <p
    style={{
      color: "#888",
      marginTop: "8px",
      fontSize: "14px",
    }}
  >
    Admin Panel
  </p>
</div>

     <div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
  }}
>
  <div
    style={{
      background: "#D4AF37",
      color: "black",
      padding: "14px",
      borderRadius: "12px",
      fontWeight: "bold",
    }}
  >
    📊 Dashboard
  </div>
  

  <div
    style={{
      background: "#1b1b1b",
      padding: "14px",
      borderRadius: "12px",
    }}
  >
    📅 Appointments
  </div>

  <div
  style={{
    background: "#1b1b1b",
    padding: "14px",
    borderRadius: "12px",
  }}
>
  💰 Stats
</div>

  <div
    style={{
      background: "#1b1b1b",
      padding: "14px",
      borderRadius: "12px",
    }}
  >
    ⚙️ Settings
  </div>
  <div
  style={{
    marginTop: "auto",
    background: "#1b1b1b",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #222",
  }}
>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "12px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: "#D4AF37",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
      }}
    >
      A
    </div>

    <div>
      <strong>Admin</strong>
      <p
        style={{
          color: "#888",
          margin: 0,
          fontSize: "12px",
        }}
      >
        Luxury Salon
      </p>
    </div>
  </div>

  <button
    onClick={() => auth.signOut()}
    style={{
      width: "100%",
      padding: "10px",
      background: "#151515",
      color: "#D4AF37",
      border: "1px solid #D4AF37",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Logout
  </button>
</div>
</div>
</div>

    {/* Main Content */}
    <div
className="main-content"
style={{
 flex:1,
 padding:"30px",
}}
>
      <h1 style={{ color: "#D4AF37" }}>
        Salon Dashboard
      </h1>
      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  

  
</div>

      {/* Stats */}
     <div
className="stats-grid"
style={{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
    gap: "20px",
    marginTop: "20px",
  }}
>
  {/* Total */}
  <div style={cardStyle}>
    <h3>Total</h3>
    <h2>{appointments.length}</h2>
  </div>

  {/* Pending */}
  <div style={cardStyle}>
    <h3>Pending</h3>
    <h2 style={{ color: "orange" }}>{pendingCount}</h2>
  </div>

  {/* Completed */}
  <div style={cardStyle}>
    <h3>Completed</h3>
    <h2 style={{ color: "#25D366" }}>{completedCount}</h2>
  </div>

  {/* Income */}
  <div
  style={{
    background:"#151515",
    border:"1px solid #D4AF37",
    borderRadius:"12px",
    padding:"15px",
    textAlign:"center",
  }}
>
  <h3>Monthly Income</h3>

  <h2 style={{ color:"#D4AF37" }}>
    ₹{monthlyIncome}
  </h2>
</div>

      </div>
      <h2
  style={{
    color: "#D4AFGold",
    marginTop: "30px",
    marginBottom: "15px",
  }}
>
  Service Pricing
</h2>

<div
className="pricing-box"
style={{
background:"#111",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
  }}
>
  {Object.entries(prices).map(([service, price]) => (
    <div
      key={service}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <span>{service}</span>

      <input
  type="text"
  value={price}
  onChange={(e) => {
    setPrices({
      ...prices,
      [service]: e.target.value,
    });
  }}
  style={{
    width: "120px",
    padding: "10px",
    borderRadius: "8px",
    background: "#222",
    color: "white",
    border: "1px solid #444",
  }}
/>
    </div>
  ))}

 <button
  onClick={() => {
    const updatedPrices = {};

    Object.entries(prices).forEach(([service, price]) => {
      updatedPrices[service] = Number(price);
    });

    set(ref(db, "services"), updatedPrices);

    alert("Prices Updated");
  }}
  style={{
    marginTop: "15px",
    padding: "12px 25px",
    background: "#D4AF37",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Save Prices
</button>
</div>

      {/* Search */}
     <input
className="search-box"
type="text"
        placeholder="Search customer..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        style={{
  marginTop: "25px",
  width: "400px",
  padding: "14px 20px",
  borderRadius: "14px",
  border: "1px solid #222",
  background: "#151515",
  color: "white",
  outline: "none",
}}
      />

      {/* Table */}
      <div
        style={{
          marginTop: "25px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#111",
            borderRadius: "12px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#1b1b1b",
              }}
            >
              <th style={{ padding: "18px" }}>
                Name
              </th>
              <th>Phone</th>
              <th>Service</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredAppointments.map((item) => (
              <tr
                key={item.id}
                style={{
                  borderBottom:
                    "1px solid #222",
                }}
              >
                <td style={{ padding: "15px" }}>
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "12px",
    }}
  >
    <div
      style={{
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        background: item.completed
  ? "#25D366"
  : "#D4AF37",
        color: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: "bold",
        fontSize: "16px",
      }}
    >
      {item.name?.charAt(0).toUpperCase()}
    </div>

    <span>{item.name}</span>
  </div>
</td>

                <td>{item.phone}</td>

                <td>{item.service}</td>
                <td>₹{item.price || 0}</td>

                <td>{item.date}</td>

                <td>
                  {item.completed ? (
                    <span
                      style={{
                        color: "#25D366",
                      }}
                    >
                      Completed
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "orange",
                      }}
                    >
                      Pending
                    </span>
                  )}
                </td>

                <td>
  {!item.completed && (
  <button
    onClick={() => {
      const message =
        `Hello ${item.name}, your ${item.service} appointment is confirmed for ${item.date}. We look forward to seeing you at Luxury Salon.`;

      window.open(
        `https://wa.me/91${item.phone}?text=${encodeURIComponent(message)}`,
        "_blank"
      );
    }}
    style={{
      background: "#25D366",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      marginRight: "5px",
      cursor: "pointer",
    }}
  >
   
 
  <FaWhatsapp />
</button>
)}

  <button
    onClick={() => completeAppointment(item.id)}
    style={{
      background: "#151515",
      color: "#D4AF37",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      marginRight: "5px",
      cursor: "pointer",
    }}
  >
    ✓
  </button>

  <button
    onClick={() => deleteAppointment(item.id)}
    style={{
      background: "red",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "6px",
      cursor: "pointer",
    }}
  >
    🗑
  </button>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}

export default Admin;