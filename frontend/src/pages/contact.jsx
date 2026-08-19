import { useState } from "react";
import { Send, Check, } from "lucide-react";
import { contacts } from "../data/contact";

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
          Questions about an order, sizing, or a product on the shelf? Let us know, we read
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
              className="inputBox w-full py-2"
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
              placeholder="Order, sizing, others..."
              className="inputBox w-full py-2"
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
              className=" border border-gray-400 bg-gray-200 rounded-sm w-full px-2 py-2
              focus:outline-green-800"
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
              Thank you! We'll get back to you soon.
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
                Closet & Core
              </h2>

              {contacts.map((contact) => {
                const Icon = contact.icon;

                return (
                  <div 
                    key={contact.id}
                    className="flex flex-col gap-5 text-sm mb-6"
                  >
                    <div className="flex items-center gap-3">
                      {
                        contact.title === "Instagram" 
                        ?<Icon/>
                        :<Icon className="size-5.5 text-green-900 mt-0.5 shrink-0" />
                      }      

                      <div>
                        <p className="font-medium">{contact.title}</p>

                        <p className="text-gray-600">{contact.identifier}</p>
                      </div>
                    </div>
                  </div>
              )})}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
