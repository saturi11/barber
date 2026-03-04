import BarbershopItem from "../_components/barbershop-item"
import Header from "../_components/header"
import Search from "../_components/search"
import { db } from "../_lib/prisma"

interface BarbershopsPageProps {
  searchParams: Promise<{ search: string }>
}

// Server Component assíncrono.
// Como estamos no App Router, páginas já são Server Components por padrão.
const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  // Aqui resolvemos a Promise de params.
  // Sem isso, `id` seria undefined.
  const { search } = await searchParams

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
  })

  return (
    <div>
      <Header />
      <div className="my-6 px-5">
        <Search />
      </div>
      <div className="px-5">
        <h2 className="m6-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          resultados para &quot;{search}&quot;
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BarbershopsPage
