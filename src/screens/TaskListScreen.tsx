import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  Alert,
  RefreshControl
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { TaskCard } from '../components/TaskCard';
import { storageService } from '../services/storageService';
import { Task, TaskStatus } from '../types/Task';

type FilterType = 'todas' | 'pendente' | 'em_andamento' | 'concluida';

export const TaskListScreen = ({ navigation }: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>('todas');
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () => {
    const loadedTasks = await storageService.loadTasks();
    // Ordenar por data de criação (mais recente primeiro)
    const sortedTasks = loadedTasks.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setTasks(sortedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  };

  const handleDeleteTask = (taskId: string, taskTitle: string) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir a tarefa "${taskTitle}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await storageService.deleteTask(taskId);
            loadTasks();
          },
        },
      ]
    );
  };

  const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
    await storageService.updateTask(taskId, { status: newStatus });
    loadTasks();
  };

  const handleTaskPress = (task: Task) => {
    Alert.alert(
      task.title,
      task.description || 'Sem descrição',
      [
        { text: 'OK' }
      ]
    );
  };

  const getFilteredTasks = () => {
    if (filter === 'todas') return tasks;
    return tasks.filter(task => task.status === filter);
  };

  const filteredTasks = getFilteredTasks();

  const renderFilter = (filterType: FilterType, label: string, icon: keyof typeof Ionicons.glyphMap) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.filterButtonActive]}
      onPress={() => setFilter(filterType)}
    >
      <Ionicons 
        name={icon} 
        size={18} 
        color={filter === filterType ? '#FFF' : '#666'} 
      />
      <Text style={[styles.filterText, filter === filterType && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minhas Tarefas</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Filtros */}
      <View style={styles.filtersContainer}>
        {renderFilter('todas', 'Todas', 'apps-outline')}
        {renderFilter('pendente', 'Pendentes', 'time-outline')}
        {renderFilter('em_andamento', 'Em Andamento', 'play-circle-outline')}
        {renderFilter('concluida', 'Concluídas', 'checkmark-circle-outline')}
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => handleTaskPress(item)}
            onDelete={() => handleDeleteTask(item.id, item.title)}
            onStatusChange={(status) => handleStatusChange(item.id, status)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkbox-outline" size={64} color="#CCC" />
            <Text style={styles.emptyText}>
              {filter === 'todas' ? 'Nenhuma tarefa cadastrada' : `Nenhuma tarefa ${filter}`}
            </Text>
            <Text style={styles.emptySubtext}>
              Toque no botão + para criar uma nova tarefa
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#4A90E2',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  addButton: {
    backgroundColor: '#1976D2',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtersContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 8,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterButtonActive: {
    backgroundColor: '#4A90E2',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  filterTextActive: {
    color: '#FFF',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
  },
});

