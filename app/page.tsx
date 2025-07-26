"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RainbowButton } from "@/components/ui/rainbow-button"
import GlassCard from "@/components/ui/glass-card"
import AvatarGroup from "@/components/ui/avatar-group"
import { TextRotate } from "@/components/ui/text-rotate"
import { TestimonialsColumn } from "@/components/ui/testimonials-columns"
import { HorizonHeroSection } from "@/components/ui/horizon-hero-section"
import {
  Phone,
  Mail,
  MapPin,
  Star,
  Shield,
  Award,
  Users,
  Clock,
  CheckCircle,
  Building,
  Home,
  Menu,
  X,
  Quote,
  Target,
  Briefcase,
} from "lucide-react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function WindowCleaningLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  // Sample data for avatar group
  const teamMembers = [
    {
      id: 1,
      name: "Mike Johnson",
      designation: "Lead Technician",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Sarah Chen",
      designation: "Safety Coordinator",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "David Rodriguez",
      designation: "Operations Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 4,
      name: "Lisa Thompson",
      designation: "Quality Inspector",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    {
      id: 5,
      name: "James Wilson",
      designation: "Senior Technician",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    },
  ]

  // Testimonials data for columns
  const testimonials = [
    {
      text: "ClearView Pro transformed our 40-story building's appearance. Their rope access team is incredibly professional and safety-focused.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b332c1c2?w=150&h=150&fit=crop&crop=face",
      name: "Sarah Johnson",
      role: "Property Manager",
    },
    {
      text: "Outstanding residential service! Every window was spotless, and they even cleaned the screens. Highly recommend!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      name: "Michael Chen",
      role: "Homeowner",
    },
    {
      text: "Their IRATA certification and comprehensive insurance gave us complete confidence. Best window cleaning service in Ontario.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      name: "Lisa Rodriguez",
      role: "Facility Director",
    },
    {
      text: "Emergency service was incredible. They responded within hours and had our office building sparkling clean.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      name: "Robert Kim",
      role: "Building Manager",
    },
    {
      text: "Professional, punctual, and perfect results every time. Our scheduled maintenance program runs flawlessly.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      name: "Amanda Foster",
      role: "Operations Director",
    },
    {
      text: "The team's attention to detail is remarkable. They treat our historic building with the care it deserves.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      name: "Thomas Wright",
      role: "Heritage Site Manager",
    },
  ]

  const firstColumn = testimonials.slice(0, 2)
  const secondColumn = testimonials.slice(2, 4)
  const thirdColumn = testimonials.slice(4, 6)

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Single Sticky Navigation with Company Logo and CTA */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Company Logo and Name */}
            <motion.div className="flex items-center space-x-3" whileHover={{ scale: 1.05 }}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                <Building className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">ClearView Pro</span>
                <div className="text-xs text-gray-600 font-medium">Premium Window Cleaning</div>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Services", "About", "Reviews", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-blue-600 transition-colors relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </button>
              ))}
              <RainbowButton onClick={() => scrollToSection("quote")} className="px-6 h-10">
                <Phone className="w-4 h-4 mr-2" />
                Get Quote
              </RainbowButton>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 backdrop-blur-md border-t"
              >
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {["Services", "About", "Reviews", "Contact"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className="block px-3 py-2 text-gray-700 w-full text-left hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                  <RainbowButton onClick={() => scrollToSection("quote")} className="w-full mt-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Quote
                  </RainbowButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Horizon Hero Section */}
      <HorizonHeroSection />

      {/* Quote Form Section */}
      <section id="quote" className="py-24 bg-gradient-to-br from-blue-50 to-indigo-100 relative">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-12">
              <Badge className="bg-blue-100 text-blue-800 text-lg px-6 py-2 mb-6">
                <Quote className="w-5 h-5 mr-2" />
                Free Quote
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Your Professional Assessment</h2>
              <p className="text-xl text-gray-600">Expert evaluation and quote within 24 hours guaranteed</p>
            </div>

            <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/30">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input placeholder="First Name" className="h-14 bg-white/70 text-lg" />
                  <Input placeholder="Last Name" className="h-14 bg-white/70 text-lg" />
                </div>
                <Input placeholder="Email Address" type="email" className="h-14 bg-white/70 text-lg" />
                <Input placeholder="Phone Number" type="tel" className="h-14 bg-white/70 text-lg" />
                <div className="grid md:grid-cols-2 gap-6">
                  <select className="h-14 px-4 border border-gray-300 rounded-md bg-white/70 text-lg">
                    <option>Service Type</option>
                    <option>Residential</option>
                    <option>Commercial</option>
                    <option>High-Rise</option>
                    <option>Industrial</option>
                  </select>
                  <Input placeholder="Building Height (floors)" className="h-14 bg-white/70 text-lg" />
                </div>
                <Textarea
                  placeholder="Project Details & Special Requirements"
                  className="min-h-[120px] bg-white/70 text-lg resize-none"
                />
                <RainbowButton className="w-full h-14 text-lg font-semibold">
                  <Target className="w-6 h-6 mr-2" />
                  Get Free Quote Now
                </RainbowButton>
              </form>

              <div className="text-center mt-6 p-4 bg-green-50/80 rounded-xl border border-green-200/50">
                <p className="text-sm text-green-700 font-semibold">
                  ✅ No obligation • ⚡ 24-hour response • 🛡️ Fully insured
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ultra-Premium Certifications Section with Glass Cards */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-blue-100 text-blue-800 text-lg px-6 py-2 mb-6">
              <Shield className="w-5 h-5 mr-2" />
              Certified Excellence
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Certified &{" "}
              <TextRotate
                texts={["Insured", "Professional", "Trusted", "Reliable"]}
                mainClassName="text-blue-600 inline-block"
                rotationInterval={2000}
              />{" "}
              Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your safety and satisfaction are our top priorities. We maintain the highest industry standards with
              comprehensive certifications and insurance coverage.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {[
              {
                title: "IRATA & SPRAT",
                desc: "International rope access certified technicians with advanced training",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                title: "WAH Certified",
                desc: "Working at heights qualification with safety protocols",
                icon: <Award className="w-8 h-8" />,
              },
              {
                title: "Lift Ticket Licensed",
                desc: "Certified equipment operators for aerial work platforms",
                icon: <CheckCircle className="w-8 h-8" />,
              },
              {
                title: "WSIB Coverage",
                desc: "Full workplace safety insurance board coverage",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                title: "$5M+ Liability",
                desc: "Comprehensive general liability insurance coverage",
                icon: <Shield className="w-8 h-8" />,
              },
              {
                title: "WHMIS Certified",
                desc: "Workplace hazardous materials safety trained technicians",
                icon: <Users className="w-8 h-8" />,
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10 }}
              >
                <GlassCard
                  title={cert.title}
                  description={cert.desc}
                  icon={cert.icon}
                  className="hover:scale-105 transition-all duration-500"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-gray-100 text-gray-800 text-lg px-6 py-2 mb-6">
              <Briefcase className="w-5 h-5 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Premium{" "}
              <TextRotate
                texts={["Window", "Glass", "Facade", "Building"]}
                mainClassName="text-blue-600 inline-block"
                rotationInterval={2000}
              />{" "}
              Cleaning Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional window cleaning solutions for every need, from residential homes to high-rise commercial
              buildings.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Residential Services */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-700 group border-0 bg-gradient-to-br from-blue-50 to-white h-full">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=320&fit=crop"
                    alt="Residential Window Cleaning"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-blue-600 text-white text-lg px-4 py-2">
                      <Home className="w-5 h-5 mr-2" />
                      Residential
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Home Window Cleaning</h3>
                    <p className="text-blue-100">Crystal clear results for your home</p>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Professional home window cleaning services that leave your windows crystal clear and streak-free. We
                    use eco-friendly solutions and include screen cleaning.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Interior & exterior cleaning",
                      "Screen cleaning included",
                      "Eco-friendly solutions",
                      "Flexible scheduling",
                      "Satisfaction guarantee",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 group-hover/item:scale-110 transition-transform" />
                        <span className="text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <RainbowButton className="w-full h-14 text-lg">
                    <Home className="w-5 h-5 mr-2" />
                    Get Residential Quote
                  </RainbowButton>
                </CardContent>
              </Card>
            </motion.div>

            {/* Commercial Services */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-700 group border-0 bg-gradient-to-br from-gray-50 to-white h-full">
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=320&fit=crop"
                    alt="Commercial Window Cleaning"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-gray-900 text-white text-lg px-4 py-2">
                      <Building className="w-5 h-5 mr-2" />
                      Commercial
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">Commercial & High-Rise</h3>
                    <p className="text-gray-100">Professional building maintenance</p>
                  </div>
                </div>
                <CardContent className="p-8">
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Specialized high-rise and commercial window cleaning with certified rope access technicians. We
                    handle buildings of any height with complete safety protocols.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "High-rise rope access",
                      "Commercial building maintenance",
                      "Emergency cleaning services",
                      "Scheduled maintenance programs",
                      "IRATA certified technicians",
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center space-x-3 group/item"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 group-hover/item:scale-110 transition-transform" />
                        <span className="text-lg">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 h-14 text-lg font-semibold">
                    <Building className="w-5 h-5 mr-2" />
                    Get Commercial Quote
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ultra-Premium Testimonials with Columns */}
      <section id="testimonials" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-yellow-100 text-yellow-800 text-lg px-6 py-2 mb-6">
              <Star className="w-5 h-5 mr-2" />
              Client Reviews
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              What Our{" "}
              <TextRotate
                texts={["Clients", "Customers", "Partners", "Community"]}
                mainClassName="text-blue-600 inline-block"
                rotationInterval={2500}
              />{" "}
              Say About Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real reviews from satisfied customers across Ontario. See why we're the trusted choice for window cleaning
              services.
            </p>
          </motion.div>

          <div className="flex justify-center gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[800px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>
      </section>

      {/* Enhanced Who We Are */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="bg-blue-100 text-blue-800 text-lg px-6 py-2 mb-6">
                <Users className="w-5 h-5 mr-2" />
                About Us
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-8">
                Who We{" "}
                <TextRotate
                  texts={["Are", "Serve", "Trust", "Protect"]}
                  mainClassName="text-blue-600 inline-block"
                  rotationInterval={2000}
                />
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                ClearView Pro is Ontario's premier window cleaning company, specializing in high-rise and residential
                services. With over 25 years of combined experience, we've built our reputation on safety, reliability,
                and exceptional results.
              </p>

              <div className="space-y-8">
                {[
                  {
                    icon: <Shield className="w-8 h-8 text-blue-600" />,
                    title: "Safety Excellence",
                    desc: "All technicians are IRATA and SPRAT certified with ongoing safety training and comprehensive insurance coverage.",
                  },
                  {
                    icon: <Award className="w-8 h-8 text-blue-600" />,
                    title: "Quality Guarantee",
                    desc: "100% satisfaction guarantee on all our window cleaning services with professional results every time.",
                  },
                  {
                    icon: <Users className="w-8 h-8 text-blue-600" />,
                    title: "Trusted Team",
                    desc: "Professional, uniformed technicians who treat your property with respect and deliver exceptional service.",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start space-x-6 group p-6 rounded-2xl hover:bg-blue-50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=700&fit=crop"
                  alt="ClearView Pro Team"
                  width={600}
                  height={700}
                  className="rounded-3xl shadow-2xl"
                />
                <motion.div
                  className="absolute -bottom-8 -left-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl font-bold">25+</div>
                  <div className="text-lg">Years Combined Experience</div>
                  <div className="text-sm text-blue-100 mt-1">Trusted by 500+ clients</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Areas We Serve */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-green-100 text-green-800 text-lg px-6 py-2 mb-6">
              <MapPin className="w-5 h-5 mr-2" />
              Service Areas
            </Badge>
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Areas We{" "}
              <TextRotate
                texts={["Serve", "Cover", "Support", "Clean"]}
                mainClassName="text-blue-600 inline-block"
                rotationInterval={2000}
              />
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional window cleaning services across Ontario. We're proud to serve communities throughout the
              province.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Toronto",
              "Mississauga",
              "Brampton",
              "Hamilton",
              "London",
              "Markham",
              "Vaughan",
              "Kitchener",
              "Windsor",
              "Richmond Hill",
              "Oakville",
              "Burlington",
            ].map((city, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0 group">
                  <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{city}</h3>
                  <p className="text-gray-600">Professional window cleaning services</p>
                  <div className="mt-4 text-sm text-blue-600 font-semibold">Available 24/7</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xl text-gray-600 mb-6">Don't see your area listed?</p>
            <Button
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent text-lg px-8 h-12"
            >
              <MapPin className="w-5 h-5 mr-2" />
              Contact Us for Service Availability
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Ultra-Premium Final CTA */}
      <section
        id="contact"
        className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready for{" "}
              <TextRotate
                texts={["Crystal Clear", "Spotless", "Perfect", "Pristine", "Brilliant"]}
                mainClassName="text-yellow-300 inline-block"
                rotationInterval={2000}
              />{" "}
              Windows?
            </h2>
            <p className="text-2xl text-blue-100 mb-16 max-w-4xl mx-auto leading-relaxed">
              Get your free quote today and experience the ClearView Pro difference. Professional, certified, and fully
              insured window cleaning services with a 100% satisfaction guarantee.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <RainbowButton className="text-xl px-12 h-16">
              <Phone className="w-6 h-6 mr-3" />
              Call Now: (416) 555-0123
            </RainbowButton>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 text-xl px-12 h-16 bg-transparent"
            >
              <Mail className="w-6 h-6 mr-3" />
              Email Quote Request
            </Button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: <Phone className="w-12 h-12 mx-auto mb-4 text-blue-200" />,
                title: "Call Us Anytime",
                info: "(416) 555-0123",
                desc: "24/7 emergency service available",
              },
              {
                icon: <Mail className="w-12 h-12 mx-auto mb-4 text-blue-200" />,
                title: "Email Us",
                info: "info@clearviewpro.ca",
                desc: "Professional quotes within 24 hours",
              },
              {
                icon: <Clock className="w-12 h-12 mx-auto mb-4 text-blue-200" />,
                title: "Response Time",
                info: "Within 24 hours",
                desc: "Guaranteed professional response",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                {item.icon}
                <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                <p className="text-blue-100 text-lg font-semibold mb-2">{item.info}</p>
                <p className="text-blue-200 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra-Premium Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Building className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-bold">ClearView Pro</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Ontario's premier window cleaning company. Professional, certified, and trusted by 500+ satisfied
                clients.
              </p>
              <AvatarGroup items={teamMembers.slice(0, 4)} maxVisible={4} size="sm" />
              <div className="mt-4 text-sm text-gray-400">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </motion.div>

            {[
              {
                title: "Services",
                items: [
                  "Residential Window Cleaning",
                  "Commercial Window Cleaning",
                  "High-Rise Window Cleaning",
                  "Emergency Services",
                  "Maintenance Programs",
                ],
              },
              {
                title: "Company",
                items: ["About Us", "Certifications", "Safety Standards", "Service Areas", "Careers"],
              },
              {
                title: "Contact",
                items: ["(416) 555-0123", "info@clearviewpro.ca", "Ontario, Canada", "24/7 Support", "Free Quotes"],
              },
            ].map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.1 }}
              >
                <h4 className="font-bold text-xl mb-6">{section.title}</h4>
                <ul className="space-y-3 text-gray-400">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="hover:text-white transition-colors cursor-pointer hover:translate-x-2 duration-300"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-center md:text-left">
              &copy; {new Date().getFullYear()} ClearView Pro. All rights reserved. | Made with ❤️ for crystal clear
              windows
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400">Follow us:</span>
              <div className="flex space-x-4">
                {[
                  { icon: Phone, label: "Phone" },
                  { icon: Mail, label: "Email" },
                  { icon: MapPin, label: "Location" },
                ].map((social, index) => (
                  <motion.button
                    key={index}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
