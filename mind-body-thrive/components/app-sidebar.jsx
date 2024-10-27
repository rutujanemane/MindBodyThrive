"use client"

import * as React from "react"
import Link from "next/link"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "Mind Body Thrive",
    email: "nchangfru24@gmail.com",
    avatar: "Technica2024",
  },
  teams: [
    {
      name: "Mind Body Thrive",
      logo: GalleryVerticalEnd,
      plan: "#1 Fitness and Health",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Track gym workouts",
      url: "/tracking",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Sets & Reps",
          url: "#",
        },
        {
          title: "Nutrition",
          url: "#",
        },
        {
          title: "Progress",
          url: "#",
        },
      ],
    },
    {
      title: "Groups",
      url: "/groups",
      icon: Bot,
      items: [
        {
          title: "group 1",
          url: "/groups/1",
        },
        {
          title: "group 2",
          url: "/groups/2",
        },
        
      ],
    },
    {
      title: "Mental Support",
      url: "/support",
      icon: BookOpen,
      items: [
        {
          title: "get advice and support",
          url: "/support",
        },
       
        {
          title: "view mental health resources",
          url: "/support",
        },
      ],
    },
    {
      title: "Resources",
      url: "/resources",
      icon: Settings2,
      items: [
        {
          title: "exercise resources",  
          url: "#",
        },
        {
          title: "nutrition resources",
          url: "#",
        },
        {
          title: "mental health resources",
          url: "#",
        },
      ],
    },
  ],
   Resources: [
    {
      name: "Mental Health Resources",
      url: "/resources/mental-health",
      icon: Frame,
    },
    {
      name: "Nutrition Resources",
      url: "/resources/nutrition",
      icon: PieChart,
    },
    {
      name: "Exercise Resources",
      url: "/resources/exercise",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.Resources} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
