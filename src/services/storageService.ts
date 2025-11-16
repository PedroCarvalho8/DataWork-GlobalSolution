import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatistics } from '../types/Task';

const TASKS_KEY = '@datawork:tasks';

export const storageService = {
  // Salvar todas as tarefas
  async saveTasks(tasks: Task[]): Promise<void> {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Erro ao salvar tarefas:', error);
      throw error;
    }
  },

  // Carregar todas as tarefas
  async loadTasks(): Promise<Task[]> {
    try {
      const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
      return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      return [];
    }
  },

  // Adicionar nova tarefa
  async addTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    try {
      const tasks = await this.loadTasks();
      const newTask: Task = {
        ...task,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      tasks.push(newTask);
      await this.saveTasks(tasks);
      return newTask;
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      throw error;
    }
  },

  // Atualizar tarefa existente
  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    try {
      const tasks = await this.loadTasks();
      const taskIndex = tasks.findIndex(t => t.id === taskId);
      
      if (taskIndex === -1) {
        return null;
      }

      const updatedTask: Task = {
        ...tasks[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      // Se a tarefa foi concluída, adicionar data de conclusão
      if (updates.status === 'concluida' && !updatedTask.completedAt) {
        updatedTask.completedAt = new Date().toISOString();
      }

      tasks[taskIndex] = updatedTask;
      await this.saveTasks(tasks);
      return updatedTask;
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Deletar tarefa
  async deleteTask(taskId: string): Promise<boolean> {
    try {
      const tasks = await this.loadTasks();
      const filteredTasks = tasks.filter(t => t.id !== taskId);
      
      if (filteredTasks.length === tasks.length) {
        return false;
      }

      await this.saveTasks(filteredTasks);
      return true;
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  },

  // Obter estatísticas
  async getStatistics(): Promise<TaskStatistics> {
    try {
      const tasks = await this.loadTasks();
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      const pendentes = tasks.filter(t => t.status === 'pendente').length;
      const emAndamento = tasks.filter(t => t.status === 'em_andamento').length;
      const concluidas = tasks.filter(t => t.status === 'concluida').length;
      const total = tasks.length;

      const tarefasHoje = tasks.filter(t => 
        new Date(t.createdAt) >= startOfDay
      ).length;

      const tarefasSemana = tasks.filter(t => 
        new Date(t.createdAt) >= startOfWeek
      ).length;

      return {
        total,
        pendentes,
        emAndamento,
        concluidas,
        porcentagemConcluidas: total > 0 ? Math.round((concluidas / total) * 100) : 0,
        tarefasHoje,
        tarefasSemana,
      };
    } catch (error) {
      console.error('Erro ao calcular estatísticas:', error);
      return {
        total: 0,
        pendentes: 0,
        emAndamento: 0,
        concluidas: 0,
        porcentagemConcluidas: 0,
        tarefasHoje: 0,
        tarefasSemana: 0,
      };
    }
  },

  // Limpar todos os dados
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
      throw error;
    }
  },
};

