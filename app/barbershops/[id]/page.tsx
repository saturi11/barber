import Image from "next/image"
import { db } from "@/app/_lib/prisma"
import { Button } from "@/app/_components/ui/button"
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ServiceItem from "@/app/_components/serviceItem"
import PhoneItem from "@/app/_components/phone-item"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import Sidebar from "@/app/_components/sidebar"

interface PageProps {
  params: Promise<{ id: string }>
}

const BarbershopPage = async ({ params }: PageProps) => {
  const { id } = await params

  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  const services = barbershop.services.map((service) => ({
    ...service,
    price: Number(service.price),
  }))

  return (
    <div className="pb-10">
      {/* HEADER */}
      <div className="relative h-[260px] w-full">
        <Image
          fill
          src={barbershop.imageUrl}
          alt={barbershop.name}
          className="object-cover"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-black/30" />

        {/* navbar */}
        <div className="absolute top-4 right-4 left-4 flex justify-between">
          <Link href="/">
            <Button size="icon" variant="secondary">
              <ChevronLeftIcon />
            </Button>
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="secondary">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <Sidebar />
          </Sheet>
        </div>
      </div>

      {/* INFO */}
      <div className="space-y-3 border-b p-5">
        <h1 className="text-2xl font-bold">{barbershop.name}</h1>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <MapPin size={16} className="text-primary" />
          {barbershop.address}
        </div>

        <div className="flex items-center gap-2 text-sm">
          <StarIcon size={16} className="fill-primary text-primary" />
          4,8 (174 avaliações)
        </div>
      </div>

      {/* SOBRE */}
      <div className="space-y-3 border-b p-5">
        <h2 className="text-muted-foreground text-xs font-bold uppercase">
          Sobre
        </h2>

        <p className="text-justify text-sm">{barbershop.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="space-y-4 border-b p-5">
        <h2 className="text-muted-foreground text-xs font-bold uppercase">
          Serviços
        </h2>

        <div className="space-y-4">
          {services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>

      {/* TELEFONES */}
      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
