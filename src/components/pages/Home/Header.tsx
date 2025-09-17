"use client";

import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
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
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  User2,
  Image as ImageIcon,
  HelpCircle,
  Bug,
  Lightbulb,
} from "lucide-react";
import ModeToggle from "@/components/ModeToggle";

const STREAK_COUNT = 4;

const Header = () => {
  const [userName, setUserName] = useState("Learner");
  const [avatarSrc, setAvatarSrc] = useState<string | undefined>("/av-2.jpg");
  const [profileOpen, setProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState("Learner");
  const [tempAvatarSrc, setTempAvatarSrc] = useState<string | undefined>("/av-2.jpg");
  const [waveCycle, setWaveCycle] = useState(true);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const avatarMenuInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const storedName = localStorage.getItem("userName");
      if (storedName) setUserName(storedName);
      const storedAvatar = localStorage.getItem("userAvatar");
      if (storedAvatar) setAvatarSrc(storedAvatar);
    } catch {}
  }, []);

  const initials = useMemo(() => {
    const p = userName.trim().split(/\s+/).filter(Boolean);
    return p.slice(0, 2).map(x => x[0]?.toUpperCase() || "").join("") || "U";
  }, [userName]);

  const handleNameSave = useCallback(() => {
    const next = nameInput.trim();
    const nameChanged = next && next !== userName;
    
    if (nameChanged) {
      setUserName(next);
      try {
        localStorage.setItem("userName", next);
      } catch {}
    }

    if (avatarChanged && tempAvatarSrc) {
      setAvatarSrc(tempAvatarSrc);
      try {
        localStorage.setItem("userAvatar", tempAvatarSrc);
      } catch {}
      setAvatarChanged(false);
    }
  }, [nameInput, userName, avatarChanged, tempAvatarSrc]);

  const downscaleImage = useCallback(
    async (file: File, max = 512, quality = 0.85): Promise<string> => {
      const blobUrl = URL.createObjectURL(file);
      const img = await new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = blobUrl;
      });
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("No ctx");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const webp = canvas.toDataURL("image/webp");
      const okWebp = webp.startsWith("data:image/webp");
      const data = okWebp ? webp : canvas.toDataURL("image/jpeg", quality);
      URL.revokeObjectURL(blobUrl);
      return data;
    },
    []
  );

  const handleAvatarChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 5 * 1024 * 1024) {
        alert("Choose an image under 5MB.");
        e.currentTarget.value = "";
        return;
      }
      try {
        const dataUrl = await downscaleImage(file);
        if (profileOpen) {
          setTempAvatarSrc(dataUrl);
          setAvatarChanged(true);
        } else {
          setAvatarSrc(dataUrl);
          try {
            localStorage.setItem("userAvatar", dataUrl);
          } catch {}
        }
      } catch {
        alert("Avatar load failed.");
      } finally {
        e.currentTarget.value = "";
      }
    },
    [downscaleImage, profileOpen]
  );

  useEffect(() => {
    if (profileOpen) {
      setTempAvatarSrc(avatarSrc);
      setNameInput(userName);
      setAvatarChanged(false);
    }
  }, [profileOpen, avatarSrc, userName]);

  const nameIsChanged = nameInput.trim() && nameInput.trim() !== userName;
  const capitalizeFirstWord = (str: string): string => {
    if (!str) return str;
    return str.replace(/^\w/, (char) => char.toUpperCase());
  };
  const userNameCapitalized = capitalizeFirstWord(userName);

  return (
    <header className="w-full px-3 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/55">
      <div className="h-14 sm:h-16 flex items-center justify-between">
        {/* Left: Greeting */}
        <div className="flex items-center gap-3 md:ml-20">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight truncate">
            <span className="bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              Hey, {userNameCapitalized}
            </span>
          </h1>
          {!prefersReducedMotion && (
            <motion.span
              role="img"
              aria-label="wave"
              className="text-2xl select-none origin-bottom-right"
              animate={
                waveCycle
                  ? { rotate: [0, 14, -6, 14, -4, 10, 0] }
                  : { rotate: 0 }
              }
              transition={{ duration: 1.1 }}
              onAnimationComplete={() => setWaveCycle(false)}
            >
              👋
            </motion.span>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="cursor-pointer hidden md:block">
            <ModeToggle />
          </span>
          {/* Streak */}
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("streak")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                document
                  .getElementById("streak")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            aria-label={`${STREAK_COUNT} day streak – jump to streak section`}
            title={`${STREAK_COUNT} day streak`}
            className="group inline-flex items-center gap-1.5 rounded-full border-2 border-black dark:border-none  bg-orange-100 dark:bg-orange-900/60 px-2 py-0.5 cursor-pointer select-none text-xs font-semibold text-orange-600 dark:text-orange-300 shadow-[3px_3px_0_0_#000]  active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_0_#000]  transition-all"
          >
            <span
              role="img"
              aria-hidden="true"
              className="text-sm drop-shadow-[1px_1px_0_#fff]"
            >
              🔥
            </span>
            <span className="tabular-nums">{STREAK_COUNT}</span>
          </button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Open profile menu"
                className="rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 ring-offset-2 ring-offset-background transition hover:shadow-lg ring-primary/50"
              >
                <Avatar className="h-11 w-11 sm:h-12 sm:w-12 ring-2 ring-border">
                  <AvatarImage
                    src={avatarSrc}
                    alt="User avatar"
                    onError={() => setAvatarSrc(undefined)}
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 rounded-xl shadow-lg border-border/50"
            >
              <DropdownMenuLabel className="flex items-center justify-start gap-3">
                <User2 className="h-4 w-4" />
                {userNameCapitalized}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setProfileOpen(true)}>
                <Settings className="h-4 w-4 mr-2" />
                Profile & Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  avatarMenuInputRef.current?.click();
                }}
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Change Avatar
              </DropdownMenuItem>
              <input
                ref={avatarMenuInputRef}
                id="avatar-upload-menu"
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={handleAvatarChange}
              />
              <DropdownMenuItem className=" md:hidden">
                <ModeToggle variant="text" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onSelect={() => {
                  const msg =
                    "🙋‍♂️ Hey! I'm using your app and need some help with: ";
                  window.open(
                    `https://wa.me/919302903537?text=${encodeURIComponent(
                      msg
                    )}`,
                    "_blank"
                  );
                }}
              >
                <HelpCircle className="h-4 w-4 mr-2" />
                Need Help
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  const msg = "💡 Feature request: ";
                  window.open(
                    `https://wa.me/919302903537?text=${encodeURIComponent(
                      msg
                    )}`,
                    "_blank"
                  );
                }}
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Request a Feature
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={() => {
                  const msg = "🐞 I found a bug: ";
                  window.open(
                    `https://wa.me/919302903537?text=${encodeURIComponent(
                      msg
                    )}`,
                    "_blank"
                  );
                }}
              >
                <Bug className="h-4 w-4 mr-2" />
                Report a Bug
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profile</DialogTitle>
            <DialogDescription>Manage how you appear.</DialogDescription>
          </DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-1 ring-border">
              <AvatarImage
                src={tempAvatarSrc}
                alt="User avatar"
                onError={() => setTempAvatarSrc(undefined)}
              />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="grid gap-4 w-full">
              <div className="grid gap-1.5">
                <Label htmlFor="display-name">Display name</Label>
                <Input
                  id="display-name"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (nameIsChanged || avatarChanged)) {
                      handleNameSave();
                      setProfileOpen(false);
                    }
                    if (e.key === "Escape") {
                      setNameInput(userName);
                    }
                  }}
                  placeholder="Your name"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="avatar-upload">Avatar</Label>
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </div>
            </div>
          </div>
          <Separator />
          <DialogFooter className="gap-2 sm:justify-between">
            <div className="flex gap-2 w-full justify-end">
              <Button
                variant="ghost"
                onClick={() => {
                  setProfileOpen(false);
                }}
              >
                Close
              </Button>
              <Button
                disabled={!nameIsChanged && !avatarChanged}
                onClick={() => {
                  handleNameSave();
                  setProfileOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
