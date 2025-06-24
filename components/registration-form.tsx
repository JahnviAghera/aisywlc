"use client"

import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation';

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { User, Building, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Calendar } from "lucide-react"

interface FormData {
  // Personal Information
  first_name: string
  last_name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string

  // Professional Information
  organization: string
  designation: string
  experience: string
  ieeeNumber: string
  category: string

  // Event Preferences
  accommodation: string
  dietaryRestrictions: string
  specialRequirements: string
  sessions: string[]

  // Payment Information
  paymentMethod: string
  amount: number

  // Terms and Conditions
  agreeToTerms: boolean
  subscribeNewsletter: boolean
}

const initialFormData: FormData = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  organization: "",
  designation: "",
  experience: "",
  ieeeNumber: "",
  category: "",
  accommodation: "",
  dietaryRestrictions: "",
  specialRequirements: "",
  sessions: [],
  paymentMethod: "",
  amount: 0,
  agreeToTerms: false,
  subscribeNewsletter: false,
}

const steps = [
  {
    id: 1,
    title: "Personal Information",
    description: "Tell us about yourself",
    icon: User,
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 2,
    title: "Professional Details",
    description: "Your work and IEEE information",
    icon: Building,
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 3,
    title: "Event Preferences",
    description: "Customize your experience",
    icon: Calendar,
    color: "from-pink-500 to-orange-500",
  },
  {
    id: 4,
    title: "Payment Details",
    description: "Complete your registration",
    icon: CreditCard,
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    title: "Confirmation",
    description: "Review and submit",
    icon: CheckCircle,
    color: "from-green-500 to-teal-500",
  },
]

