import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { StatCard } from '../components/StatCard';
import { ProgressBar } from '../components/ProgressBar';
import { storageService } from '../services/storageService';
import { TaskStatistics } from '../types/Task';

export const DashboardScreen = ({ navigation }: any) => {
  const [stats, setStats] = useState<TaskStatistics>({
    total: 0,
    pendentes: 0,
    emAndamento: 0,
    concluidas: 0,
    porcentagemConcluidas: 0,
    tarefasHoje: 0,
    tarefasSemana: 0,
  });
  const [refreshing, setRefreshing] = useState(false);

  const loadStatistics = async () => {
    const statistics = await storageService.getStatistics();
    setStats(statistics);
  };

  useFocusEffect(
    useCallback(() => {
      loadStatistics();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStatistics();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá! 👋</Text>
          <Text style={styles.subtitle}>Dashboard de Produtividade</Text>
        </View>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
        >
          <Ionicons name="add" size={28} color="#FFF" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Visão Geral */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Visão Geral</Text>
          
          <View style={styles.overviewCard}>
            <Text style={styles.overviewTitle}>Taxa de Conclusão</Text>
            <ProgressBar progress={stats.porcentagemConcluidas} height={12} />
            <Text style={styles.overviewSubtitle}>
              {stats.concluidas} de {stats.total} tarefas concluídas
            </Text>
          </View>
        </View>

        {/* Estatísticas por Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status das Tarefas</Text>
          
          <StatCard
            title="Tarefas Pendentes"
            value={stats.pendentes}
            icon="time-outline"
            color="#9E9E9E"
          />
          
          <StatCard
            title="Em Andamento"
            value={stats.emAndamento}
            icon="play-circle-outline"
            color="#FF9800"
          />
          
          <StatCard
            title="Concluídas"
            value={stats.concluidas}
            icon="checkmark-circle-outline"
            color="#4CAF50"
          />
        </View>

        {/* Atividade Recente */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          
          <StatCard
            title="Tarefas Hoje"
            value={stats.tarefasHoje}
            icon="today-outline"
            color="#2196F3"
            subtitle="Criadas hoje"
          />
          
          <StatCard
            title="Tarefas esta Semana"
            value={stats.tarefasSemana}
            icon="calendar-outline"
            color="#9C27B0"
            subtitle="Últimos 7 dias"
          />
        </View>

        {/* Ações Rápidas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
              onPress={() => navigation.navigate('TaskList')}
            >
              <Ionicons name="list-outline" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Ver Tarefas</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#2196F3' }]}
              onPress={() => navigation.navigate('Statistics')}
            >
              <Ionicons name="stats-chart-outline" size={24} color="#FFF" />
              <Text style={styles.actionButtonText}>Estatísticas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    color: '#E3F2FD',
    marginTop: 4,
  },
  addButton: {
    backgroundColor: '#1976D2',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  overviewCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  overviewTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

