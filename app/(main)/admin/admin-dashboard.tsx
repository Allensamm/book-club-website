"use client"

import { useEffect, useState } from "react"
import { createBrowserClient } from "@supabase/ssr"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar, Mail, MapPin, Users, Download, Search, LogOut, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface EventRegistration {
  id: string
  event_id: string
  full_name: string
  email: string
  number_of_attendees: number
  created_at: string
  events: {
    title: string
    date: string
    time: string
    location: string
  }
}

interface MemberRegistration {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  membership_tier: string
  created_at: string
}

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([])
  const [memberRegistrations, setMemberRegistrations] = useState<MemberRegistration[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("events")
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean
    type: "event" | "member" | null
    id: string
    name: string
  }>({
    open: false,
    type: null,
    id: "",
    name: "",
  })

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch event registrations
      const { data: eventData, error: eventError } = await supabase
        .from("event_registrations")
        .select(`
          *,
          events (
            title,
            date,
            time,
            location
          )
        `)
        .order("created_at", { ascending: false })

      if (eventError) {
        console.error("Error fetching event registrations:", eventError)
      } else {
        setEventRegistrations(eventData || [])
      }

      // Fetch member registrations
      const { data: memberData, error: memberError } = await supabase
        .from("member_registrations")
        .select("*")
        .order("created_at", { ascending: false })

      if (memberError) {
        console.error("Error fetching member registrations:", memberError)
      } else {
        setMemberRegistrations(memberData || [])
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            if (typeof value === "object" && value !== null) {
              return JSON.stringify(value).replace(/,/g, ";")
            }
            return `"${value}"`
          })
          .join(","),
      ),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${filename}-${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleDeleteEventRegistration = async (id: string) => {
    try {
      const { error } = await supabase.from("event_registrations").delete().eq("id", id)

      if (error) {
        console.error("Error deleting event registration:", error)
        alert("Failed to delete registration. Please try again.")
      } else {
        // Refresh data after deletion
        await fetchData()
        setDeleteDialog({ open: false, type: null, id: "", name: "" })
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleDeleteMemberRegistration = async (id: string) => {
    try {
      const { error } = await supabase.from("member_registrations").delete().eq("id", id)

      if (error) {
        console.error("Error deleting member registration:", error)
        alert("Failed to delete member. Please try again.")
      } else {
        // Refresh data after deletion
        await fetchData()
        setDeleteDialog({ open: false, type: null, id: "", name: "" })
      }
    } catch (error) {
      console.error("Error:", error)
      alert("An error occurred. Please try again.")
    }
  }

  const handleDeleteConfirm = () => {
    if (deleteDialog.type === "event") {
      handleDeleteEventRegistration(deleteDialog.id)
    } else if (deleteDialog.type === "member") {
      handleDeleteMemberRegistration(deleteDialog.id)
    }
  }

  const filteredEventRegistrations = eventRegistrations.filter(
    (reg) =>
      reg.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.events?.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredMemberRegistrations = memberRegistrations.filter(
    (reg) =>
      `${reg.first_name} ${reg.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.membership_tier.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalEventAttendees = eventRegistrations.reduce((sum, reg) => sum + reg.number_of_attendees, 0)

  const getPopularMembershipTier = (registrations: MemberRegistration[]) => {
    if (registrations.length === 0) return "N/A"

    const tierCounts: Record<string, number> = registrations.reduce((acc, reg) => {
      acc[reg.membership_tier] = (acc[reg.membership_tier] || 0) + 1
      return acc
    }, {})

    const entries = Object.entries(tierCounts)
    entries.sort((a, b) => b[1] - a[1])

    return entries[0]?.[0] || "N/A"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage event registrations and member sign-ups</p>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Event Registrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{eventRegistrations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">{totalEventAttendees} total attendees</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Member Sign-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{memberRegistrations.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all membership tiers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Popular Tier</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{getPopularMembershipTier(memberRegistrations)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Registrations</CardTitle>
                <CardDescription>View and manage all registrations</CardDescription>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="events">Event Registrations ({eventRegistrations.length})</TabsTrigger>
                <TabsTrigger value="members">Member Sign-ups ({memberRegistrations.length})</TabsTrigger>
              </TabsList>

              {/* Event Registrations Tab */}
              <TabsContent value="events">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">
                    {filteredEventRegistrations.length} registration{filteredEventRegistrations.length !== 1 ? "s" : ""}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(eventRegistrations, "event-registrations")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                {filteredEventRegistrations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm ? "No registrations found matching your search." : "No event registrations yet."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredEventRegistrations.map((registration) => (
                      <Card key={registration.id} className="border-l-4 border-l-accent">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-semibold text-lg text-foreground mb-2">{registration.full_name}</h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  {registration.email}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" />
                                  {registration.number_of_attendees} attendee
                                  {registration.number_of_attendees !== 1 ? "s" : ""}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  Registered: {new Date(registration.created_at).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            <div className="bg-muted/30 rounded-lg p-4">
                              <h5 className="font-semibold text-foreground mb-2">{registration.events?.title}</h5>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Calendar className="h-4 w-4" />
                                  {new Date(registration.events?.date).toLocaleDateString()} at{" "}
                                  {registration.events?.time}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" />
                                  {registration.events?.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setDeleteDialog({
                                  open: true,
                                  type: "event",
                                  id: registration.id,
                                  name: `${registration.full_name} - ${registration.events?.title}`,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Member Registrations Tab */}
              <TabsContent value="members">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground">
                    {filteredMemberRegistrations.length} member{filteredMemberRegistrations.length !== 1 ? "s" : ""}
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(memberRegistrations, "member-registrations")}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                </div>

                {filteredMemberRegistrations.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    {searchTerm ? "No members found matching your search." : "No member registrations yet."}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredMemberRegistrations.map((member) => (
                      <Card key={member.id} className="border-l-4 border-l-accent">
                        <CardContent className="pt-6">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <h4 className="font-semibold text-lg text-foreground mb-2">
                                {member.first_name} {member.last_name}
                              </h4>
                              <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" />
                                  {member.email}
                                </div>
                                {member.phone && (
                                  <div className="text-sm text-muted-foreground">Phone: {member.phone}</div>
                                )}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Membership Tier</div>
                              <div className="font-semibold text-accent capitalize">{member.membership_tier}</div>
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground mb-1">Joined</div>
                              <div className="font-medium text-foreground">
                                {new Date(member.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                setDeleteDialog({
                                  open: true,
                                  type: "member",
                                  id: member.id,
                                  name: `${member.first_name} ${member.last_name}`,
                                })
                              }
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <AlertDialog
          open={deleteDialog.open}
          onOpenChange={(open) => !open && setDeleteDialog({ open: false, type: null, id: "", name: "" })}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete the {deleteDialog.type === "event" ? "event registration" : "member"} for{" "}
                <span className="font-semibold">{deleteDialog.name}</span>. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
