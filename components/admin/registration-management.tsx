"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Download, Eye, Edit, Trash2, Mail, CheckCircle, XCircle, Clock, Users, FileText } from "lucide-react"

const registrationData = [
  {
    id: "REG001",
    name: "Dr. Priya Sharma",
    email: "priya.sharma@example.com",
    category: "Professional",
    organization: "IIT Gandhinagar",
    status: "confirmed",
    paymentStatus: "paid",
    registrationDate: "2024-12-15",
    amount: 6000,
  },
  {
    id: "REG002",
    name: "Rahul Patel",
    email: "rahul.patel@example.com",
    category: "Student",
    organization: "Nirma University",
    status: "pending",
    paymentStatus: "pending",
    registrationDate: "2024-12-14",
    amount: 2500,
  },
  {
    id: "REG003",
    name: "Anjali Desai",
    email: "anjali.desai@example.com",
    category: "Young Professional",
    organization: "TCS",
    status: "confirmed",
    paymentStatus: "paid",
    registrationDate: "2024-12-13",
    amount: 4000,
  },
  {
    id: "REG004",
    name: "Prof. Kiran Shah",
    email: "kiran.shah@example.com",
    category: "Life Member",
    organization: "Adani University",
    status: "confirmed",
    paymentStatus: "paid",
    registrationDate: "2024-12-12",
    amount: 3500,
  },
  {
    id: "REG005",
    name: "Neha Gupta",
    email: "neha.gupta@example.com",
    category: "Student",
    organization: "DA-IICT",
    status: "cancelled",
    paymentStatus: "refunded",
    registrationDate: "2024-12-11",
    amount: 2500,
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function RegistrationManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredData = registrationData.filter((registration) => {
    const matchesSearch =
      registration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || registration.status === statusFilter
    const matchesCategory = categoryFilter === "all" || registration.category.toLowerCase() === categoryFilter

    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-orange-600" />
                  Registration Management
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Manage all conference registrations</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Bulk Email
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by name, email, or registration ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="young professional">Young Professional</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="life member">Life Member</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Registration Table */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Registration ID</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((registration, index) => (
                    <motion.tr
                      key={registration.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="hover:bg-gray-50/50"
                    >
                      <TableCell className="font-medium">{registration.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{registration.name}</p>
                          <p className="text-sm text-gray-500">{registration.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{registration.category}</Badge>
                      </TableCell>
                      <TableCell>{registration.organization}</TableCell>
                      <TableCell>{getStatusBadge(registration.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(registration.paymentStatus)}</TableCell>
                      <TableCell className="font-medium">₹{registration.amount.toLocaleString()}</TableCell>
                      <TableCell>{registration.registrationDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedRegistration(registration)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Registration Details - {selectedRegistration?.id}</DialogTitle>
                              </DialogHeader>
                              {selectedRegistration && (
                                <div className="space-y-4">
                                  <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Personal Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Name:</strong> {selectedRegistration.name}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {selectedRegistration.email}
                                        </p>
                                        <p>
                                          <strong>Category:</strong> {selectedRegistration.category}
                                        </p>
                                        <p>
                                          <strong>Organization:</strong> {selectedRegistration.organization}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Registration Details</h4>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Status:</strong> {getStatusBadge(selectedRegistration.status)}
                                        </p>
                                        <p>
                                          <strong>Payment:</strong>{" "}
                                          {getPaymentStatusBadge(selectedRegistration.paymentStatus)}
                                        </p>
                                        <p>
                                          <strong>Amount:</strong> ₹{selectedRegistration.amount.toLocaleString()}
                                        </p>
                                        <p>
                                          <strong>Date:</strong> {selectedRegistration.registrationDate}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Approve
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Mail className="w-4 h-4 mr-2" />
                                      Send Email
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <FileText className="w-4 h-4 mr-2" />
                                      Generate Certificate
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Summary Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        {[
          { label: "Total Registrations", value: filteredData.length, icon: Users },
          {
            label: "Confirmed",
            value: filteredData.filter((r) => r.status === "confirmed").length,
            icon: CheckCircle,
          },
          { label: "Pending", value: filteredData.filter((r) => r.status === "pending").length, icon: Clock },
          { label: "Cancelled", value: filteredData.filter((r) => r.status === "cancelled").length, icon: XCircle },
        ].map((stat, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border-0"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-100">
                <stat.icon className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
