import { Medico, Paciente } from './user.interface'

export type Especialidad = {
    id: number
    tipo: string
}

export type TipoDocumento = {
    id: number
    descripcion: string
}

export type Laboratorio = {
    id: number
    descripcion: string
}

export type Farmacia = {
    id: number
    descripcion: string
    laboratorioId: number
}

export type Medicamento = {
    id: number
    medicationKey: string
    notes: string[]
    dosage: string
    frequency: string
    duration: string
}

export type Tratamiento = {
    description: string
    notes: string[]
    startDate: string
    endDate: string
    patient: Paciente
    doctor: Medico
    medications?: Medicamento[]
}

export type Patologia = {
    id: number
    descripcion: string
    especialidadId: number
}

export type Entidad = {
    id: number
    descripcion: string
}

export type Financiador = {
    id: number
    descripcion: string
    personalMedicoId: number
}

export type Evento = {
    id: 1
    type: 'REUNION' | 'CONFERENCIA' | 'CITA' | 'OTRO'
    description: string
    startDatetime: string
    endDateTime: string
    place: string
    patient?: Paciente
    doctor?: Medico
}
