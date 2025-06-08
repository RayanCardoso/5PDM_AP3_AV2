import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, orderBy, limit, getDocs, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../FirebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

export default function Ranking() {
  const [topUsers, setTopUsers] = useState([]);
  const [topColleges, setTopColleges] = useState([]);
  const [userPoints, setUserPoints] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRanking = async () => {
    try {
      // 1. Pegar top 3 usuários por pontuação
      const q = query(collection(db, 'Users'), orderBy('points', 'desc'), limit(3));
      const snapshot = await getDocs(q);

      const topList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      const snapshotCollege = await getDocs(collection(db, 'Users'));
      const users = snapshotCollege.docs.map(doc => doc.data());

      // Agrupar por faculdade e somar pontos
      const collegePoints = {};

      users.forEach(({ college, points = 0 }) => {
        if (!collegePoints[college]) {
          collegePoints[college] = 0;
        }
        collegePoints[college] += points;
      });

      console.log("collegePoints", collegePoints)

      // Transformar em array e ordenar
      const topColleges = Object.entries(collegePoints)
        .map(([college, totalPoints]) => ({ name: college, points: totalPoints }))
        .sort((a, b) => b.points - a.points)
        .slice(0, 3); // pegar top 3

      console.log("topColleges", topColleges)


      setTopUsers(topList);
      setTopColleges(topColleges);

      // 2. Pegar pontos do usuário atual
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(db, 'Users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserPoints(userDoc.data().points || 0);
        } else {
          setUserPoints(0);
        }
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar ranking:', error);
    }
  };

  useFocusEffect(
      useCallback(() => {
          fetchRanking();
      }, [])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 50 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInformations}>
        <Text style={styles.title}>🏆 Top 3 Ranking de Estudantes</Text>
        {topUsers.map((user, index) => (
          <View key={user.id} style={styles.item}>
            <Text style={styles.position}>#{index + 1}</Text>
            <Text style={styles.name}>{user.name || 'Usuário'} ({user.college})</Text>
            <Text style={styles.points}>{user.points} pts</Text>
          </View>
        ))}
      </View>
      <View style={styles.containerInformations}>
        <Text style={styles.title}>🏫 Top 3 Faculdades</Text>
        {topColleges.map((college, index) => (
          <View key={college.id} style={styles.item}>
            <Text style={styles.position}>#{index + 1}</Text>
            <Text style={styles.name}>{college.name || 'Sem nome'}</Text>
            <Text style={styles.points}>{college.points} pts</Text>
          </View>
        ))}
      </View>
      <View style={styles.containerInformations}>
        <Text style={styles.title}>🎯 Seus Pontos</Text>
        <Text style={styles.yourPoints}>{userPoints} pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  containerInformations: {
    padding: 25,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  position: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  name: {
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  points: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 25,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  yourPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 10,
  },
});
