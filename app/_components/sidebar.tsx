"use client"

import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import { Button } from "./ui/button"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import Link from "next/link"
import Image from "next/image"
import { quickSearchOptions } from "../_constants/search"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

const Sidebar = () => {
  const handleGoogleSignIn = async () => {
    // Implementar lógica de autenticação com Google aqui
    await signIn("google")
  }
  const { data: session } = useSession()
  const handleGoogleSignOut = async () => {
    // Implementar lógica de logout aqui
    await signOut()
  }

  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-5">
        {session?.user && (
          <>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={session?.user?.image || undefined}
                ></AvatarImage>
              </Avatar>
              <div>
                <p className="font-bold">{session?.user?.name}</p>
                <p className="text-sm">{session?.user?.email}</p>
              </div>
            </div>
          </>
        )}
        {!session?.user && (
          <>
            <h2 className="text-lg font-bold">Ola, faca seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <LogInIcon size={18} />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <DialogHeader>
                  <DialogTitle>Faca login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google!
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="gap-2 font-bold"
                  onClick={handleGoogleSignIn}
                >
                  <Image
                    alt="Google Logo"
                    src="/google.svg"
                    width={18}
                    height={18}
                  />
                  Entrar com Google
                </Button>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <SheetClose asChild>
          <Button className="justify-start gap-2" asChild variant="ghost">
            <Link href="/">
              <HomeIcon size={18} />
              Home
            </Link>
          </Button>
        </SheetClose>

        <Button className="justify-start gap-2" variant="ghost">
          <CalendarIcon size={18} />
          Agendamentos
        </Button>
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        {quickSearchOptions.map((option) => (
          <SheetClose asChild key={option.title}>
            <Button
              className="justify-start gap-2"
              variant="ghost"
              key={option.title}
            >
              <Link
                href={`/barbershops?service=${option.title}`}
                className="flex items-center gap-2"
              >
                <Image
                  alt={option.title}
                  src={option.imageUrl}
                  width={18}
                  height={18}
                />
                {option.title}
              </Link>
            </Button>
          </SheetClose>
        ))}
      </div>
      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <Button
          className="justify-start gap-2"
          variant="ghost"
          onClick={handleGoogleSignOut}
        >
          <LogOutIcon size={18} />
          Sair
        </Button>
      </div>
    </SheetContent>
  )
}

export default Sidebar
