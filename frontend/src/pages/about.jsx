import {
  Users,
  Store,
  ArrowRight,
  Check,
  X,
} from "lucide-react";
import { principles, team } from "../data/aboutUs";
import logo from "../assets/logos/logo2.png";

function About() {
  return (
    <div className="body">

      {/* HERO */}
      <section className="m-6 sm:m-10">
        <div className="relative overflow-hidden rounded-3xl bg-[#1B4332] min-h-105">

          {/* Decorative shapes */}
          <div className="absolute -right-24 -top-24 w-80 h-80 rounded-full border border-green-700/40" />
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full border border-green-700/30" />

          <div className="absolute -left-32 -bottom-40 w-96 h-96 rounded-full bg-green-950/40" />

          <div className="relative z-10 px-8 py-14 sm:px-14 lg:px-20 flex flex-col justify-center min-h-105">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-10">

              <div className="w-11 h-10 rounded-xl flex items-center justify-center">
                <img 
                  src={logo}
                  className="size-full object-center"
                />
              </div>

              <div>
                <h2 className="text-[#FBF9F4] font-serif font-bold text-xl leading-none">
                  Closet & Core
                </h2>

                <p className="text-green-200 text-[10px] tracking-[0.2em] uppercase mt-1">
                  Web-Based E-Commerce Platform
                </p>
              </div>

            </div>

            <p className="text-green-200 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
              About the Project
            </p>

            <h1 className="text-[#FBF9F4] font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl">
              Bringing clothing retail
              <span className="text-green-200"> to the web.</span>
            </h1>

            <p className="mt-6 text-gray-200 text-sm sm:text-base leading-relaxed max-w-2xl">
              Closet & Core is a web-based e-commerce platform developed
              to provide a structured and convenient online shopping
              environment for clothing retailers and their customers.
            </p>

          </div>
        </div>
      </section>


      {/* PROJECT INTRODUCTION */}
      <section className="m-6 sm:m-10 lg:mx-20">

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>

            <p className="text-green-800 text-xs tracking-[0.25em] uppercase font-medium mb-3">
              Why Closet & Core?
            </p>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 leading-tight mb-5">
              A structured alternative to social-media based selling
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4">
              Many small and medium-sized businesses in Nepal use social
              media platforms as their primary channel for online selling.
              While these platforms provide an accessible way to reach
              customers, they do not provide the same structured shopping
              environment as a dedicated e-commerce system.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Closet & Core was proposed to address this gap by providing
              a dedicated platform where retailers can present their
              products while customers can browse, search, manage their
              shopping cart, and place orders through a single system.
            </p>

          </div>


          {/* Problem → Solution */}
          <div className="relative">

            <div className="bg-[#FBF9F4] border-2 border-gray-200 rounded-3xl p-7 sm:p-8">

              <div className="flex items-center gap-4 mb-7">

                <div className="w-12 h-12 rounded-xl bg-green-900 flex items-center justify-center">
                  <Store className="w-6 h-6 text-white" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-500">
                    Project Focus
                  </p>

                  <h3 className="font-serif text-xl font-bold text-gray-800">
                    Clothing Retail
                  </h3>
                </div>

              </div>


              <div className="space-y-5">

                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Traditional selling channels
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Product information and customer interactions can be
                      scattered across social-media platforms.
                    </p>
                  </div>
                </div>


                <div className="w-full border-t border-dashed border-gray-300" />


                <div className="flex gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      Structured e-commerce
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      A dedicated platform for product browsing, product management, cart
                      management and order management.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* WHAT THIS SYSTEM PROVIDES */}
      <section className="m-6 sm:m-10 lg:mx-20">

        <div className="mb-8">

          <p className="text-green-800 text-xs tracking-[0.25em] uppercase font-medium mb-2">
            Core Features
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-3">
            What this system provides
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            Key features designed to provide a simple and convenient online
            shopping experience for customers while helping retailers
            manage their products and orders.
          </p>

        </div>


        <div className="grid md:grid-cols-3 gap-6">

          {principles.map(({ icon: Icon, title, copy }, index) => (

            <div
              key={title}
              className="group border-2 border-gray-200 rounded-3xl p-7 bg-white hover:border-green-800 hover:-translate-y-1 transition-all duration-300"
            >

              <div className="w-12 h-12 rounded-xl bg-green-900 flex items-center justify-center mb-5">
                <Icon className="size-5.5 text-white" />
              </div>

              <h3 className="font-serif text-xl font-bold text-gray-800 mb-3">
                {title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {copy}
              </p>

            </div>

          ))}

        </div>
      </section>


      {/* SYSTEM USERS */}
      <section className="m-6 sm:m-10 lg:mx-20">

        <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-8 sm:p-10">

          <div className="max-w-2xl mb-8">

            <p className="text-green-800 text-xs tracking-[0.25em] uppercase font-medium mb-2">
              System Users
            </p>

            <h2 className="text-3xl font-serif font-bold text-gray-800 mb-3">
              Built around two primary users
            </h2>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              The platform provides different functionality according to
              the needs of customers and retailers.
            </p>

          </div>


          <div className="grid md:grid-cols-2 gap-6">

            {/* Customer */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-11 h-11 rounded-xl bg-green-900 flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-800">
                  Customer
                </h3>

              </div>


              <ul className="space-y-3 text-sm text-gray-600">

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Register and log into the system
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Browse product catalog and search products
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  View product details
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Manage shopping cart
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Place and view orders
                </li>

              </ul>

            </div>


            {/* Retailer */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">

              <div className="flex items-center gap-4 mb-5">

                <div className="w-11 h-11 rounded-xl bg-green-900 flex items-center justify-center">
                  <Store className="w-5 h-5 text-white" />
                </div>

                <h3 className="font-serif text-xl font-bold text-gray-800">
                  Retailer
                </h3>

              </div>


              <ul className="space-y-3 text-sm text-gray-600">

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Access the retailer dashboard
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  View customer orders
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Manage products
                </li>

                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-green-800 shrink-0 mt-0.5" />
                  Manage orders
                </li>

              </ul>

            </div>

          </div>

        </div>
      </section>


      {/* TEAM */}
      <section className="m-6 sm:m-10 lg:mx-20">

        <div className="text-center mb-8">

          <p className="text-green-800 text-xs tracking-[0.25em] uppercase font-medium mb-2">
            Development Team
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-3">
            A three-member project
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            Closet & Core is designed and developed as a collaborative
            academic project by three members.
          </p>

        </div>


        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">

          {team.map((member) => (

            <div
              key={member.number}
              className="border-2 border-gray-200 rounded-2xl p-6 text-center hover:border-green-800 transition-colors duration-300"
            >

              <span className="text-4xl font-serif font-bold text-green-900">
                {member.number}
              </span>

              <div className="w-10 border-t border-gray-300 mx-auto my-4" />

              <h3 className="font-serif font-bold text-lg text-gray-800">
                {member.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Project Member
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* PROJECT FACTS */}
      <section className="m-6 sm:m-10 lg:mx-20">

        <div className="border-y-2 border-gray-200 py-8">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                Project Type
              </p>

              <p className="font-serif text-lg font-bold text-green-900">
                Academic
              </p>
            </div>


            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                Team
              </p>

              <p className="font-serif text-lg font-bold text-green-900">
                3 Members
              </p>
            </div>


            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                Platform
              </p>

              <p className="font-serif text-lg font-bold text-green-900">
                Web Application
              </p>
            </div>


            <div>
              <p className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-2">
                Domain
              </p>

              <p className="font-serif text-lg font-bold text-green-900">
                E-Commerce
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="m-6 sm:m-10 lg:mx-20 mb-16">

        <div className="rounded-3xl bg-[#FBF9F4] border-2 border-green-900 p-8 sm:p-12 text-center">

          <p className="text-green-800 text-xs tracking-[0.25em] uppercase font-medium mb-3">
            Explore Closet & Core
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-800 mb-4">
            Experience the system
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-7">
            Explore the platform and experience the features
            developed as part of the Closet & Core project.
          </p>

        </div>

      </section>

    </div>
  );
}

export default About;