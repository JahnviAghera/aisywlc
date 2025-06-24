"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, UserCheck, CreditCard, MapPin, Building, Clock, AlertCircle, DollarSign } from "lucide-react"

const statsData = [
  {
    title: "Total Registrations",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "from-blue-500 to-blue-600",
  },
  {
    title: "Confirmed Attendees",
    value: "1,089",
    change: "+8.2%",
    trend: "up",
    icon: UserCheck,
    color: "from-green-500 to-green-600",
  },
  {
    title: "Total Revenue",
    value: "₹52,34,500",
    change: "+15.3%",
    trend: "up",
    icon: DollarSign,
    color: "from-orange-500 to-orange-600",
  },
  {
    title: "Pending Payments",
    value: "₹3,45,000",
    change: "-5.1%",
    trend: "down",
    icon: CreditCard,
    color: "from-red-500 to-red-600",
  },
]

const categoryData = [
  { name: "Students", count: 456, percentage: 37, color: "bg-blue-500" },
  { name: "Young Professionals", count: 312, percentage: 25, color: "bg-green-500" },
  { name: "Professionals", count: 234, percentage: 19, color: "bg-orange-500" },
  { name: "Life Members", count: 245, percentage: 19, color: "bg-purple-500" },
]

const accommodationData = [
  { name: "Hotel", count: 234, percentage: 21 },
  { name: "University Hostel", count: 567, percentage: 52 },
  { name: "Guest House", count: 189, percentage: 17 },
  { name: "Own Arrangement", count: 107, percentage: 10 },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function AdminStats() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {statsData.map((stat, index) => (
          <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02 }}>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={stat.trend === "up" ? "default" : "destructive"}
                    className={stat.trend === "up" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registration Categories */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-orange-600" />
                Registration Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {categoryData.map((category, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{category.count}</span>
                      <span className="text-sm text-gray-500 ml-2">({category.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Accommodation Breakdown */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5 text-orange-600" />
                Accommodation Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {accommodationData.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-lg">{item.count}</span>
                    <span className="text-sm text-gray-500 ml-2">({item.percentage}%)</span>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.4 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  action: "New registration from Dr. Priya Sharma",
                  time: "2 minutes ago",
                  type: "registration",
                },
                {
                  action: "Payment confirmed for Rahul Patel",
                  time: "5 minutes ago",
                  type: "payment",
                },
                {
                  action: "Accommodation request updated",
                  time: "12 minutes ago",
                  type: "update",
                },
                {
                  action: "New speaker confirmation received",
                  time: "1 hour ago",
                  type: "speaker",
                },
                {
                  action: "Bulk registration from IIT Gandhinagar",
                  time: "2 hours ago",
                  type: "bulk",
                },
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.5 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  message: "Server capacity at 85% - consider scaling",
                  severity: "warning",
                  time: "10 minutes ago",
                },
                {
                  message: "Payment gateway maintenance scheduled",
                  severity: "info",
                  time: "1 hour ago",
                },
                {
                  message: "Database backup completed successfully",
                  severity: "success",
                  time: "3 hours ago",
                },
                {
                  message: "Email delivery rate below threshold",
                  severity: "warning",
                  time: "6 hours ago",
                },
              ].map((alert, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border-l-4 border-l-orange-500 bg-orange-50/50"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <Badge
                    variant={
                      alert.severity === "success"
                        ? "default"
                        : alert.severity === "warning"
                          ? "destructive"
                          : "secondary"
                    }
                    className={
                      alert.severity === "success"
                        ? "bg-green-100 text-green-800"
                        : alert.severity === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                    }
                  >
                    {alert.severity}
                  </Badge>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
