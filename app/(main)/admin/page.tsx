import AdminAuth from "./admin-auth"

export const metadata = {
  title: "Admin Dashboard - ReadLoungeClub",
  description: "View and manage event registrations and member sign-ups",
}

export default function AdminPage() {
  return <AdminAuth />
}
