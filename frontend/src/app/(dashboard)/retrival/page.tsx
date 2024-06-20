import Header from '@/app/(dashboard)/components/Header'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CircleHelp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import ImageUploadForm from '@/app/(dashboard)/retrival/components/ImageUploadForm'

const RetrivalPage = () => {
  return (
    <div className='w-full h-full pt-6 px-10'>
      <Header
        title='Fashion Finder'
        description='Discover your ideal outfit instantly with image or text-based search.'
        icon={'Search'}
      />

      <Tabs defaultValue='image' className='w-[400px]'>
        <TabsList className='w-full flex p-0 shrink-0 border mb-4 px-1'>
          <TabsTrigger
            value='image'
            className='flex-1 data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            By Image
          </TabsTrigger>
          <TabsTrigger
            value='text'
            className='flex-1 data-[state=active]:bg-primary data-[state=active]:text-white'
          >
            By Text
          </TabsTrigger>
        </TabsList>
        <TabsContent value='image'>
          <ImageUploadForm />
        </TabsContent>
        <TabsContent value='text'>
          <div className='flex flex-col gap-4'>
            <Textarea
              placeholder='Describe the product you are looking for'
              className='min-h-[150px] border'
            />
            <div className='flex items-center space-x-2'>
              <Checkbox
                id='improve'
                className='w-4 h-4 flex items-center justify-center'
              />
              <label
                htmlFor='improve'
                className='text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer'
              >
                Enhance your text with AI
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CircleHelp size={12} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>We&apos;ll utilize AI to enhance your descriptions</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Button className='w-full'>Submit</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default RetrivalPage
