import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: number;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ 
  progress, 
  color = '#4CAF50', 
  height = 10,
  showPercentage = true 
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, { height }]}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${clampedProgress}%`, backgroundColor: color, height }
          ]} 
        />
      </View>
      {showPercentage && (
        <Text style={[styles.percentage, { color }]}>{clampedProgress}%</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    borderRadius: 10,
  },
  percentage: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 12,
    minWidth: 40,
  },
});

