"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface MembershipContextType {
  isMember: boolean
  membershipPlan: string | null
  toggleMembership: () => void
  setMembershipPlan: (plan: string) => void
}

const MembershipContext = createContext<MembershipContextType | undefined>(undefined)

export function MembershipProvider({ children }: { children: ReactNode }) {
  const [isMember, setIsMember] = useState(false)
  const [membershipPlan, setMembershipPlanState] = useState<string | null>(null)

  const toggleMembership = () => {
    setIsMember((prev) => !prev)
  }

  const setMembershipPlan = (plan: string) => {
    setMembershipPlanState(plan)
  }

  return (
    <MembershipContext.Provider value={{ isMember, membershipPlan, toggleMembership, setMembershipPlan }}>
      {children}
    </MembershipContext.Provider>
  )
}

export function useMembership() {
  const context = useContext(MembershipContext)
  if (context === undefined) {
    throw new Error("useMembership must be used within a MembershipProvider")
  }
  return context
}
