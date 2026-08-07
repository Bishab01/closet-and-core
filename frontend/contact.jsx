import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState(""); // success or error
  const [sent, setSent] = useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setMsg("Please tell us your name.");
      setMsgType("error");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setMsg("Please enter a valid email address.");
      setMsgType("error");
      return;
    }
    if (!formData.message.trim()) {
      setMsg("Your message can't be empty.");
      setMsgType("error");
      return;
    }

    // No backend endpoint is wired up yet — this simply confirms the
    // message was captured client-side, following the same pattern as
    // the "Add to Bag" confirmation on the product detail page.
    setMsg("");
    setSent(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <div className="body">
      {/* ---------- Header ---------- */}
      <div className="m-10 mb-6">
        <h1 className="text-2xl font-serif font-bold">Contact Us</h1>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Questions about an order, sizing, or a product on the shelf —
          we read every message ourselves.
        </p>
      </div>

      <div className="mx-10 mb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* ---------- Form ---------- */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/5 border-gray-300 border-2 rounded-3xl p-6 sm:p-8"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="inputBox !mt-0 !ml-0 w-full px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="inputBox !mt-0 !ml-0 w-full px-3 py-2"
              />
            </div>
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Order, sizing, wholesale, other..."
              className="inputBox !mt-0 !ml-0 w-full px-3 py-2"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="How can we help?"
              rows={5}
              className="inputBox !mt-0 !ml-0 w-full px-3 py-2 resize-none"
            />
          </div>

          {msg && (
            <p className="text-sm text-red-600 mt-4">{msg}</p>
          )}

          <button
            type="submit"
            className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-900 hover:bg-green-950 duration-200 text-white font-medium rounded-xl px-6 py-2.5"
          >
            {sent ? (
              <>
                <Check className="w-4 h-4" />
                Message Sent
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Send Message
              </>
            )}
          </button>
          {sent && (
            <p className="text-sm text-green-800 mt-3">
              Thanks — we'll get back to you within a couple of days.
            </p>
          )}
        </form>

        {/* ---------- Swing-tag info card (echoes the product detail page) ---------- */}
        <div className="w-full lg:w-2/5 relative">
          <svg
            className="absolute -top-6 left-9 w-8 h-8 text-green-900/70 pointer-events-none hidden sm:block"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16 30 C16 30 5 24 5 14 C5 7 10 3 16 3 C22 3 27 7 27 14 C27 24 16 30 16 30 Z"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
          </svg>

          <div className="relative bg-[#FBF9F4] border-2 border-green-900/80 rounded-[1.75rem] p-6 sm:p-8 pt-10 shadow-sm">
            <div className="absolute -top-3.5 left-6 w-7 h-7 rounded-full bg-[#FBF9F4] border-2 border-green-900/80" />
            <div className="absolute inset-2.5 rounded-[1.4rem] border border-dashed border-green-900/25 pointer-events-none" />

            <div className="relative">
              <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                Get In Touch
              </p>
              <h2 className="font-serif text-2xl font-bold leading-snug mt-2 mb-6">
                Closet &amp; Core
              </h2>

              <div className="flex flex-col gap-5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4.5 h-4.5 text-green-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Store &amp; Studio</p>
                    <p className="text-gray-600">
                      Jhamsikhel, Lalitpur, Kathmandu Valley, Nepal
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4.5 h-4.5 text-green-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+977 1-552-0000</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4.5 h-4.5 text-green-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">hello@closetandcore.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4.5 h-4.5 text-green-900 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-gray-600">Sun–Fri, 11am–7pm</p>
                    <p className="text-gray-600">Closed Saturdays</p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-green-900/15" />

              <p className="text-xs text-gray-500 leading-relaxed">
                Placeholder contact details — swap these for your real
                address, number and inbox before launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
