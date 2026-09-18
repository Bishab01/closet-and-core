import { useState } from "react";
// import { Send, Check, } from "lucide-react";
import { useContacts } from "../data/contactDetails";
import Footer from "../components/footer";
import { useAuth } from "../context/AuthContext";
import { Plus, Phone } from "lucide-react";
import ContactDetails from "../components/retailer/contactDetailsForm";

function Contact() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   subject: "",
  //   message: "",
  // });

  // const [msg, setMsg] = useState("");
  // const [msgType, setMsgType] = useState("");
  // const [sent, setSent] = useState(false);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.name.trim()) {
  //     setMsg("Please tell us your name.");
  //     setMsgType("error");
  //     return;
  //   }

  //   if (!formData.message.trim()) {
  //     setMsg("Your suggestion or review can't be empty.");
  //     setMsgType("error");
  //     return;
  //   }

  //   setMsg("");
  //   setSent(true);

  //   setFormData({
  //     name: "",
  //     subject: "",
  //     message: "",
  //   });

  //   setTimeout(() => {
  //     setSent(false);
  //   }, 3500);
  // };
  const { user } = useAuth();
  const isRetailer = user?.role === "retailer";

  const { contacts, fetchContacts } = useContacts();

  const [showForm, setShowForm] = useState(false);

  const handleSave = () => {
    setShowForm(prev => !prev );
    fetchContacts();
  }
  
  return (
  <div className="body flex flex-col">
    <div className="flex-1 items-center justify-center responsiveM">

      {/* ---------- Header ---------- */}
      <header className="text-center pt-2">
        {isRetailer && (
          <div className="max-w-xl mx-auto mb-6 md:mb-8 border border-green-900/20 bg-green-50/80 rounded-2xl px-6 py-5 shadow-sm">
            <div className="flex flex-col items-center text-center">

              {/* Icon */}
              <div className="w-11 h-11 rounded-full bg-green-900/10 flex items-center justify-center mb-3">
                <Phone className="size-5 text-green-900" />
              </div>

              {/* Heading */}
              <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-semibold">
                Connect with your customers
              </p>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mt-2">
                Add your shop's contact details so customers can reach you directly
                with questions, support, or inquiries.
              </p>

              {/* Action */}
              <button
                onClick={()=>setShowForm(prev=>!prev)}
                className="
                  mt-4
                  button rounded-xl! py-2.5! px-5!
                  text-sm!
                  flex items-center justify-center gap-2
                  bg-green-800 text-white
                  hover:bg-green-900
                  transition-colors duration-200
                "
              >
                <Plus className="size-4" />
                Add Contact Details
              </button>

            </div>
          </div>
        )}

        {!isRetailer && 
          <p className="text-xs tracking-[0.2em] uppercase text-green-900 font-semibold mb-4">
            GET IN TOUCH
          </p>
        }

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
          Contact Us
        </h1>

        {!isRetailer && 
          <p className="text-sm sm:text-base text-gray-600 max-w-lg mx-auto mt-4 leading-relaxed">
            Have a question or want to connect? Reach out to us through any of
            the channels below.
          </p>
        }

      </header>

      {/* ---------- Contact Information ---------- */}
      <section className="mt-10 md:mt-12 flex items-center justify-center">
        <div className="max-w-220 w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
        {contacts.map((contact, index) => {
          const Icon = contact.icon;
          const isAlone = contacts.length % 2 !== 0 && index === contacts.length-1;
          return (
          <div
            key={contact.id}
            className={`
              group
              bg-[#FBF9F4]
              border-2 border-green-900/40
              rounded-3xl
              p-3
              w-full
              shadow-sm
              hover:shadow-md
              hover:-translate-y-1
              transition-all duration-300
              ${
                isAlone? "sm:col-span-2 sm:max-w-[calc(50%-0.625rem)] sm:mx-auto" : ""
              }
            `}
          >
            <div
              className="
                h-full
                rounded-[1.4rem]
                border border-dashed border-green-900/30
                px-5 py-7
                flex flex-col items-center justify-center
                text-center
                group-hover:border-green-900/40
                transition-colors duration-300
              "
            >
              {/* Icon */}
              <div
                className="
                  w-14 h-14
                  rounded-full
                  bg-green-900/10
                  flex items-center justify-center
                  mb-4
                  group-hover:bg-green-900
                  transition-colors duration-300
                "
              >
                {contact.platform === "instagram" ? (
                  <Icon className="text-green-900 transition-colors duration-300" hw="6"/>
                ) : (
                  <Icon className="size-5.5 text-green-900 group-hover:text-white transition-colors duration-300" />
                )}
              </div>

              {/* Contact platform */}
              <p className="font-semibold text-gray-900">
                {contact.platform}
              </p>

              {/* Contact information */}
              <p className="text-sm text-gray-600 mt-1 break-all">
                {contact.platform === "instagram" 
                  ? "@"+contact.handle
                  : contact.platform === "whatsapp" || contact.platform === "phone"
                  ? "+977 "+contact.handle
                  : contact.handle
                }
              </p>
            </div>
          </div>
          );
        })}
        </div>
      </section>

      {/* ---------- Footer Message ---------- */}
      <footer className="text-center mt-12 pb-6">
        <div className="w-12 h-px bg-green-900/30 mx-auto mb-5" />

        <p className="text-sm font-medium text-green-900">
          We'd love to hear from you.
        </p>

        <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">
          Whether you're looking for more information or have a complaint,
          we're always happy to hear from you.
        </p>
      </footer>

    </div>

    <Footer/>

    {showForm && 
      <ContactDetails
        onClose={()=>setShowForm(prev=>!prev)}
        onSaved={handleSave}
      />
    }
  </div>
  );
}

