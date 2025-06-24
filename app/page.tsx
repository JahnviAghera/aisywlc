"use client"

import { Calendar, MapPin, Users, Building, Plane, Hotel, Camera, Award, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const scaleOnHover = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  whileTap: { scale: 0.95 },
}

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Animated Header */}
      <motion.header
        className="bg-white/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.02 }}>
              <motion.div
                className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-xl">IEEE</span>
              </motion.div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  AISYWLC 2025
                </h1>
                <p className="text-sm text-gray-600">IEEE Gujarat Section</p>
              </div>
            </motion.div>
            <motion.div {...scaleOnHover}>
              <Button
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
                onClick={() => (window.location.href = "/register")}
              >
                Register Now
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-20"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-6 bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 hover:from-orange-200 hover:to-red-200 border-0 px-4 py-2 text-sm font-medium">
              IEEE Gujarat Section
            </Badge>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            All India Student Young Professional
            <br />
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              Women in Engineering
            </span>
            <br />
            <motion.span
              className="inline-block"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              style={{
                background: "linear-gradient(90deg, #ea580c, #dc2626, #be185d, #ea580c)",
                backgroundSize: "200% 200%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Life Members Congress 2025
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <span className="font-semibold text-orange-600">Innovating Education for a Sustainable Future:</span>
            <br />
            Address the transformative impact of technology on teaching and learning
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <motion.div
              className="flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="font-semibold text-lg">31st October - 2nd November, 2025</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-3 text-gray-700 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
            >
              <MapPin className="w-6 h-6 text-orange-600" />
              <span className="font-semibold text-lg">Adani University & Nirma University, Ahmedabad</span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div {...scaleOnHover}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-xl px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "/register")}
              >
                Register for Conference
              </Button>
            </motion.div>
            <motion.div {...scaleOnHover}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/90 backdrop-blur-sm text-orange-600 border-2 border-orange-600 hover:bg-orange-50 shadow-xl px-8 py-4 text-lg font-semibold"
              >
                Download Brochure
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Conference Highlights with Real Images */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-orange-50/30" />
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Conference Highlights</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of education and technology at AISYWLC 2025
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Keynote Sessions",
                description: "Inspiring talks from industry leaders and academic experts",
                image: "/images/keynote-session.jpg",
                icon: Award,
              },
              {
                title: "Technical Workshops",
                description: "Hands-on workshops on cutting-edge technologies",
                image: "/images/technical-workshop.jpg",
                icon: Building,
              },
              {
                title: "Networking Events",
                description: "Connect with professionals and peers from across India",
                image: "/images/networking-event.jpg",
                icon: Users,
              },
              {
                title: "Student Competitions",
                description: "Platform for students to showcase their innovations",
                image: "/images/student-competition.jpg",
                icon: Award,
              },
              {
                title: "Panel Discussions",
                description: "Engaging discussions on emerging trends and challenges",
                image: "/images/panel-discussion.jpg",
                icon: Users,
              },
              {
                title: "Cultural Programs",
                description: "Celebrate the rich heritage of Gujarat and India",
                image: "/images/cultural-program.jpg",
                icon: Globe,
              },
            ].map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <highlight.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{highlight.title}</h3>
                    <p className="text-gray-600">{highlight.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About IEEE Gujarat Section with Real Image */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50/50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">About IEEE Gujarat Section</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Established on August 15, 1990, promoting technological innovation and professional development across
              Gujarat
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/ieee-gujarat-section.jpg"
                  alt="IEEE Gujarat Section Conference"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/80 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">35+ Years of Excellence</h3>
                  <p className="text-orange-100">Serving the engineering community since 1990</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-700 mb-8 leading-relaxed text-lg">
                The IEEE Gujarat Section, established on August 15, 1990, under IEEE Region 10 (Asia-Pacific),
                originated from the Vadodara Sub-section (1988), formerly under the Bombay Section. Over the years, the
                section has organized numerous impactful conferences and workshops, including the 1997 twin conference
                on Internet Security and Electrical Engineering in the petroleum sector, which marked the inauguration
                of the IEEE student branch at Nirma Institute of Technology.
              </p>

              <motion.div
                className="grid grid-cols-3 gap-6 mb-8"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {[
                  { number: "30+", label: "Student Branches", icon: Users },
                  { number: "13", label: "Technical Chapters", icon: Building },
                  { number: "35+", label: "Years of Excellence", icon: Award },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl shadow-lg"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <stat.icon className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-orange-50/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Zap className="w-6 h-6 text-orange-600" />
                    Key Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      "SAMPARK - Annual student networking event",
                      "ERTE - Emerging Research Trends in Engineering (AI and Data Science)",
                      "Prof. S. C. Sahasrabudhe Memorial Lecture",
                      "IEEE Day and Annual General Meeting",
                      "IEEE ITSS Gujarat Chapter (launched 2024)",
                      "Technical symposiums and workshops",
                    ].map((event, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                        {event}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-red-50/50">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <Award className="w-6 h-6 text-orange-600" />
                    Awards & Recognition
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-gray-700">
                    {[
                      "Outstanding Small Section Award (2004)",
                      "Outstanding Membership Recruitment and Retention Performance Award (2021)",
                    ].map((award, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                        {award}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Organizing Team with Team Member Photos */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Organizing Team</h2>
            <p className="text-xl text-gray-600">
              Distinguished leaders and professionals organizing this prestigious event
            </p>
          </motion.div>

          {/* Key Team Members with Photos */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Prof. Chirag Paunwala",
                role: "Chair, IEEE Gujarat Section",
                image: "/images/team/prof-chirag-paunwala.jpg",
                gradient: "from-orange-500 to-red-500",
              },
              {
                name: "Prof. Prema Gaur",
                role: "Chair, India Council 2025",
                image: "/images/team/prof-prema-gaur.jpg",
                gradient: "from-red-500 to-pink-500",
              },
              {
                name: "Prof. Sanjay Chaudhary",
                role: "Vice Chair, IEEE Gujarat Section",
                image: "/images/team/prof-sanjay-chaudhary.jpg",
                gradient: "from-pink-500 to-orange-500",
              },
              {
                name: "Nandini Lashkari",
                role: "Chair, Student Section Representative",
                image: "/images/team/nandini-lashkari.jpg",
                gradient: "from-purple-500 to-blue-500",
              },
            ].map((member, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-bold text-lg">{member.name}</h3>
                      <p className="text-sm text-gray-200">{member.role}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: "Patrons",
                icon: Users,
                members: [
                  "Shriencephal Mathur (2024 VP MGA)",
                  "Prof. Prema Gaur (Chair, IC 2025)",
                  "Prof. Preeti Bajaj (Vice Chair, IC 2025)",
                  "Dr. Anil Roy (President Elect, Sensor Council)",
                  "Dr. R B Jadeja (Vice Chair, Members Activities, IEEE R10)",
                  "Prof. Kiran Amin (Immediate Past Chair, IEEE GS)",
                  "Prof. Manik Lal Das (Past Chair, IEEE GS)",
                  "Prof. Sameer S M (Director Elect, IEEE R10)",
                ],
                gradient: "from-orange-500 to-red-500",
              },
              {
                title: "Gujarat Section",
                icon: Building,
                members: [
                  "Prof. Chirag Paunwala (Chair, IEEE GS)",
                  "Prof. Sanjay Chuadhary (Vice Chair, IEEE GS)",
                  "Prof. Foram Chandarana (Secretary, IEEE GS)",
                  "Prof. Anjali Diwan (Treasurer, IEEE GS)",
                  "Prof. Pooja Shah (Chair, Student Activity GS)",
                  "Prof. Ajay Vyas (Advisor, Adani University)",
                  "Prof. Manisha Shah (Advisor, Nirma University)",
                  "Prof. Sameer Kulkarni (Chair, Industry Liaison)",
                  "Prof. Sachin Gajjar (Chair, YP GS)",
                  "Mr. Ankit Dave (Chair, MDA GS)",
                  "Prof. Archana Nigam (ITSS Chapter)",
                  "Prof. Mita Paunwala (Chair, IEEE SPS GS)",
                  "Prof. Yash Agarwal (Chair, Education Activity)",
                  "Prof. Amit Ved (Chair, Technical Activity)",
                ],
                gradient: "from-red-500 to-pink-500",
              },
              {
                title: "Student Representatives",
                icon: Users,
                members: [
                  "Nandini Lashkari (Chair, SSR GS)",
                  "Tirth Patel",
                  "Khushboo Jha",
                  "Dhruvi Jain",
                  "Jainee Patel",
                  "Chirag Chauhan",
                  "Tanay Shah",
                  "Anika Mehta",
                  "Vidhi Ruparelia (Chair, Nirma University SB)",
                  "Nidhi Dubey (Chair, Adani University SB)",
                ],
                gradient: "from-pink-500 to-orange-500",
              },
              {
                title: "India Council Committee",
                icon: Building,
                members: [
                  "Prof. Nandan S (Secretary, IC)",
                  "Prof. Rajashree Jain (Treasurer, IC)",
                  "Dr. Sanjay Kar Chowdhury (Vice Chair, Awards IC)",
                  "Prof. Shone Jose (Vice Chair, Entrepreneurship Activities IC)",
                  "Prof. Sudeendra Koushik (Chair, Ethics Committee IC)",
                  "Prof. Abdul Q Ansari (Vice Chair, Humanitarian Technology Activities IC)",
                  "Prof. Chengappa M R (Vice Chair, Industry Relations Activities IC)",
                  "Dr. S S Jamuar (Coordinator, Life Member Affinity Group IC)",
                  "Prof. Ashwini Appaji (Vice Chair, Women In Engineering IC)",
                  "Prof. Anuradha Tomar (Vice Chair, Student Activities & Student Coordination Team IC)",
                ],
                gradient: "from-purple-500 to-blue-500",
              },
            ].map((team, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }} className="group">
                <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-xl">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${team.gradient}`}>
                        <team.icon className="w-6 h-6 text-white" />
                      </div>
                      {team.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 max-h-96 overflow-y-auto">
                      {team.members.map((member, memberIndex) => (
                        <motion.li
                          key={memberIndex}
                          className="text-sm text-gray-700 flex items-center gap-3 group-hover:text-gray-900 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: memberIndex * 0.05 }}
                          viewport={{ once: true }}
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${team.gradient}`} />
                          {member}
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced Venue & Travel with Real Images */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-orange-50/50 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Venue & Travel Information</h2>
            <p className="text-xl text-gray-600">Everything you need to know about reaching and staying in Ahmedabad</p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12 mb-16"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-orange-50/50 overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/adani-university.jpg"
                    alt="Adani University Campus"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Building className="w-7 h-7 text-orange-600" />
                    Venue Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold text-xl text-gray-900 mb-2">Adani University, Ahmedabad</h4>
                    <p className="text-gray-600 mb-4">Co-organized with Nirma University</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    Both universities are distinguished institutions committed to excellence in education and societal
                    impact, combining academic rigor with visionary leadership for meaningful collaboration.
                  </p>
                  <div className="flex items-center gap-3 text-orange-600 font-semibold">
                    <Globe className="w-5 h-5" />
                    <span>World-class facilities and infrastructure</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full shadow-xl border-0 bg-gradient-to-br from-white to-red-50/50 overflow-hidden">
                <div className="relative h-48">
                  <Image src="/images/ahmedabad-airport.jpg" alt="Ahmedabad Airport" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Plane className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Plane className="w-7 h-7 text-red-600" />
                    Travel Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Nearest Airport</h4>
                    <p className="text-gray-600">Sardar Vallabhbhai Patel International Airport (10 km)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Railway Stations</h4>
                    <ul className="space-y-2 text-gray-600">
                      {[
                        "Gandhinagar Railway Station (14 km)",
                        "Chandlodiya Railway Station (7.3 km)",
                        "Sabarmati Railway Station (11 km)",
                      ].map((station, index) => (
                        <motion.li
                          key={index}
                          className="flex items-center gap-3"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-red-600 to-pink-600 rounded-full" />
                          {station}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2">Bus Terminal</h4>
                    <p className="text-gray-600">Ranip Bus Terminal (6 km)</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Accommodation with Real Images */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Accommodation</h2>
            <p className="text-xl text-gray-600">Comfortable stay options for all participants</p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/hotel-accommodation.jpg"
                    alt="Hotel Accommodation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Hotel className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Hotel className="w-7 h-7 text-orange-600" />
                    Hotels for Speakers & IC Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {["Adani University Guest House", "The Hillock Hotel", "Hillock Hotels"].map((hotel, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-orange-50/50 hover:bg-orange-100/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                        <span className="font-medium">{hotel}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp} whileHover={{ scale: 1.02 }}>
              <Card className="h-full shadow-xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src="/images/hostel-accommodation.jpg"
                    alt="Budget Accommodation"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Building className="w-7 h-7 text-red-600" />
                    Budget Options for Delegates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {[
                      "Adani University Hostel",
                      "Tri Mandir, Ahmedabad",
                      "City Hostels/PG (For Student Participants)",
                    ].map((option, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3 text-gray-700 p-3 rounded-lg bg-red-50/50 hover:bg-red-100/50 transition-colors"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-3 h-3 bg-gradient-to-r from-red-600 to-pink-600 rounded-full" />
                        <span className="font-medium">{option}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Nearby Attractions with Real Images */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-pink-50/30 relative overflow-hidden">
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Explore Ahmedabad</h2>
            <p className="text-xl text-gray-600">Discover the rich culture and heritage of Gujarat's largest city</p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-5 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { name: "Sabarmati Ashram", image: "/images/sabarmati-ashram.jpg" },
              { name: "Sidi Saiyyed Mosque", image: "/images/sidi-saiyyed-mosque.jpg" },
              { name: "Sabarmati Riverfront", image: "/images/sabarmati-riverfront.jpg" },
              { name: "Auto World Vintage Car Museum", image: "/images/auto-world-museum.jpg" },
              { name: "Science City", image: "/images/science-city.jpg" },
              { name: "Akshardham Temple", image: "/images/akshardham-temple.jpg" },
              { name: "Adalaj Stepwell (19 km)", image: "/images/adalaj-stepwell.jpg" },
              { name: "Thol Bird Sanctuary (30 km)", image: "/images/thol-bird-sanctuary.jpg" },
              { name: "Jami Masjid", image: "/images/jami-masjid.jpg" },
              { name: "Statue of Unity", image: "/images/statue-of-unity.jpg" },
            ].map((attraction, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <Card className="text-center h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white group-hover:to-orange-50/50 overflow-hidden">
                  <div className="relative h-32">
                    <Image
                      src={attraction.image || "/placeholder.svg"}
                      alt={attraction.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <motion.div
                      className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Camera className="w-4 h-4 text-white" />
                    </motion.div>
                    <p className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors text-sm">
                      {attraction.name}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        />
        <div className="container mx-auto text-center relative z-10">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Join AISYWLC 2025?
          </motion.h2>
          <motion.p
            className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Be part of this prestigious congress and contribute to innovating education for a sustainable future
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div {...scaleOnHover}>
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-2xl px-8 py-4 text-lg font-semibold"
                onClick={() => (window.location.href = "/register")}
              >
                Register Now
              </Button>
            </motion.div>
            <motion.div {...scaleOnHover}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-2xl px-8 py-4 text-lg font-semibold"
              >
                Contact Organizers
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
        <div className="container mx-auto relative z-10">
          <motion.div
            className="grid md:grid-cols-3 gap-12 mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center space-x-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                >
                  <span className="text-white font-bold text-lg">IEEE</span>
                </motion.div>
                <div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                    AISYWLC 2025
                  </h3>
                  <p className="text-gray-400">IEEE Gujarat Section</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                All India Student Young Professional Women in Engineering Life Members Congress 2025 - Innovating
                Education for a Sustainable Future
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold text-xl mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                {["Registration", "Call for Papers", "Accommodation", "Travel Information"].map((link, index) => (
                  <motion.li key={index} whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-2"
                    >
                      <div className="w-1 h-1 bg-orange-400 rounded-full" />
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <h4 className="font-bold text-xl mb-6 text-white">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-orange-400" />
                  IEEE Gujarat Section
                </p>
                <p className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-orange-400" />
                  Ahmedabad, Gujarat, India
                </p>
                <p className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-orange-400" />
                  info@ieeegs.org
                </p>
              </div>
            </motion.div>
          </motion.div>

          <Separator className="my-8 bg-gray-800" />

          <motion.div
            className="text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p>&copy; 2025 IEEE Gujarat Section. All rights reserved. | Designed with ❤️ for innovation</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
