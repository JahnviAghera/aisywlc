"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Calendar, Plus, Edit, Trash2, Clock, MapPin, Users, Mic, Coffee, Award } from "lucide-react"

const eventData = [
  {
    id: "EVT001",
    title: "Opening Ceremony",
    type: "ceremony",
    date: "2025-10-31",
    time: "09:00 AM - 10:30 AM",
    venue: "Main Auditorium",
    capacity: 500,
    registered: 487,
    speakers: ["Dr. Prema Gaur", "Prof. Chirag Paunwala"],
    status: "confirmed",
    description: "Grand opening ceremony with keynote addresses",
  },
  {
    id: "EVT002",
    title: "Keynote: Future of AI in Education",
    type: "keynote",
    date: "2025-10-31",
    time: "11:00 AM - 12:00 PM",
    venue: "Main Auditorium",
    capacity: 500,
    registered: 456,
    speakers: ["Dr. Rajesh Kumar"],
    status: "confirmed",
    description: "Exploring the transformative role of AI in modern education",
  },
  {
    id: "EVT003",
    title: "Technical Workshop: IoT Applications",
    type: "workshop",
    date: "2025-10-31",
    time: "02:00 PM - 04:00 PM",
    venue: "Lab Complex A",
    capacity: 50,
    registered: 48,
    speakers: ["Prof. Meera Patel", "Dr. Amit Shah"],
    status: "confirmed",
    description: "Hands-on workshop on IoT applications in smart cities",
  },
  {
    id: "EVT004",
    title: "Panel Discussion: Women in Tech Leadership",
    type: "panel",
    date: "2025-11-01",
    time: "10:00 AM - 11:30 AM",
    venue: "Conference Hall B",
    capacity: 200,
    registered: 178,
    speakers: ["Dr. Priya Sharma", "Prof. Anjali Diwan", "Ms. Neha Gupta"],
    status: "confirmed",
    description: "Discussion on challenges and opportunities for women in technology leadership",
  },
  {
    id: "EVT005",
    title: "Networking Lunch",
    type: "networking",
    date: "2025-11-01",
    time: "12:30 PM - 01:30 PM",
    venue: "Dining Hall",
    capacity: 600,
    registered: 523,
    speakers: [],
    status: "confirmed",
    description: "Networking opportunity with refreshments",
  },
  {
    id: "EVT006",
    title: "Student Paper Presentations",
    type: "presentation",
    date: "2025-11-02",
    time: "09:00 AM - 12:00 PM",
    venue: "Multiple Rooms",
    capacity: 300,
    registered: 89,
    speakers: ["Various Students"],
    status: "draft",
    description: "Student research paper presentations across multiple tracks",
  },
]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

export default function EventManagement() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "keynote":
        return <Mic className="w-4 h-4" />
      case "workshop":
        return <Users className="w-4 h-4" />
      case "panel":
        return <Users className="w-4 h-4" />
      case "networking":
        return <Coffee className="w-4 h-4" />
      case "ceremony":
        return <Award className="w-4 h-4" />
      case "presentation":
        return <Mic className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const getEventTypeBadge = (type: string) => {
    const typeColors = {
      keynote: "bg-purple-100 text-purple-800",
      workshop: "bg-blue-100 text-blue-800",
      panel: "bg-green-100 text-green-800",
      networking: "bg-orange-100 text-orange-800",
      ceremony: "bg-red-100 text-red-800",
      presentation: "bg-yellow-100 text-yellow-800",
    }
    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || "bg-gray-100 text-gray-800"}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "confirmed" ? (
      <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div variants={fadeInUp} initial="initial" animate="animate">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-orange-600" />
                  Event Management
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">Manage conference events and schedule</p>
              </div>
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Event Title</Label>
                        <Input id="title" placeholder="Enter event title" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Event Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="keynote">Keynote</SelectItem>
                            <SelectItem value="workshop">Workshop</SelectItem>
                            <SelectItem value="panel">Panel Discussion</SelectItem>
                            <SelectItem value="networking">Networking</SelectItem>
                            <SelectItem value="ceremony">Ceremony</SelectItem>
                            <SelectItem value="presentation">Presentation</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="date">Date</Label>
                        <Input id="date" type="date" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input id="startTime" type="time" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input id="endTime" type="time" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="venue">Venue</Label>
                        <Input id="venue" placeholder="Enter venue" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity">Capacity</Label>
                        <Input id="capacity" type="number" placeholder="Enter capacity" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="speakers">Speakers</Label>
                      <Input id="speakers" placeholder="Enter speaker names (comma separated)" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" placeholder="Enter event description" rows={3} />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Create Event</Button>
                      <Button variant="outline" onClick={() => setIsAddEventOpen(false)}>
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

      {/* Event Cards */}
      <motion.div
        className="grid gap-6"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.1 }}
      >
        {eventData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
            whileHover={{ scale: 1.01 }}
          >
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-orange-100">{getEventTypeIcon(event.type)}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{event.venue}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{event.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        {getEventTypeBadge(event.type)}
                        {getStatusBadge(event.status)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Event - {selectedEvent?.title}</DialogTitle>
                        </DialogHeader>
                        {selectedEvent && (
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editTitle">Event Title</Label>
                                <Input id="editTitle" defaultValue={selectedEvent.title} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editType">Event Type</Label>
                                <Select defaultValue={selectedEvent.type}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="keynote">Keynote</SelectItem>
                                    <SelectItem value="workshop">Workshop</SelectItem>
                                    <SelectItem value="panel">Panel Discussion</SelectItem>
                                    <SelectItem value="networking">Networking</SelectItem>
                                    <SelectItem value="ceremony">Ceremony</SelectItem>
                                    <SelectItem value="presentation">Presentation</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editDate">Date</Label>
                                <Input id="editDate" type="date" defaultValue={selectedEvent.date} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editTime">Time</Label>
                                <Input id="editTime" defaultValue={selectedEvent.time} />
                              </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="editVenue">Venue</Label>
                                <Input id="editVenue" defaultValue={selectedEvent.venue} />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editCapacity">Capacity</Label>
                                <Input id="editCapacity" type="number" defaultValue={selectedEvent.capacity} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editSpeakers">Speakers</Label>
                              <Input id="editSpeakers" defaultValue={selectedEvent.speakers.join(", ")} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="editDescription">Description</Label>
                              <Textarea id="editDescription" defaultValue={selectedEvent.description} rows={3} />
                            </div>
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1 bg-orange-600 hover:bg-orange-700">Save Changes</Button>
                              <Button variant="outline">Cancel</Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Capacity</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{event.capacity}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Registered</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-green-600">{event.registered}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Available</span>
                      <Users className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{event.capacity - event.registered}</p>
                  </div>
                </div>

                {event.speakers.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Speakers:</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.speakers.map((speaker, speakerIndex) => (
                        <Badge key={speakerIndex} variant="outline">
                          {speaker}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
