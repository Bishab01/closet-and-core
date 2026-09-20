import { useState } from "react";
import { useContacts } from "../data/contactDetails";
import Footer from "../components/footer";
import { useAuth } from "../context/AuthContext";
import { Plus, Phone, X, Check, Ban, SquarePen } from "lucide-react";
import ContactDetails from "../components/retailer/contactDetailsForm";
import { deleteContact } from "../api/contact";

function Contact() {
  const { user } = useAuth();
  const isRetailer = user?.role === "retailer";

  const { contacts, setContacts, fetchContacts } = useContacts();

  const [showForm, setShowForm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [ctype, setCType] = useState("success"); //success or error
  const [formMode, setFormMode] = useState ("add"); //add or edit
  const [editingContact, setEditingContact] = useState(null);

  const openAddForm = () => {
      setFormMode("add");
      setEditingContact(null);
      setShowForm(prev => !prev);
  };

  const openEditForm = (id) => {
      const contact = contacts.find((item)=>item.id === id)
      if (contact) {
          setEditingContact(contact);
          setFormMode("edit");
          setShowForm(prev => !prev);
      }
  };

  const handleSave = () => {
    setShowForm(prev => !prev );
    fetchContacts();
  }

  const handleDelete = async(id) =>
  {
    if (!deleteTarget) return;
    setConfirmation("");
    setDeleting(true);

    try
    {
      const data = await deleteContact(id);

      if(data.success){
        setCType("success");
        setConfirmation(data.message);
        setContacts((prev) => prev.filter((contact) => contact.id !== id));
      }
      else{
        setCType("error");
        setConfirmation(data.message);
      }
    } catch(error){
      console.error(error);
      setCType("error");
      setConfirmation(error.message);
    } finally{
      setDeleting(false);
      setDeleteTarget(null);
    }
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
                onClick={openAddForm}
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
        {contacts.length === 0 ?
        (
          <div 
              className="flex flex-col items-center justify-center text-center p-20 gap-4
              border border-dashed bg-white/60 rounded-3xl"
          >
              <Ban className="size-9 mb-1 text-red-600"/>
              <p className="text-xl sm:text-2xl font-serif font-bold">
                  No Contact Details Available
              </p>
              <p className="text-gray-600">
                {isRetailer ? "Add your contact details by clicking the 'Add Contact Details' button above" : "The shop's owner has yet to share their contact details."}
              </p>
          </div>
        )
        :(
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
                  relative
                  ${
                    isAlone? "sm:col-span-2 sm:max-w-[calc(50%-0.625rem)] sm:mx-auto" : ""
                  }
                `}
              >
                {isRetailer && 
                  <div className="absolute top-5.5 right-5.5 text-gray-500 flex gap-2 ">
                    <button
                      className="hover:text-gray-700"
                      onClick={() => openEditForm(contact.id)}
                    >
                      <SquarePen className="size-4.5"/>
                    </button>
                    <button
                      className="hover:text-gray-700"
                      onClick={() => setDeleteTarget(contact)}
                    >
                      <X className="size-4.5"/>
                    </button>
                  </div>
                }
                <div
                  className="
                    h-full
                    rounded-2xl
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
        )}
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
        mode={formMode}
        initialDetails={editingContact}
        onClose={()=>setShowForm(prev=>!prev)}
        onSaved={handleSave}
      />
    }

    {/* Delete confirmation */}
    {deleteTarget && (
      <div className="popUp">
          <div className="bg-white rounded-xl flex flex-col items-center justify-center w-80 p-5 font-sans">
              <h1 className="font-medium text-lg mb-3 text-gray-800">Delete contact detail?</h1>
              <p className="text-sm text-gray-600 text-center mb-5">
                  Contact details for "{deleteTarget.platform}" will be permanently deleted.
              </p>
              <div className="flex justify-end gap-2">
                  <button
                      onClick={() => setDeleteTarget(null)}
                      disabled={deleting}
                      className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
                  >
                      Cancel
                  </button>
                  <button
                      onClick={()=>handleDelete(deleteTarget.id)}
                      disabled={deleting}
                      className="button bg-red-500 text-white hover:bg-red-600 disabled:opacity-60"
                  >
                      {deleting ? "Deleting..." : "Delete"}
                  </button>
              </div>
          </div>
      </div>
    )}

    {confirmation &&
      <div className="popUp">
          <div className="bg-white rounded-xl flex flex-col items-center space-y-2.5 justify-center w-80 p-5 font-sans">
              <div className={`rounded-full text-white p-1.5
                  ${ctype === "success" ? "bg-green-600" : "bg-red-500"}`}>
                  {
                    ctype === "success" 
                    ? <Check className="size-7"/>
                    : <X className="size-7"/>
                  }
              </div>
              
              <p
                className="font-medium text-lg text-center px-3 py-1.5 text-gray-700" 
              >
                  {confirmation}
              </p>
              <button
                  onClick={() => setConfirmation("")}
                  className="button border border-gray-400 text-gray-700 hover:bg-gray-100"
              >
                  Close
              </button>
              
          </div>
      </div>
    }
  </div>
  );
}

export default Contact;