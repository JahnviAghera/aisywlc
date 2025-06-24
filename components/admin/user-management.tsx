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
import { Label } from "@/components/ui/label"
import { Search, UserPlus, Edit, Trash2, Shield, ShieldCheck, Mail, Building } from "lucide-react"

const userData = [
  {
    id: "USR001",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@ieee.org",
    role: "Super Admin",
    organization: "IEEE Gujarat Section",
    phone: "+91 98765 43210",
    status: "active",
    lastLogin: "2024-12-15 10:30 AM",
    joinDate: "2023-01-15",
  },
  {
    id: "USR002",
    name: "Prof. Meera Patel",
    email: "meera.patel@nirma.ac.in",
    role: "Admin",
    organization: "Nirma University",
    phone: "+91 98765 43211",
    status: "active",
    lastLogin: "2024-12-14 03:45 PM",
    joinDate: "2023-03-20",
  },
  {
    id: "USR003",
    name: "Dr. Amit Shah",
    email: "amit.shah@adani.ac.in",
    role: "Moderator",
    organization: "Adani University",
    phone: "+91 98765 43212",
    status: "active",
    lastLogin: "2024-12-13 11:20 AM",
    joinDate: "2023-06-10",
  },
  {
    id: "USR004",
    name: "Priya Sharma",
    email: "priya.sharma@ieee.org",
    role: "Coordinator",
    organization: "IEEE WIE Gujarat",
    phone: "+91 98765 43213",
    status: "inactive",
    lastLogin: "2024-12-10 09:15 AM",
    joinDate: "2023-08-05",
  },
  {
    id: "USR005",
    name: "Rahul Desai",
    email: "rahul.desai@ieee.org",
    role: "Volunteer",
    organization: "IEEE YP Gujarat",
    phone: "+91 98765 43214",
    status: "active",
    lastLogin: "2024-12-15 02:20 PM",
    joinDate: "2024-01-12",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)

  const getRoleBadge = (role: string) => {
    const roleColors = {
      "Super Admin": "bg-red-100 text-red-800",
      Admin: "bg-orange-100 text-orange-800",
      Moderator: "bg-blue-100 text-blue-800",
      Coordinator: "bg-green-100 text-green-800",
      Volunteer: "bg-purple-100 text-purple-800",
    }
    return <Badge className={roleColors[role as keyof typeof roleColors] || "bg-gray-100 text-gray-800"}>{role}</Badge>
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    )
  }

  const filteredData = userData.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase().includes(roleFilter.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
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
                  <Shield className="w-5 h-5 text-orange-600" />
                  User Management
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Manage admin users and permissions</p>
              </div>
              <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter full name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter email address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="Enter phone number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization</Label>
                      <Input id="organization" placeholder="Enter organization" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="moderator">Moderator</SelectItem>
                          <SelectItem value="coordinator">Coordinator</SelectItem>
                          <SelectItem value="volunteer">Volunteer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Create User</Button>
                      <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                    placeholder="Search by name, email, or organization..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="super admin">Super Admin</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="coordinator">Coordinator</SelectItem>
                  <SelectItem value="volunteer">Volunteer</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* User Table */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="hover:bg-gray-50/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{user.organization}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="text-sm">{user.joinDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle>Edit User - {selectedUser?.name}</DialogTitle>
                              </DialogHeader>
                              {selectedUser && (
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="editName">Full Name</Label>
                                    <Input id="editName" defaultValue={selectedUser.name} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editEmail">Email Address</Label>
                                    <Input id="editEmail" type="email" defaultValue={selectedUser.email} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editPhone">Phone Number</Label>
                                    <Input id="editPhone" defaultValue={selectedUser.phone} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editOrganization">Organization</Label>
                                    <Input id="editOrganization" defaultValue={selectedUser.organization} />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editRole">Role</Label>
                                    <Select defaultValue={selectedUser.role.toLowerCase()}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="moderator">Moderator</SelectItem>
                                        <SelectItem value="coordinator">Coordinator</SelectItem>
                                        <SelectItem value="volunteer">Volunteer</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="editStatus">Status</Label>
                                    <Select defaultValue={selectedUser.status}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex gap-2 pt-4">
                                    <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                                    <Button variant="outline">Cancel</Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Mail className="w-4 h-4" />
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

      {/* User Stats */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-5 gap-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        {[
          { label: "Total Users", value: filteredData.length, icon: Shield },
          {
            label: "Super Admins",
            value: filteredData.filter((u) => u.role === "Super Admin").length,
            icon: ShieldCheck,
          },
          { label: "Admins", value: filteredData.filter((u) => u.role === "Admin").length, icon: Shield },
          { label: "Active Users", value: filteredData.filter((u) => u.status === "active").length, icon: Shield },
          { label: "Inactive Users", value: filteredData.filter((u) => u.status === "inactive").length, icon: Shield },
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
