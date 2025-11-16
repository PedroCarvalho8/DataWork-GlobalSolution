import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { storageService } from '../services/storageService';
import { TaskStatus } from '../types/Task';

export const AddTaskScreen = ({ navigation }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [priority, setPriority] = useState<'baixa' | 'media' | 'alta'>('media');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para a tarefa.');
      return;
    }

    setLoading(true);
    try {
      await storageService.addTask({
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
      });

      Alert.alert('Sucesso', 'Tarefa criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a tarefa. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nova Tarefa</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Finalizar relatório trimestral"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* Descrição */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Adicione detalhes sobre a tarefa..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            maxLength={500}
          />
        </View>

        {/* Status */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.optionButton,
                status === 'pendente' && styles.optionButtonActive,
                { borderColor: '#9E9E9E' }
              ]}
              onPress={() => setStatus('pendente')}
            >
              <Ionicons 
                name="time-outline" 
                size={20} 
                color={status === 'pendente' ? '#FFF' : '#9E9E9E'} 
              />
              <Text style={[
                styles.optionText,
                status === 'pendente' && styles.optionTextActive
              ]}>
                Pendente
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                status === 'em_andamento' && styles.optionButtonActive,
                { borderColor: '#FF9800' }
              ]}
              onPress={() => setStatus('em_andamento')}
            >
              <Ionicons 
                name="play-circle-outline" 
                size={20} 
                color={status === 'em_andamento' ? '#FFF' : '#FF9800'} 
              />
              <Text style={[
                styles.optionText,
                status === 'em_andamento' && styles.optionTextActive
              ]}>
                Em Andamento
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.optionButton,
                status === 'concluida' && styles.optionButtonActive,
                { borderColor: '#4CAF50' }
              ]}
              onPress={() => setStatus('concluida')}
            >
              <Ionicons 
                name="checkmark-circle-outline" 
                size={20} 
                color={status === 'concluida' ? '#FFF' : '#4CAF50'} 
              />
              <Text style={[
                styles.optionText,
                status === 'concluida' && styles.optionTextActive
              ]}>
                Concluída
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Prioridade */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Prioridade</Text>
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'baixa' && { backgroundColor: '#2196F3' }
              ]}
              onPress={() => setPriority('baixa')}
            >
              <Text style={[
                styles.priorityText,
                priority === 'baixa' && styles.priorityTextActive
              ]}>
                Baixa
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'media' && { backgroundColor: '#FF9800' }
              ]}
              onPress={() => setPriority('media')}
            >
              <Text style={[
                styles.priorityText,
                priority === 'media' && styles.priorityTextActive
              ]}>
                Média
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.priorityButton,
                priority === 'alta' && { backgroundColor: '#F44336' }
              ]}
              onPress={() => setPriority('alta')}
            >
              <Text style={[
                styles.priorityText,
                priority === 'alta' && styles.priorityTextActive
              ]}>
                Alta
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, loading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={loading}
        >
          <Ionicons name="checkmark" size={24} color="#FFF" />
          <Text style={styles.saveButtonText}>
            {loading ? 'Salvando...' : 'Salvar Tarefa'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  optionButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  optionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginTop: 4,
  },
  optionTextActive: {
    color: '#FFF',
  },
  priorityButton: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityTextActive: {
    color: '#FFF',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

