'use client'

import { Button, Input, Radio, RadioGroup, Select, SelectItem } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'

export default function itemPerfil() {
    const route = useRouter()
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (value: string) => {
        setSelectedValue(value)
        // Do something with the selected value
    }
    return (
        <div className='bg-[url("/img/background.svg")] bg-cover p-4 min-h-screen'>
            <div className='flex items-center justify-center'>
                <IoIosArrowBack className='text-[#9A41CE] flex-none' onClick={() => route.back()} />
                <h1 className='font-bold  flex-auto text-center'>Prepagas</h1>
            </div>
            <div className='m-5 space-y-4'>
                <p>Seleccione su obra social</p>
                <RadioGroup value={selectedValue} onValueChange={handleChange}>
                    <Radio value='Obrasocial1'>Obra social 1</Radio>
                    <Radio value='Obrasocial2'>Obra social 2</Radio>
                    <Radio value='Obrasocial3'>Obra social 3</Radio>
                    <Radio value='Obrasocial4'>Obra social 4</Radio>
                </RadioGroup>
                <div className='text-center'>
                    <Button color='secondary' type='submit' className='w-full'>
                        Guardar
                    </Button>
                </div>
            </div>
        </div>
    )
}
