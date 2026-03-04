import Header from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"

import { db } from "./_lib/prisma"
import BarbershopItem from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item"
import Search from "./_components/search"

const Home = async () => {
  //chamar banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  return (
    <div>
      {/*header */}
      <Header />
      <div className="p-5">
        <h2 className="text-xl font-bold">Ola, Gabriel</h2>
        <p>Segunda-feira, 2 de marco</p>

        {/*BUSCA*/}
        <div className="mt-6">
          <Search />
        </div>
        {/*BUSCA RAPIDA*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
            <Button className="gap-2" variant="secondary" key={option.title}>
              <Image
                alt={option.title}
                src={option.imageUrl}
                width={16}
                height={16}
              />
              {option.title}
            </Button>
          ))}
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
        <BookingItem />
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
    </div>
  )
}
export default Home
