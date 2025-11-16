import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Task, TaskStatus } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
  onStatusChange: (status: TaskStatus) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onPress, onDelete, onStatusChange }) => {
  const getStatusColor = () => {
    switch (task.status) {
      case 'concluida': return '#4CAF50';
      case 'em_andamento': return '#FF9800';
      case 'pendente': return '#9E9E9E';
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'concluida': return 'Concluída';
      case 'em_andamento': return 'Em Andamento';
      case 'pendente': return 'Pendente';
    }
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'alta': return '#F44336';
      case 'media': return '#FF9800';
      case 'baixa': return '#2196F3';
    }
  };

  const getNextStatus = (): TaskStatus => {
    switch (task.status) {
      case 'pendente': return 'em_andamento';
      case 'em_andamento': return 'concluida';
      case 'concluida': return 'pendente';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.priorityBar, { backgroundColor: getPriorityColor() }]} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="trash-outline" size={20} color="#F44336" />
          </TouchableOpacity>
        </View>

        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}
            onPress={() => onStatusChange(getNextStatus())}
          >
            <Text style={styles.statusText}>{getStatusText()}</Text>
          </TouchableOpacity>
          
          <Text style={styles.date}>
            {new Date(task.createdAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  priorityBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});

