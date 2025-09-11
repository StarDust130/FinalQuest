"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  HelpCircle,
  Bug,
  Edit3,
  Image as ImageIcon,
  Sparkles,
  Settings,
  User2,
} from "lucide-react";

const STREAK_COUNT = 3;

const Header = () => {
  const [userName, setUserName] = useState("Learner");
  const [editingName, setEditingName] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>("/av-2.jpg");
  const [profileOpen, setProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState(userName);

  // derive initials from name
  const initials = useMemo(() => {
    const parts = userName.trim().split(/\s+/).filter(Boolean);
    const inits = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "");
    return inits.join("") || "U";
  }, [userName]);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const storedName = localStorage.getItem("userName");
      const storedAvatar = localStorage.getItem("userAvatar");
      if (storedName) {
        setUserName(storedName);
        setNameInput(storedName);
      }
      if (storedAvatar) setAvatarSrc(storedAvatar);
    } catch {
      // ignore
    }
  }, []);

  const handleNameSave = () => {
    const next = nameInput.trim();
    if (!next) return;
    setUserName(next);
    try {
      localStorage.setItem("userName", next);
    } catch {
      // ignore
    }
    setEditingName(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev.target?.result as string;
        setAvatarSrc(result);
        try {
          localStorage.setItem("userAvatar", result);
        } catch {
          // ignore
        }
      };
      reader.readAsDataURL(file);
      // reset input so same file can be re-picked
      e.currentTarget.value = "";
    }
  };

  const startEditingName = () => {
    setNameInput(userName);
    setEditingName(true);
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full px-4 md:px-8 py-3 flex items-center justify-between border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      {/* Left: Greeting + Streak (mobile-first) */}
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h1 className="text-base md:text-xl font-semibold truncate">
            Hey, {userName}
          </h1>
          <motion.span
            role="img"
            aria-label="wave"
            className="ml-0.5"
            animate={{ rotate: [0, 14, -6, 14, -4, 10, 0] }}
            transition={{ repeat: 0, duration: 1.2 }}
          >
            👋
          </motion.span>

          {/* Streak pill with emoji (visible on all sizes, optimized for mobile) */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className="ml-2 inline-flex items-center rounded-full border px-2 py-0.5 text-xs leading-none select-none bg-card/50 backdrop-blur-sm hover:bg-accent/40 transition-colors"
                  aria-label={`${STREAK_COUNT}-day streak`}
                >
                  <span aria-hidden>🔥</span>
                  <span className="ml-1 tabular-nums font-medium">
                    {STREAK_COUNT}
                  </span>
                </span>
              </TooltipTrigger>
              <TooltipContent>{STREAK_COUNT}-day streak</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-xs md:text-sm mt-0.5 opacity-80 line-clamp-1">
          It’s a great day to learn something new ✨
        </p>
      </div>

      {/* Right: Actions (avatar always visible; extras hidden on mobile) */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Quick action (md+) */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="New suggestion"
                className="hidden sm:inline-flex h-9 w-9 hover:bg-accent/60 transition-colors"
              >
                <Sparkles className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Surprise me ✨</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Avatar + menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label="Open profile menu"
              className="rounded-full focus:outline-none focus-visible:ring"
            >
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage src={avatarSrc} alt="User avatar" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex items-center gap-2">
              <User2 className="h-4 w-4" />
              {userName}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
              <Settings className="h-4 w-4 mr-2" />
              Profile & Settings
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={startEditingName}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Display Name
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <label
                htmlFor="avatar-upload-menu"
                className="w-full flex items-center cursor-pointer"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Change Avatar
                <input
                  id="avatar-upload-menu"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={handleAvatarChange}
                />
              </label>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => alert("How can we help?")}>
              <HelpCircle className="h-4 w-4 mr-2" />
              Help
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => alert("Report submitted!")}>
              <Bug className="h-4 w-4 mr-2" />
              Report a Bug
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile dialog */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Profile</DialogTitle>
              <DialogDescription>Manage how you appear.</DialogDescription>
            </DialogHeader>

            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={avatarSrc} alt="User avatar" />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </div>

              <div className="grid gap-3 w-full">
                <div className="grid gap-1.5">
                  <Label htmlFor="display-name">Display name</Label>
                  <Input
                    id="display-name"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    onFocus={() => setEditingName(true)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleNameSave();
                      if (e.key === "Escape") {
                        setEditingName(false);
                        setNameInput(userName);
                      }
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-1.5">
                  <Label htmlFor="avatar-upload">Avatar</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <DialogFooter className="gap-2 sm:justify-between">
              <div className="text-xs opacity-70">
                Your info is stored locally on this device.
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setProfileOpen(false);
                    setEditingName(false);
                    setNameInput(userName);
                  }}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleNameSave();
                    setProfileOpen(false);
                  }}
                  disabled={!nameInput.trim() || nameInput.trim() === userName}
                >
                  Save
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </motion.header>
  );
};

export default Header;
