import React from 'react'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { CategoryID, Clothes } from '@/types/product'
import { Store } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ItemDetailDialogContent from '@/app/(dashboard)/suggestion/components/ItemDetailDialogContent'

interface ItemDetailDialogProps {
  clothes: Clothes
  categoryID: CategoryID
}

const ItemDetailDialog = ({ clothes, categoryID }: ItemDetailDialogProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.stopPropagation()
        }}
        className='absolute top-1 right-1 z-20 hidden group-hover:flex'
      >
        <Button className='p-0 w-6 h-6 rounded-full bg-primary'>
          <Store size={16} color='#fff' />
        </Button>
      </DialogTrigger>

      {isOpen && (
        <ItemDetailDialogContent categoryID={categoryID} clothes={clothes} />
      )}
    </Dialog>
  )
}

export default ItemDetailDialog