const sessionOptions = [
  "Keynote Sessions",
  "Technical Workshops",
  "Panel Discussions",
  "Networking Events",
  "Student Competitions",
  "Industry Presentations",
  "Research Showcases",
  "Career Development",
]

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter();

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (step) {
      case 1:
        if (!formData.first_name) newErrors.first_name = "First name is required"
        if (!formData.last_name) newErrors.last_name = "Last name is required"
        if (!formData.email) newErrors.email = "Email is required"
        if (!formData.phone) newErrors.phone = "Phone number is required"
        if (!formData.gender) newErrors.gender = "Gender is required"
        break
      case 2:
        if (!formData.organization) newErrors.organization = "Organization is required"
        if (!formData.designation) newErrors.designation = "Designation is required"
        if (!formData.category) newErrors.category = "Category is required"
        break
      case 3:
        if (!formData.accommodation) newErrors.accommodation = "Accommodation preference is required"
        break
      case 4:
        if (!formData.paymentMethod) newErrors.paymentMethod = "Payment method is required"
        break
      case 5:
        if (!formData.agreeToTerms) newErrors.agreeToTerms = true
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        // Handle error (e.g., display error message to the user)
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      router.push('/register/success');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const getRegistrationFee = () => {
    switch (formData.category) {
      case "student":
        return 2500
      case "young-professional":
        return 4000
      case "professional":
        return 6000
      case "life-member":
        return 3500
      default:
        return 0
    }
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first_name">First Name *</Label>
                <Input
                  id="first_name"
                  value={formData.first_name}
                  onChange={(e) => updateFormData("first_name", e.target.value)}
                  className={errors.first_name ? "border-red-500" : ""}
                />
                {errors.first_name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.first_name}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Last Name *</Label>
                <Input
                  id="last_name"
                  value={formData.last_name}
                  onChange={(e) => updateFormData("last_name", e.target.value)}
                  className={errors.last_name ? "border-red-500" : ""}
                />
                {errors.last_name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.last_name}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => updateFormData("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData("phone", e.target.value)}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.phone}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label>Gender *</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => updateFormData("gender", value)}
                className="flex flex-wrap gap-4"
              >
                {["Male", "Female", "Other", "Prefer not to say"].map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.toLowerCase()} id={option} />
                    <Label htmlFor={option}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
              {errors.gender && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.gender}
                </motion.p>
              )}
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization/Institution *</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={(e) => updateFormData("organization", e.target.value)}
                className={errors.organization ? "border-red-500" : ""}
              />
              {errors.organization && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.organization}
                </motion.p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="designation">Designation *</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => updateFormData("designation", e.target.value)}
                  className={errors.designation ? "border-red-500" : ""}
                />
                {errors.designation && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors.designation}
                  </motion.p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Select value={formData.experience} onValueChange={(value) => updateFormData("experience", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="15+">15+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ieeeNumber">IEEE Membership Number</Label>
              <Input
                id="ieeeNumber"
                value={formData.ieeeNumber}
                onChange={(e) => updateFormData("ieeeNumber", e.target.value)}
                placeholder="Enter your IEEE membership number (if applicable)"
              />
            </div>

            <div className="space-y-2">
              <Label>Registration Category *</Label>
              <RadioGroup
                value={formData.category}
                onValueChange={(value) => {
                  updateFormData("category", value)
                  updateFormData("amount", getRegistrationFee())
                }}
                className="space-y-3"
              >
                {[
                  {
                    value: "student",
                    label: "Student",
                    price: "₹2,500",
                    description: "Full-time students with valid ID",
                  },
                  {
                    value: "young-professional",
                    label: "Young Professional",
                    price: "₹4,000",
                    description: "Professionals under 35 years",
                  },
                  {
                    value: "professional",
                    label: "Professional",
                    price: "₹6,000",
                    description: "Industry professionals",
                  },
                  {
                    value: "life-member",
                    label: "IEEE Life Member",
                    price: "₹3,500",
                    description: "IEEE Life Members",
                  },
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                      formData.category === option.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={option.value} className="font-semibold">
                          {option.label}
                        </Label>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                          {option.price}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
              {errors.category && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.category}
                </motion.p>
              )}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Accommodation Preference *</Label>
              <RadioGroup
                value={formData.accommodation}
                onValueChange={(value) => updateFormData("accommodation", value)}
                className="space-y-3"
              >
                {[
                  {
                    value: "hotel",
                    label: "Hotel Accommodation",
                    description: "Premium hotels for speakers and IC members",
                  },
                  { value: "hostel", label: "University Hostel", description: "Budget-friendly hostel accommodation" },
                  { value: "guest-house", label: "Guest House", description: "University guest house facilities" },
                  { value: "own", label: "Own Arrangement", description: "I will arrange my own accommodation" },
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                      formData.accommodation === option.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div>
                      <Label htmlFor={option.value} className="font-semibold">
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
              {errors.accommodation && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.accommodation}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Sessions of Interest</Label>
              <div className="grid md:grid-cols-2 gap-3">
                {sessionOptions.map((session) => (
                  <motion.div key={session} className="flex items-center space-x-2" whileHover={{ scale: 1.02 }}>
                    <Checkbox
                      id={session}
                      checked={formData.sessions.includes(session)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          updateFormData("sessions", [...formData.sessions, session])
                        } else {
                          updateFormData(
                            "sessions",
                            formData.sessions.filter((s) => s !== session),
                          )
                        }
                      }}
                    />
                    <Label htmlFor={session} className="text-sm">
                      {session}
                    </Label>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietaryRestrictions">Dietary Restrictions</Label>
              <Textarea
                id="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={(e) => updateFormData("dietaryRestrictions", e.target.value)}
                placeholder="Please mention any dietary restrictions or food allergies"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="specialRequirements">Special Requirements</Label>
              <Textarea
                id="specialRequirements"
                value={formData.specialRequirements}
                onChange={(e) => updateFormData("specialRequirements", e.target.value)}
                placeholder="Any special requirements or accessibility needs"
                rows={3}
              />
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Registration Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Category:</span>
                  <span className="font-semibold capitalize">{formData.category?.replace("-", " ")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Fee:</span>
                  <span className="font-semibold">₹{getRegistrationFee().toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fee:</span>
                  <span className="font-semibold">₹100</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount:</span>
                  <span>₹{(getRegistrationFee() + 100).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Payment Method *</Label>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => updateFormData("paymentMethod", value)}
                className="space-y-3"
              >
                {[
                  { value: "upi", label: "UPI Payment", description: "Pay using UPI apps like GPay, PhonePe, Paytm" },
                  { value: "card", label: "Credit/Debit Card", description: "Secure payment using your card" },
                  { value: "netbanking", label: "Net Banking", description: "Direct bank transfer" },
                  { value: "wallet", label: "Digital Wallet", description: "Paytm, Amazon Pay, etc." },
                ].map((option) => (
                  <motion.div
                    key={option.value}
                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 transition-all ${
                      formData.paymentMethod === option.value
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                    <div>
                      <Label htmlFor={option.value} className="font-semibold">
                        {option.label}
                      </Label>
                      <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
              {errors.paymentMethod && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.paymentMethod}
                </motion.p>
              )}
            </div>
          </div>
        )

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">Review Your Registration</h3>
              <p className="text-gray-600">Please review all information before submitting</p>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong>Name:</strong> {formData.first_name} {formData.last_name}
                    </div>
                    <div>
                      <strong>Email:</strong> {formData.email}
                    </div>
                    <div>
                      <strong>Phone:</strong> {formData.phone}
                    </div>
                    <div>
                      <strong>Gender:</strong> {formData.gender}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Professional Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <strong>Organization:</strong> {formData.organization}
                    </div>
                    <div>
                      <strong>Designation:</strong> {formData.designation}
                    </div>
                    <div>
                      <strong>Category:</strong> {formData.category?.replace("-", " ")}
                    </div>
                    <div>
                      <strong>IEEE Number:</strong> {formData.ieeeNumber || "N/A"}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Registration Fee:</span>
                    <span>₹{getRegistrationFee().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Fee:</span>
                    <span>₹100</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>₹{(getRegistrationFee() + 100).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                />
                <Label htmlFor="agreeToTerms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-orange-600 hover:underline">
                    Terms and Conditions
                  </a>{" "}
                  and
                  <a href="#" className="text-orange-600 hover:underline ml-1">
                    Privacy Policy
                  </a>{" "}
                  *
                </Label>
              </div>
              {errors.agreeToTerms && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {errors.agreeToTerms}
                </motion.p>
              )}

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="subscribeNewsletter"
                  checked={formData.subscribeNewsletter}
                  onCheckedChange={(checked) => updateFormData("subscribeNewsletter", checked)}
                />
                <Label htmlFor="subscribeNewsletter" className="text-sm">
                  Subscribe to IEEE Gujarat Section newsletter for updates and future events
                </Label>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    currentStep >= step.id
                      ? `bg-gradient-to-r ${step.color} text-white shadow-lg`
                      : "bg-gray-200 text-gray-500"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  animate={currentStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    duration: 0.5,
                    repeat: currentStep === step.id ? Number.POSITIVE_INFINITY : 0,
                    repeatDelay: 2,
                  }}
                >
                  <step.icon className="w-6 h-6" />
                </motion.div>
                <div className="text-center">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? "text-gray-900" : "text-gray-500"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500 hidden md:block">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full -translate-y-1/2" />
            <motion.div
              className="absolute top-1/2 left-0 h-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full -translate-y-1/2"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Form Content */}
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardTitle className="text-2xl font-bold mb-2">{steps[currentStep - 1]?.title}</CardTitle>
              <p className="text-gray-600">{steps[currentStep - 1]?.description}</p>
            </motion.div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <AnimatePresence mode="wait" custom={currentStep}>
              <motion.div
                key={currentStep}
                custom={currentStep}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>

              {currentStep < steps.length ? (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </motion.div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Submit Registration
                      </>
                    )}
                  </Button>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
