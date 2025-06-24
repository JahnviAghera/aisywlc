"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, MapPin, Globe, Smartphone } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Registration Trends */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              Registration Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Daily Registrations", value: "23", trend: "+15%", color: "text-green-600" },
                { label: "Weekly Growth", value: "12.5%", trend: "+3.2%", color: "text-green-600" },
                { label: "Conversion Rate", value: "68%", trend: "-2.1%", color: "text-red-600" },
                { label: "Completion Rate", value: "87%", trend: "+5.4%", color: "text-green-600" },
              ].map((metric, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                  <Badge className={`${metric.color} bg-transparent border-0 p-0`}>
                    {metric.trend.startsWith("+") ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.trend}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Geographic Distribution */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-600" />
                Geographic Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { state: "Gujarat", count: 456, percentage: 37 },
                { state: "Maharashtra", count: 234, percentage: 19 },
                { state: "Rajasthan", count: 189, percentage: 15 },
                { state: "Delhi", count: 156, percentage: 13 },
                { state: "Karnataka", count: 123, percentage: 10 },
                { state: "Others", count: 89, percentage: 6 },
              ].map((location, index) => (
                <motion.div
                  key={index}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{location.state}</span>
                    <div className="text-right">
                      <span className="font-bold">{location.count}</span>
                      <span className="text-sm text-gray-500 ml-2">({location.percentage}%)</span>
                    </div>
                  </div>
                  <Progress value={location.percentage} className="h-2" />
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Device & Browser Analytics */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-orange-600" />
                Device & Browser Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Device Types</h4>
                <div className="space-y-3">
                  {[
                    { device: "Desktop", percentage: 65, color: "bg-blue-500" },
                    { device: "Mobile", percentage: 28, color: "bg-green-500" },
                    { device: "Tablet", percentage: 7, color: "bg-orange-500" },
                  ].map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${device.color}`} />
                        <span>{device.device}</span>
                      </div>
                      <span className="font-semibold">{device.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Top Browsers</h4>
                <div className="space-y-3">
                  {[
                    { browser: "Chrome", percentage: 72 },
                    { browser: "Safari", percentage: 15 },
                    { browser: "Firefox", percentage: 8 },
                    { browser: "Edge", percentage: 5 },
                  ].map((browser, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span>{browser.browser}</span>
                      <span className="font-semibold">{browser.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Traffic Sources */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-600" />
              Traffic Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { source: "Direct", visitors: 2456, percentage: 45, color: "from-blue-500 to-blue-600" },
                { source: "Social Media", visitors: 1234, percentage: 23, color: "from-green-500 to-green-600" },
                { source: "Email Campaign", visitors: 987, percentage: 18, color: "from-orange-500 to-orange-600" },
                { source: "Referrals", visitors: 756, percentage: 14, color: "from-purple-500 to-purple-600" },
              ].map((source, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white"
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className={`w-12 h-12 rounded-full bg-gradient-to-r ${source.color} mx-auto mb-3 flex items-center justify-center`}
                  >
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{source.visitors.toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mb-1">{source.source}</p>
                  <Badge variant="secondary">{source.percentage}%</Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