export default Contact;

{/* <div className="mx-10 mb-16 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start"> 
  ---------- Contact Form ---------- 
  <form 
    onSubmit={handleSubmit}  
    className="w-full lg:w-3/5 border-gray-300 border-2 rounded-3xl p-6 sm:p-8" 
  > 
  Name 
  <div className="flex flex-col"> 
  <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5"> Name </label> 
  <input 
    type="text" 
    name="name" 
    value={formData.name} 
    onChange={handleChange} 
    placeholder="Your full name" 
    className="inputBox w-full py-2" 
  /> 
  </div> 
  
  Subject 
  <div className="flex flex-col mt-4"> 
  <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5"> Subject </label> 
  <input 
    type="text" 
    name="subject" 
    value={formData.subject} 
    onChange={handleChange} 
    placeholder="Order, sizing, others..." 
    className="inputBox w-full py-2" 
  /> 
  </div> 
  
  Suggestion / Review 
  <div className="flex flex-col mt-4"> 
  <label className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1.5"> Suggestion / Review </label> 
  <textarea 
    name="message" 
    value={formData.message} 
    onChange={handleChange} 
    placeholder="Share your suggestion or review..." 
    rows={5} 
    className=" border border-gray-400 bg-gray-200 rounded-sm w-full px-2 py-2 focus:outline-green-800" 
  /> 
  </div> 
  
  Error Message 
  {msg && 
  ( 
    <p className={text-sm mt-4 
      ${ msgType === "error" 
      ? "text-red-600" 
      : "text-green-800" }} 
    > 
      {msg} 
    </p> 
  )} 
    
  Submit Button 
  <button 
    type="submit" 
    className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 bg-green-900 hover:bg-green-950 
    duration-200 text-white font-medium rounded-xl px-6 py-2.5" 
  > 
  {sent 
    ? ( <> <Check className="w-4 h-4" /> Message Sent </> ) 
    : ( <> <Send className="w-4 h-4" /> Send Message </> )} 
  </button> 
  
  Success Message 
  {sent && 
    ( 
      <p className="text-sm text-green-800 mt-3"> 
        Thank you! We'll get back to you soon. 
      </p> 
  )} 
</form> 
</div> */}