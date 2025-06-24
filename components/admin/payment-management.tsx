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
import {
  Search,
  CreditCard,
  Download,
  Eye,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Receipt,
} from "lucide-react"

const paymentData = [
  {
    id: "PAY001",
    registrationId: "REG001",
    participantName: "Dr. Priya Sharma",
    amount: 6000,
    method: "UPI",
    status: "completed",
    transactionId: "TXN123456789",
    date: "2024-12-15 10:30 AM",
    gateway: "Razorpay",
  },
  {
    id: "PAY002",
    registrationId: "REG002",
    participantName: "Rahul Patel",
    amount: 2500,
    method: "Credit Card",
    status: "pending",
    transactionId: "TXN123456790",
    date: "2024-12-14 03:45 PM",
    gateway: "Stripe",
  },
  {
    id: "PAY003",
    registrationId: "REG003",
    participantName: "Anjali Desai",
    amount: 4000,
    method: "Net Banking",
    status: "completed",
    transactionId: "TXN123456791",
    date: "2024-12-13 11:20 AM",
    gateway: "Razorpay",
  },
  {
    id: "PAY004",
    registrationId: "REG004",
    participantName: "Prof. Kiran Shah",
    amount: 3500,
    method: "UPI",
    status: "completed",
    transactionId: "TXN123456792",
    date: "2024-12-12 09:15 AM",
    gateway: "Razorpay",
  },
  {
    id: "PAY005",
    registrationId: "REG005",
    participantName: "Neha Gupta",
    amount: 2500,
    method: "Credit Card",
    status: "failed",
    transactionId: "TXN123456793",
    date: "2024-12-11 02:20 PM",
    gateway: "Stripe",
  },
  {
    id: "PAY006",
    registrationId: "REG006",
    participantName: "Vikram Singh",
    amount: 6000,
    method: "Digital Wallet",
    status: "refunded",
    transactionId: "TXN123456794",
    date: "2024-12-10 04:30 PM",
    gateway: "Paytm",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function PaymentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [methodFilter, setMethodFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800">Refunded</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getMethodBadge = (method: string) => {
    const methodColors = {
      UPI: "bg-purple-100 text-purple-800",
      "Credit Card": "bg-blue-100 text-blue-800",
      "Net Banking": "bg-green-100 text-green-800",
      "Digital Wallet": "bg-orange-100 text-orange-800",
    }
    return (
      <Badge className={methodColors[method as keyof typeof methodColors] || "bg-gray-100 text-gray-800"}>
        {method}
      </Badge>
    )
  }

  const filteredData = paymentData.filter((payment) => {
    const matchesSearch =
      payment.participantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || payment.status === statusFilter
    const matchesMethod = methodFilter === "all" || payment.method.toLowerCase() === methodFilter

    return matchesSearch && matchesStatus && matchesMethod
  })

  const totalRevenue = paymentData
    .filter((p) => p.status === "completed")
    .reduce((sum, payment) => sum + payment.amount, 0)

  const pendingAmount = paymentData
    .filter((p) => p.status === "pending")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-600" />
                  Payment Management
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Monitor and manage all payment transactions</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Transactions
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Payments
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>
      </motion.div>

      {/* Payment Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        {[
          {
            title: "Total Revenue",
            value: `₹${totalRevenue.toLocaleString()}`,
            icon: DollarSign,
            color: "from-green-500 to-green-600",
            change: "+12.5%",
          },
          {
            title: "Pending Payments",
            value: `₹${pendingAmount.toLocaleString()}`,
            icon: Clock,
            color: "from-yellow-500 to-yellow-600",
            change: "-5.2%",
          },
          {
            title: "Successful Transactions",
            value: paymentData.filter((p) => p.status === "completed").length,
            icon: CheckCircle,
            color: "from-blue-500 to-blue-600",
            change: "+8.1%",
          },
          {
            title: "Failed Transactions",
            value: paymentData.filter((p) => p.status === "failed").length,
            icon: XCircle,
            color: "from-red-500 to-red-600",
            change: "-2.3%",
          },
        ].map((stat, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }}>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={stat.change.startsWith("+") ? "default" : "destructive"}
                    className={stat.change.startsWith("+") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
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

      {/* Filters */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by participant name, payment ID, or transaction ID..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="upi">UPI</SelectItem>
                  <SelectItem value="credit card">Credit Card</SelectItem>
                  <SelectItem value="net banking">Net Banking</SelectItem>
                  <SelectItem value="digital wallet">Digital Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Payment Table */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Participant</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Gateway</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.05 }}
                      className="hover:bg-gray-50/50"
                    >
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{payment.participantName}</p>
                          <p className="text-sm text-gray-500">{payment.registrationId}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold">₹{payment.amount.toLocaleString()}</TableCell>
                      <TableCell>{getMethodBadge(payment.method)}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.transactionId}</TableCell>
                      <TableCell className="text-sm">{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.gateway}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedPayment(payment)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Payment Details - {selectedPayment?.id}</DialogTitle>
                              </DialogHeader>
                              {selectedPayment && (
                                <div className="space-y-6">
                                  <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-semibold mb-3">Payment Information</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Payment ID:</span>
                                          <span className="font-medium">{selectedPayment.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Registration ID:</span>
                                          <span className="font-medium">{selectedPayment.registrationId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Amount:</span>
                                          <span className="font-bold">₹{selectedPayment.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Method:</span>
                                          <span>{selectedPayment.method}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Status:</span>
                                          {getStatusBadge(selectedPayment.status)}
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-3">Transaction Details</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Transaction ID:</span>
                                          <span className="font-mono">{selectedPayment.transactionId}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Gateway:</span>
                                          <span>{selectedPayment.gateway}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Date:</span>
                                          <span>{selectedPayment.date}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-gray-600">Participant:</span>
                                          <span>{selectedPayment.participantName}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button size="sm" variant="outline">
                                      <Receipt className="w-4 h-4 mr-2" />
                                      Download Receipt
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <RefreshCw className="w-4 h-4 mr-2" />
                                      Refund Payment
                                    </Button>
                                    {selectedPayment.status === "failed" && (
                                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Retry Payment
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Receipt className="w-4 h-4" />
                          </Button>
                          {payment.status === "failed" && (
                            <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          )}
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
    </div>
  )
}
