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

// Define o tipo das props da página.
// No Next 15+, `params` é uma Promise.
interface PageProps {
  params: Promise<{ id: string }>
}

// Server Component assíncrono.
// Como estamos no App Router, páginas já são Server Components por padrão.
const BarbershopPage = async ({ params }: PageProps) => {
  // Aqui resolvemos a Promise de params.
  // Sem isso, `id` seria undefined.
  const { id } = await params

  // Busca no banco UMA barbearia pelo ID.
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: id,
    },
    include: {
      services: true, // Inclui os serviços relacionados à barbearia
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div className="div">
      {/*IMAGEM*/}
      <div className="relative h-[250px] w-full">
        <Image
          fill
          alt={barbershop?.name || "Barbershop"}
          className="rounded-2xl object-cover"
          src={barbershop?.imageUrl || ""}
        />
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              className="absolute top-4 right-4"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <Sidebar />
        </Sheet>
      </div>
      {/*Titulo*/}
      <div className="border-b border-solid p-5">
        <h1 className="mb-4 text-xl font-bold">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-1">
          <MapPin className="text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">4,8 (174 avaliacoes)</p>
        </div>
      </div>
      {/*Desc*/}
      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre </h2>
        <p className="text-justify text-sm">{barbershop?.description}</p>
      </div>
      {/*Serviços*/}
      <div className="border-b border-solid p-5">
        <h2 className="mb-3 text-xs font-bold text-gray-400 uppercase">
          Servicos{" "}
        </h2>
        <div className="space-y-3">
          {barbershop?.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>
      <div className="space-y-3 p-5">
        {barbershop?.phones.map((phone) => (
          <PhoneItem key={phone} phone={phone} />
        ))}
      </div>
    </div>
  )
}

// Exporta a página para que o Next reconheça como rota
export default BarbershopPage
