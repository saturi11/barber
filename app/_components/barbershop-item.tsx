import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[167px] rounded-2xl">
      <CardContent className="p-0 px-2 pt-1">
        {/*IMAGEM*/}
        <div className="relative h-[159px] w-full">
          <Image
            fill
            alt={barbershop.name}
            className="rounded-2xl object-cover"
            src={barbershop.imageUrl}
          />
          <Badge className="absolute top-2 left-2" variant="secondary">
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        {/*TEXTO*/}
        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
        </div>
        <Button variant="secondary" className="asChild mt-3 w-full">
          <Link href={`/barbershops/${barbershop.id}`}>Agendar</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
