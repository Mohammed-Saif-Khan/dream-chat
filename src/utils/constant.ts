import {
  Contact,
  Disc,
  File,
  Image,
  MapPin,
  MessageCircle,
  PhoneOutgoing,
  Settings,
  Users,
  Video,
  VideoOff,
} from "lucide-react";

import AVATAR_1 from "@/assets/home/avatar-01.jpg";
import AVATAR_2 from "@/assets/home/avatar-02.jpg";
import AVATAR_3 from "@/assets/home/avatar-03.jpg";
import AVATAR_4 from "@/assets/home/avatar-04.jpg";
import AVATAR_5 from "@/assets/home/avatar-05.jpg";
import AVATAR_6 from "@/assets/home/avatar-06.jpg";
import AVATAR_7 from "@/assets/home/avatar-07.jpg";

export const menubarHideURL = [
  "/auth/forgot-password",
  "/auth/otp",
  "/auth/reset-password",
  "/auth/sign-in",
  "/auth/sign-up",
  "/auth/success",
];

export const navbar = [
  {
    id: "1",
    link: "/chat",
    icon: MessageCircle,
  },
  {
    id: "2",
    link: "/contact",
    icon: Contact,
  },
  {
    id: "3",
    link: "/groups",
    icon: Users,
  },
  {
    id: "4",
    link: "/status",
    icon: Disc,
  },
  {
    id: "5",
    link: "/call",
    icon: PhoneOutgoing,
  },
  {
    id: "6",
    link: "/settings",
    icon: Settings,
  },
];

export const RecentChatData = [
  {
    id: "1",
    img: AVATAR_1,
    name: "Nichol",
  },
  {
    id: "2",
    img: AVATAR_2,
    name: "Titus",
  },
  {
    id: "3",
    img: AVATAR_3,
    name: "Geoffrey",
  },
  {
    id: "4",
    img: AVATAR_4,
    name: "Laverty",
  },
  {
    id: "5",
    img: AVATAR_5,
    name: "Kitamura",
  },
  {
    id: "6",
    img: AVATAR_6,
    name: "Mark",
  },
  {
    id: "7",
    img: AVATAR_7,
    name: "Smith",
  },
];

export const chatList = [
  {
    id: 1,
    name: "Mark Villiams",
    avatar: "/home/avatar-01.jpg",
    online: true,
    typing: true,
    pin: true,
    time: "02:40 PM",
    unreadCount: 12,
  },
  {
    id: 2,
    name: "Sarika Jain",
    avatar: "/home/avatar-02.jpg",
    online: true,
    message: "Do you know which...",
    time: "06:12 AM",
    pin: true,
    delivered: true,
  },
  {
    id: 3,
    name: "Clyde Smith",
    avatar: "/home/avatar-03.jpg",
    online: true,
    message: "Haha oh man 🔥",
    time: "03:15 AM",
    pin: true,
    unreadCount: 55,
  },
  {
    id: 4,
    name: "Amfr_boys_Group",
    avatar: "/home/avatar-04.jpg",
    initials: "AG",
    bgColor: "bg-pink",
    message: "Photo",
    icon: Image,
    time: "Yesterday",
    unreadCount: 5,
  },
  {
    id: 5,
    name: "Carla Jenkins",
    avatar: "/home/avatar-15.jpg",
    online: true,
    message: "Incoming Video Call",
    messageColor: "text-success",
    icon: Video,
    time: "Sunday",
  },
  {
    id: 6,
    name: "Federico Wells",
    avatar: "/home/avatar-05.jpg",
    online: true,
    message: "Photo",
    icon: Image,
    time: "Wednesday",
    pin: true,
    unreadCount: 12,
  },
  {
    id: 7,
    name: "Edward Lietz",
    avatar: "/home/avatar-06.jpg",
    online: true,
    message: "Document",
    icon: File,
    time: "02:40 PM",
  },
  {
    id: 8,
    name: "Gustov_family",
    avatar: "/home/avatar-14.jpg",
    initials: "GU",
    bgColor: "bg-skyblue",
    message: "Please Check @rev",
    tagUser: "@rev",
    time: "24 Jul 2024",
    unreadCount: 25,
    favorite: true,
  },
  {
    id: 9,
    name: "Estell Gibson",
    avatar: "/home/avatar-07.jpg",
    online: true,
    message: "Missed Video Call",
    messageColor: "text-danger",
    icon: VideoOff,
    time: "02:40 PM",
    favorite: true,
  },
  {
    id: 10,
    name: "Sharon Ford",
    avatar: "/home/avatar-08.jpg",
    online: true,
    message: "Hi How are you 🔥",
    time: "02:40 PM",
    unreadCount: 25,
  },
  {
    id: 11,
    name: "Thomas Rethman",
    avatar: "/home/avatar-09.jpg",
    online: true,
    message: "Do you know which...",
    time: "02:40 PM",
    favorite: true,
  },
  {
    id: 12,
    name: "Wilbur Martinez",
    avatar: "/home/avatar-10.jpg",
    online: true,
    message: "Haha oh man 🔥",
    time: "02:40 PM",
    delivered: true,
    pinned: true,
  },
  {
    id: 13,
    name: "Danielle Baker",
    avatar: "/home/avatar-11.jpg",
    online: true,
    message: "Location",
    icon: MapPin,
    time: "02:40 PM",
    delivered: true,
  },
  {
    id: 14,
    name: "Morkel Jerrin",
    avatar: "/home/avatar-13.jpg",
    online: true,
    message: "Video",
    icon: Video,
    time: "02:40 PM",
    unreadCount: 25,
    favorite: true,
  },
];

export const newChatData = [
  {
    id: "1",
    img: AVATAR_3,
    name: "Aaryian Jose",
    work: "App Developer",
  },
  {
    id: "2",
    img: AVATAR_4,
    name: "Laverty",
    work: "UI/UX Designer",
  },
  {
    id: "3",
    img: AVATAR_5,
    name: "Clyde Smith",
    work: "Web Developer",
  },
  {
    id: "4",
    img: AVATAR_6,
    name: "Carla Jenkins",
    work: "Business Analyst",
  },
];
