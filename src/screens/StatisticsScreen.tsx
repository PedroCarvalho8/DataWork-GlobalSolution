import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl, Dimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { storageService } from '../services/storageService';
import { Task, TaskStatistics } from '../types/Task';

const screenWidth = Dimensions.get('window').width;

export const StatisticsScreen = () => {
  const [stats, setStats] = useState<TaskStatistics>({
    total: 0,
    pendentes: 0,
    emAndamento: 0,
    concluidas: 0,
    porcentagemConcluidas: 0,
    tarefasHoje: 0,
    tarefasSemana: 0,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    const statistics = await storageService.getStatistics();
    const loadedTasks = await storageService.loadTasks();
    setStats(statistics);
    setTasks(loadedTasks);
  };

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const getPriorityStats = () => {
    const alta = tasks.filter(t => t.priority === 'alta').length;
    const media = tasks.filter(t => t.priority === 'media').length;
    const baixa = tasks.filter(t => t.priority === 'baixa').length;
    return { alta, media, baixa };
  };

  const priorityStats = getPriorityStats();

  const renderBarChart = () => {
    const maxValue = Math.max(stats.pendentes, stats.emAndamento, stats.concluidas, 1);
    const chartData = [
      { label: 'Pendentes', value: stats.pendentes, color: '#9E9E9E' },
      { label: 'Em Andamento', value: stats.emAndamento, color: '#FF9800' },
      { label: 'Concluídas', value: stats.concluidas, color: '#4CAF50' },
    ];

    return (
      <View style={styles.chartContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.barItem}>
            <View style={styles.barColumn}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color 
                  }
                ]} 
              >
                <Text style={styles.barValue}>{item.value}</Text>
              </View>
            </View>
            <Text style={styles.barLabel}>{item.label}</Text>
          </View>
        ))}
      </View>
    );
  };

  const renderPriorityChart = () => {
    const total = priorityStats.alta + priorityStats.media + priorityStats.baixa;
    if (total === 0) return null;

    return (
      <View style={styles.priorityContainer}>
        <View style={styles.priorityRow}>
          <View style={styles.priorityItem}>
            <View style={[styles.priorityCircle, { backgroundColor: '#F44336' }]} />
            <Text style={styles.priorityLabel}>Alta: {priorityStats.alta}</Text>
          </View>
          <View style={styles.priorityItem}>
            <View style={[styles.priorityCircle, { backgroundColor: '#FF9800' }]} />
            <Text style={styles.priorityLabel}>Média: {priorityStats.media}</Text>
          </View>
          <View style={styles.priorityItem}>
            <View style={[styles.priorityCircle, { backgroundColor: '#2196F3' }]} />
            <Text style={styles.priorityLabel}>Baixa: {priorityStats.baixa}</Text>
          </View>
        </View>
        
        <View style={styles.progressBarContainer}>
          {priorityStats.alta > 0 && (
            <View 
              style={[
                styles.progressSegment, 
                { flex: priorityStats.alta, backgroundColor: '#F44336' }
              ]} 
            />
          )}
          {priorityStats.media > 0 && (
            <View 
              style={[
                styles.progressSegment, 
                { flex: priorityStats.media, backgroundColor: '#FF9800' }
              ]} 
            />
          )}
          {priorityStats.baixa > 0 && (
            <View 
              style={[
                styles.progressSegment, 
                { flex: priorityStats.baixa, backgroundColor: '#2196F3' }
              ]} 
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="stats-chart" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>Estatísticas</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Card de Resumo */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Resumo Geral</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{stats.total}</Text>
              <Text style={styles.summaryLabel}>Total de Tarefas</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: '#4CAF50' }]}>
                {stats.porcentagemConcluidas}%
              </Text>
              <Text style={styles.summaryLabel}>Concluídas</Text>
            </View>
          </View>
        </View>

        {/* Gráfico de Barras - Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distribuição por Status</Text>
          <View style={styles.card}>
            {stats.total > 0 ? (
              renderBarChart()
            ) : (
              <View style={styles.emptyChart}>
                <Ionicons name="bar-chart-outline" size={48} color="#CCC" />
                <Text style={styles.emptyText}>Nenhuma tarefa para visualizar</Text>
              </View>
            )}
          </View>
        </View>

        {/* Gráfico de Prioridades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Distribuição por Prioridade</Text>
          <View style={styles.card}>
            {stats.total > 0 ? (
              renderPriorityChart()
            ) : (
              <View style={styles.emptyChart}>
                <Ionicons name="flag-outline" size={48} color="#CCC" />
                <Text style={styles.emptyText}>Nenhuma tarefa para visualizar</Text>
              </View>
            )}
          </View>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Insights</Text>
          
          <View style={styles.insightCard}>
            <Ionicons name="trending-up" size={24} color="#2196F3" />
            <View style={styles.insightText}>
              <Text style={styles.insightTitle}>Produtividade Hoje</Text>
              <Text style={styles.insightDescription}>
                Você criou {stats.tarefasHoje} {stats.tarefasHoje === 1 ? 'tarefa' : 'tarefas'} hoje
              </Text>
            </View>
          </View>

          <View style={styles.insightCard}>
            <Ionicons name="calendar" size={24} color="#9C27B0" />
            <View style={styles.insightText}>
              <Text style={styles.insightTitle}>Esta Semana</Text>
              <Text style={styles.insightDescription}>
                {stats.tarefasSemana} {stats.tarefasSemana === 1 ? 'tarefa criada' : 'tarefas criadas'} nos últimos 7 dias
              </Text>
            </View>
          </View>

          {stats.pendentes > 0 && (
            <View style={styles.insightCard}>
              <Ionicons name="alert-circle" size={24} color="#FF9800" />
              <View style={styles.insightText}>
                <Text style={styles.insightTitle}>Atenção</Text>
                <Text style={styles.insightDescription}>
                  Você tem {stats.pendentes} {stats.pendentes === 1 ? 'tarefa pendente' : 'tarefas pendentes'}
                </Text>
              </View>
            </View>
          )}
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
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E0E0E0',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 200,
    paddingTop: 20,
  },
  barItem: {
    alignItems: 'center',
    flex: 1,
  },
  barColumn: {
    height: 150,
    justifyContent: 'flex-end',
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    width: '60%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 8,
    minHeight: 30,
  },
  barValue: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  priorityContainer: {
    gap: 16,
  },
  priorityRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  priorityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  priorityCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  priorityLabel: {
    fontSize: 14,
    color: '#666',
  },
  progressBarContainer: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressSegment: {
    height: '100%',
  },
  emptyChart: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 12,
  },
  insightCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  insightText: {
    flex: 1,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 14,
    color: '#666',
  },
});

