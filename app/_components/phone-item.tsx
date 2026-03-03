"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

// Função para copiar o número de telefone para a área de transferência
const handleCopyPhone = (phone: string) => {
  navigator.clipboard.writeText(phone)
  toast.success("Número copiado para a área de transferência!")
}

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  return (
    <div className="flex justify-between" key={phone}>
      <div className="flex items-center gap-2">
        <SmartphoneIcon className="text-primary" size={18} />
        <p className="ml-2 text-sm">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleCopyPhone(phone)}
      >
        Copiar
      </Button>
    </div>
  )
}

export default PhoneItem
