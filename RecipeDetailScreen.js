import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.ImageUrl }} style={styles.recipeImageDetail} />
      <Text style={styles.title}>{recipe.RecipeName}</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Ingredients:</Text>
        <Text style={styles.detailText}>{formatIngredients(recipe.Ingredients)}</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Instructions:</Text>
        <Text style={styles.detailText}>{formatText(recipe.Instructions)}</Text>
      </View>
    </ScrollView>
  );
};

const formatIngredients = (ingredients) => {
  if (!ingredients) return ''; // Handle case where ingredients is null or undefined

  // Split the ingredients by comma, trim whitespace, and join with a newline character
  return ingredients.split(',').map(ingredient => ingredient.trim()).join('\n');
};


const formatText = (text) => {
  // Add additional formatting logic if needed
  return text;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    lineHeight: 24,
  },
  recipeImageDetail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
});

export default RecipeDetailScreen;
