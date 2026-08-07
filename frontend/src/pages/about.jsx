import { Layers, Ruler, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";
import tShirt from "../assets/images/t-shirt.jpg";
import hat from "../assets/images/hat.jpg";
import shoes from "../assets/images/shoes.jpg";

function About() {
  const principles = [
    {
      icon: Layers,
      title: "Fewer, Better Materials",
      copy: "Combed cotton, cotton twill, real rubber outsoles. We'd rather cut a piece from one honest fabric than dress it up with three cheap ones.",
    },
    {
      icon: Ruler,
      title: "Fit Before Fashion",
      copy: "Every pattern gets worn, washed, and re-cut before it's stocked. If it doesn't hold its shape after a season, it doesn't make the rail.",
    },
    {
      icon: RotateCcw,
      title: "Built to Be Re-worn",
      copy: "Not seasonal, not disposable. The pieces in this catalogue are meant to outlast the trend they were bought for.",
    },
  ];

  return (
    <div className="body">
      {/* ---------- Hero ---------- */}
      <div className="relative m-10 h-90 rounded-3xl overflow-hidden border-green-800 border-2">
        <img
          src={shoes}
          alt="Closet & Core essentials"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-green-950/85 via-green-950/40 to-green-950/10" />
        <div className="relative h-full flex flex-col justify-end p-8 sm:p-12 text-[#FBF9F4]">
          <p className="text-xs tracking-[0.3em] uppercase text-green-200 mb-3">
            Closet &amp; Core &middot; Since 2026
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight max-w-xl">
            The Basics, Done Properly
          </h1>
          <p className="mt-4 max-w-md text-sm sm:text-base text-gray-200">
            We make a small, considered range of clothing, headwear and footwear
            — the pieces that sit at the core of a closet, not the edges of it.
          </p>
        </div>
      </div>

      {/* ---------- Story ---------- */}
      <div className="m-10 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-serif font-bold mb-4">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4 text-sm sm:text-base">
            Closet &amp; Core started with a short list: a t-shirt that actually
            holds its shape, a cap that doesn't crease in a bag, and a pair of
            sneakers you can wear every single day without apologising for them.
            Everything else came after that list, not before it.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
            We're a small team based in Kathmandu, working with local makers and
            a handful of trusted mills. We keep the catalogue deliberately
            narrow — every product on this site is one we'd restock ourselves,
            in our own size, without thinking twice.
          </p>
        </div>

        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          <img
            src={tShirt}
            alt="Cotton t-shirt"
            className="rounded-2xl border-2 border-gray-300 object-cover h-48 sm:h-56 w-full col-span-2 sm:col-span-1"
          />
          <img
            src={hat}
            alt="Embroidered cap"
            className="rounded-2xl border-2 border-gray-300 object-cover h-48 sm:h-56 w-full hidden sm:block"
          />
          <img
            src={shoes}
            alt="White sneakers"
            className="rounded-2xl border-2 border-gray-300 object-cover h-48 sm:h-56 w-full col-span-2"
          />
        </div>
      </div>

      {/* ---------- Principles ---------- */}
      <div className="m-10">
        <h2 className="text-2xl font-serif font-bold mb-1">
          What "Core" Means to Us
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6">
          Three rules every product has to pass before it's allowed on the site.
        </p>
        <div className="flex flex-wrap gap-6">
          {principles.map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="flex-1 min-w-65 border-gray-300 border-2 rounded-2xl p-6 hover:border-green-800 duration-300"
            >
              <div className="w-11 h-11 rounded-full bg-green-900 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-serif text-lg font-bold mb-2">{title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Care-label style facts strip (echoes the product detail swing tag) ---------- */}
      <div className="m-10 flex justify-center">
        <div className="relative bg-[#FBF9F4] border-2 border-green-900/80 rounded-[1.75rem] px-8 py-8 sm:px-12 max-w-3xl w-full">
          <div className="absolute inset-2.5 rounded-[1.4rem] border border-dashed border-green-900/25 pointer-events-none" />
          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1">
                Founded
              </p>
              <p className="font-serif text-lg font-bold text-green-900">
                2023
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1">
                Based In
              </p>
              <p className="font-serif text-lg font-bold text-green-900">
                Dharan
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1">
                Core Range
              </p>
              <p className="font-serif text-lg font-bold text-green-900">
                3 Categories
              </p>
            </div>
            <div>
              <p className="text-xs tracking-[0.15em] uppercase text-gray-500 mb-1">
                Shipping
              </p>
              <p className="font-serif text-lg font-bold text-green-900">
                Nationwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- CTA ---------- */}
      <div className="m-10 mb-16 text-center">
        <h2 className="text-2xl font-serif font-bold mb-3">
          See the Current Range
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md mx-auto">
          Everything we make is on the shelf. Nothing held back for a
          "collection".
        </p>
        <Link
          to="/products"
          className="navButton bg-green-900 hover:bg-green-950 text-white duration-200 inline-block"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
}

export default About;
