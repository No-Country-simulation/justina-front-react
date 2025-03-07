'use client'
import { Button, Slider } from '@nextui-org/react'
import Medicamento from '@/components/doctor/form-registrar-medicacion/medicamento'
import Notas from '@/components/doctor/form-registrar-medicacion/notas'
import Frecuencia from '@/components/doctor/form-registrar-medicacion/frecuencia'
import Dosis from '@/components/doctor/form-registrar-medicacion/dosis'
import RegistroExitoso from '@/components/doctor/form-registrar-medicacion/registro-exitoso'
import ResumenMedicacion from '@/components/doctor/form-registrar-medicacion/redumen-medicacion'

import { useState } from 'react'

// import CerrarSesion from '@/components/cerrar-sesion'
export default function RegistrarMedicacion() {
    const [step, setStep] = useState(1)
    const [sliderValue, setSliderValue] = useState(20)
    const handleSiguiente = () => {
        //si eh seleccionado puedo ir a siguiente
        setStep(step + 1)
        setSliderValue(sliderValue + 20)
    }
    return (
        <div className='min-h-screen max-w-md mx-auto p-4 space-y-4 pb-[90px]'>
            <Slider aria-label='Player progress' color='secondary' value={sliderValue} className='max-w-md' />
            {step === 1 && <Medicamento />}
            {step === 2 && <Notas setStep={setStep} />}
            {step === 3 && <Frecuencia setStep={setStep} />}
            {step === 4 && <Dosis setStep={setStep} />}
            {step === 5 && <RegistroExitoso setStep={setStep} setSliderValue={setSliderValue} />}
            {step === 6 && <ResumenMedicacion setStep={setStep} />}
            {step !== 6 && (
                <div className='text-center'>
                    <Button
                        color='secondary'
                        type='button'
                        className={step === 5 ? 'hidden' : 'w-full'}
                        onClick={handleSiguiente}
                    >
                        Siguiente
                    </Button>
                </div>
            )}
        </div>
    )
}
