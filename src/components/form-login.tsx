'use client'
import { Button, Input } from '@nextui-org/react'
import { FiLogIn } from 'react-icons/fi'
import { RiUserAddLine } from 'react-icons/ri'
import ResetPassword from './reset-pasword'
import { userStore } from '@/store/user-store'
import { useRouter } from 'next/navigation'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validations/loginSchema'

import { ImEye } from 'react-icons/im'
import { PiEyeClosed } from 'react-icons/pi'
import { useState } from 'react'
import { medico } from '@/constants/demo-medico'
import { toast } from 'sonner'
import { tokenData } from '@/utils/jwt-decode'

type Inputs = {
    email: string
    password: string
}

export default function LoginForm() {
    // PENDING: handleSubmit, useStates
    const { setUser } = userStore()
    const [isLoading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: zodResolver(loginSchema),
    })

    const route = useRouter()
    const [showPass, setShowPass] = useState(false)

    const submitData = async (data: Inputs) => {
        // info del user viene de la db
        interface LoginResponse {
            accessToken: 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6Ik1FRElDTyJ9LCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoibWVkaWNAdGVzdC5qdXN0aW5hLmlvIiwiaWF0IjoxNzIxNTI1MzQ2LCJleHAiOjE3MjE1Mjg5NDZ9.05hPHYrx5_-_VM4J8L_Go-pZhjYpUTSkH7sbSBnOuKgDKE506Fm_Ybuth6cm7h_SJhDJ9N3gn4O897m1tk7-PQ'
            refreshToken: 'eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjp7ImF1dGhvcml0eSI6Ik1FRElDTyJ9LCJ0eXBlIjoicmVmcmVzaCIsInN1YiI6Im1lZGljQHRlc3QuanVzdGluYS5pbyIsImlhdCI6MTcyMTUyNTM0NiwiZXhwIjoxNzIxNTI4OTQ2fQ.iqqgvO7k8PbMVSJyhoZp3n4hEQtzEzIdJr_R1he2jo6wUuRvWnnEIkNs5PLu3MTsguOOgjIpLEndGXsozYvMiw'
            user: {
                email: 'medic@test.justina.io'
                firstName: null
                lastName: null
                phone: null
                location: null
                role: 'MEDICO'
            }
        }

        const loginResponse = await fetchLogin(data.email, data.password)
        console.log(loginResponse)
        if (!loginResponse) {
            return toast.error('Fallaron las credenciales de acceso', {
                position: 'top-center',
                className: 'bg-red-600 text-white',
                duration: 2000,
            })
        }
        toast.success('Ingreso correcto...', {
            className: 'bg-green-600 text-white',
            position: 'top-center',
            duration: 2000,
        })
        route.push('/dashboard')
    }

    const fetchLogin = async (email: string, password: string) => {
        const urlBack = process.env.NEXT_PUBLIC_URL_BACK
        console.log('probando conexión con backend')

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 5000)

        try {
            setLoading(true)
            const res = await fetch(`${urlBack}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                signal: controller.signal,
            })

            clearTimeout(timeoutId)
            console.log({ status_res: res.status })
            if (res.ok) {
                const data = await res.json()
                console.log({ infoToken: tokenData(data.accessToken) })
                setUser(medico) // [Pendiente] Setear con data cuando se tengan todas las propiedades
                return data
            }
            return null
        } catch (error) {
            console.log(error)
            return null
        } finally {
            setLoading(false)
        }
    }
    return (
        <form className='flex flex-col gap-4' onSubmit={handleSubmit(submitData)}>
            <div className='flex flex-col gap-5'>
                <div>
                    <Input
                        isInvalid={errors.email?.message ? true : false}
                        errorMessage={errors.email?.message}
                        type='email'
                        placeholder='Ingrese email'
                        label='Correo'
                        color='secondary'
                        autoComplete='off'
                        {...register('email')}
                    />
                </div>

                <div>
                    <Input
                        type={showPass ? 'text' : 'password'}
                        placeholder='Ingrese contraseña'
                        label='Contraseña'
                        color='secondary'
                        autoComplete='off'
                        isInvalid={errors.password?.message ? true : false}
                        errorMessage={errors.password?.message}
                        endContent={
                            <button className='focus:outline-none' type='button' onClick={() => setShowPass(!showPass)}>
                                {showPass ? (
                                    <ImEye className='text-2xl text-purple-700 pointer-events-none' />
                                ) : (
                                    <PiEyeClosed className='text-2xl text-purple-700 pointer-events-none' />
                                )}
                            </button>
                        }
                        {...register('password')}
                    />
                </div>
            </div>

            <ResetPassword />

            <div className='flex flex-col gap-3'>
                <Button color='secondary' type='submit' isLoading={isLoading} isDisabled={isLoading}>
                    <FiLogIn className='text-xl' />
                    <p>Ingresar</p>
                </Button>
                <Button color='warning' onClick={() => route.push('/register')}>
                    <RiUserAddLine className='text-xl' />
                    <p>Registrarse</p>
                </Button>
            </div>
        </form>
    )
}
