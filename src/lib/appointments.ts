export interface Appointment {
  code: string
  date: Date
  room: string
}

const STORAGE_KEY = "prophetic_room_appointments"

// Horários disponíveis (9h às 18h, intervalos de 30 minutos)
const generateTimeSlots = () => {
  const slots: Date[] = []
  const startDate = new Date()
  startDate.setHours(9, 0, 0, 0)

  // Gerar slots para os próximos 30 dias
  for (let day = 0; day < 30; day++) {
    const currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() + day)

    // Pular finais de semana
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      continue
    }

    // Gerar horários do dia (9h às 18h, intervalos de 30 min)
    for (let hour = 9; hour < 18; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const slot = new Date(currentDate)
        slot.setHours(hour, minute, 0, 0)
        slots.push(slot)
      }
    }
  }

  return slots
}

// Função hash simples para gerar índice consistente baseado no código
const hashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

export const getOrCreateAppointment = (code: string): Appointment => {
  // Buscar agendamentos existentes
  const stored = localStorage.getItem(STORAGE_KEY)
  const appointments: Record<string, Appointment> = stored ? JSON.parse(stored) : {}

  // Se o código já existe, retornar o agendamento existente
  if (appointments[code]) {
    return {
      ...appointments[code],
      date: new Date(appointments[code].date),
    }
  }

  // Criar novo agendamento
  const timeSlots = generateTimeSlots()
  const usedSlots = new Set(Object.values(appointments).map((apt) => new Date(apt.date).getTime()))

  // Usar hash do código para gerar um índice consistente
  const hash = hashCode(code)
  let slotIndex = hash % timeSlots.length

  // Encontrar próximo slot disponível
  while (usedSlots.has(timeSlots[slotIndex].getTime())) {
    slotIndex = (slotIndex + 1) % timeSlots.length
  }

  const newAppointment: Appointment = {
    code,
    date: timeSlots[slotIndex],
    room: "Sala Profética",
  }

  // Salvar no localStorage
  appointments[code] = newAppointment
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments))

  return newAppointment
}
