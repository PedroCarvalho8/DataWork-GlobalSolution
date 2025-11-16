export type TaskStatus = 'pendente' | 'em_andamento' | 'concluida';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'baixa' | 'media' | 'alta';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export interface TaskStatistics {
  total: number;
  pendentes: number;
  emAndamento: number;
  concluidas: number;
  porcentagemConcluidas: number;
  tarefasHoje: number;
  tarefasSemana: number;
}

