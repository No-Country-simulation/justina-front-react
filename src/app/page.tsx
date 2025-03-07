'use client'
import { userStore } from '@/store/user-store'
import { tokenData } from '@/utils/jwt-decode'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

export default function Home() {
    // esta page va a tener que escuchar cuando exista un user
    // si existe user -> dashboard else -> login
    const { user, loadingStore, token } = userStore()
    const route = useRouter()
    useEffect(() => {
        if (!loadingStore) {
            // valido si cargó el estado global
            if (user && token) {
                const infoUser = tokenData(token)
                if (infoUser.role === 'MEDICO') {
                    route.push('/dashboard')
                } else {
                    route.push('/paciente')
                }
            } else {
                route.push('/login')
            }
        }
    }, [loadingStore])

    return (
        <main className='flex min-h-screen flex-col items-center justify-between p-24'>
            <div className='flex flex-row gap-3 items-center'>
                <AiOutlineLoading className='animate-spin text-3xl' />
                <p className='text-lg'>Cargando</p>
            </div>
        </main>
    )
}
