import { DropletIcon, EyeIcon, FootprintsIcon, SearchIcon } from "lucide-react"
import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"

const Home = async () => {
  //chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  console.log(barbershops)
  return (
    <div>
      {/*header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Gabriel</h2>
        <p>Segunda-feira, 2 de marco</p>
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faca sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        {/*BUSCA RAPIDA*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          <Button className="gap-2" variant="secondary">
            <Image
              alt="Corte de cabelo"
              src="/cabelo.svg"
              width={16}
              height={16}
            />
            Cabelo
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              alt="Corte de cabelo"
              src="/barba.svg"
              width={16}
              height={16}
            />
            Barba
          </Button>

          <Button className="gap-2" variant="secondary">
            <Image
              alt="Corte de cabelo"
              src="/acabamento.svg"
              width={16}
              height={16}
            />
            Acabamento
          </Button>

          <Button className="gap-2" variant="secondary">
            <FootprintsIcon className="h-4 w-4" />
            Pezinho
          </Button>

          <Button className="gap-2" variant="secondary">
            <EyeIcon />
            Sobrancelha
          </Button>

          <Button className="gap-2" variant="secondary">
            <DropletIcon />
            Hidratacao
          </Button>
        </div>
        {/*IMAGEM*/}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="banner"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/*AGENDAMENTO*/}
        <h2 className="pt-4 pb-4 text-xs font-bold text-gray-400 uppercase">
          Agendamentos
        </h2>
        <Card>
          <CardContent className="flex justify-between p-0">
            {/*ESQUERDA*/}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="text-lg font-bold">Corte de cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Barbeiro</p>
              </div>
            </div>
            {/*DIREITA*/}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
        <h2 className="pt-4 pb-4 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>
        <div className="py-6] flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className="pt-4 pb-4 text-xs font-bold text-gray-400 uppercase">
          Polulares
        </h2>
        <div className="py-6] flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
      <footer>
        <Card>
          <CardContent>
            <p className="px-5 py-6 text-sm text-gray-400">
              2026 Copyright Full Barber
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}
export default Home
