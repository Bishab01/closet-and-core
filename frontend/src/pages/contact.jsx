import { useState } from "react";
import { Mail, Phone, Send, Check, MessageCircle } from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    message: "",
  });

  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("");
  const [sent, setSent] = useState(false);

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

    if (!formData.message.trim()) {
      setMsg("Your suggestion or review can't be empty.");
      setMsgType("error");
      return;
    }

    setMsg("");
    setSent(true);

    setFormData({
      name: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSent(false);
    }, 3500);
  };

  return (
    <div className="body">
      {/* ---------- Header ---------- */}
      <div className="m-10 mb-6">
        <h1 className="text-2xl font-serif font-bold">Contact Us</h1>

        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Questions about an order, sizing, or a product on the shelf — we read
          every message ourselves.
        </p>
      </div>

      <div className="mx-10 mb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* ---------- Contact Form ---------- */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/5 border-gray-300 border-2 rounded-3xl p-6 sm:p-8"
        >
          {/* Name */}
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
              className="inputBox w-full px-3 py-2"
            />
          </div>

          {/* Subject */}
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
              className="inputBox w-full px-3 py-2"
            />
          </div>

          {/* Suggestion / Review */}
          <div className="flex flex-col mt-4">
            <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5">
              Suggestion / Review
            </label>

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Share your suggestion or review..."
              rows={5}
              className="inputBox w-full px-3 py-2 resize-none"
            />
          </div>

          {/* Error Message */}
          {msg && (
            <p
              className={`text-sm mt-4 ${
                msgType === "error" ? "text-red-600" : "text-green-800"
              }`}
            >
              {msg}
            </p>
          )}

          {/* Submit Button */}
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

          {/* Success Message */}
          {sent && (
            <p className="text-sm text-green-800 mt-3">
              Thanks — we'll get back to you within a couple of days.
            </p>
          )}
        </form>

        {/* ---------- Contact Information ---------- */}
        <div className="w-full lg:w-2/5 relative">
          {/* Contact Card */}
          <div className="relative bg-[#FBF9F4] border-2 border-green-900/80 rounded-[1.75rem] p-6 sm:p-8 pt-10 shadow-sm">
            {/* Dashed Inner Border */}
            <div className="absolute inset-2.5 rounded-[1.4rem] border border-dashed border-green-900/25 pointer-events-none" />

            <div className="relative">
              <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-medium">
                Get In Touch
              </p>

              <h2 className="font-serif text-2xl font-bold leading-snug mt-2 mb-6">
                Closet &amp; Core
              </h2>

              <div className="flex flex-col gap-5 text-sm">
                {/* Instagram */}
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-900 mt-0.5 shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle
                      cx="17.5"
                      cy="6.5"
                      r="1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>

                  <div>
                    <p className="font-medium">Instagram</p>

                    <p className="text-gray-600">@closetandcore</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-green-900 mt-0.5 shrink-0" />

                  <div>
                    <p className="font-medium">Phone</p>

                    <p className="text-gray-600">+977 9804314464</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-green-900 mt-0.5 shrink-0" />

                  <div>
                    <p className="font-medium">Email</p>

                    <p className="text-gray-600">hello@closetandcore.com</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-green-900 mt-0.5 shrink-0" />

                  <div>
                    <p className="font-medium">WhatsApp</p>

                    <p className="text-gray-600">+977 9804314464</p>
                  </div>
                </div>
              </div>

              <hr className="my-6 border-green-900/15" />

              <p className="text-xs text-gray-500 leading-relaxed">
                Placeholder contact details — swap these for your real
                Instagram, phone number, email and WhatsApp before launch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
