import React, { useState, useEffect,useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const RecipeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { userId } = useContext(AuthContext); 
  //const [userId, setUserId] = useState(''); 
  //const [recipeId, setRecipeId] = useState(''); // State to store selected recipe ID
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [dietFilter, setDietFilter] = useState('');
  const [totalTimeFilter, setTotalTimeFilter] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  //const isFavorite = favorites.includes(item.RecipeID);
  useEffect(() => {
    fetchRecipes();
  }, []);


  const fetchRecipes = async () => {
        try {
          console.log('Fetching recipes');
          const response = await axios.get('http://192.168.170.3:5000/recipes');
          //console.log('Response:',response.data);
          setRecipes(response.data);
          console.log('Fetched');
          
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  useEffect(() => {
    filterRecipes();
  }, [searchQuery, cuisineFilter, dietFilter, totalTimeFilter, recipes]);

  const filterRecipes = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = recipes.filter((recipe) => {
      const matchesSearch = recipe.RecipeName.toLowerCase().includes(lowerCaseQuery);
      const matchesCuisine = cuisineFilter ? recipe.Cuisine.toLowerCase() === cuisineFilter.toLowerCase() : true;
      const matchesDiet = dietFilter ? recipe.Diet.toLowerCase() === dietFilter.toLowerCase() : true;
      const matchesTotalTime = totalTimeFilter ? recipe.TotalTimeInMins.toString().includes(totalTimeFilter) : true;
      return matchesSearch && matchesCuisine && matchesDiet && matchesTotalTime;
    });
    setFilteredRecipes(filtered);
  };
  const addToFavorites = async (recipeId) => {
    try {
      console.log('UserID:', userId);
    console.log('RecipeID:', recipeId);
      if (!userId || !recipeId) {
        console.error('UserID and RecipeID are required');
        return;
      }
      console.log('Adding recipe to favorites:', recipeId);
      // Make a POST request to add the recipe to favorites
      const response = await axios.post('http://192.168.167.3:5000/add-to-favorites', {
        userId,
        recipeId
      });
      console.log('Add to favorites response:', response.data);
      window.alert('Success:Recipe added to favorites');
      // Optionally, you can provide feedback to the user indicating that the recipe has been added to favorites
    } catch (error) {
      console.error('Error adding recipe to favorites:', error);
      window.alert('Error:Failed to add recipe to favorites. Please try again later.');
    }
  };
  // Example function to handle selecting a recipe
  // const handleRecipeSelect = (selectedRecipeId) => {
  //   setRecipeId(selectedRecipeId); // Set the selected recipe ID
  // };

  // // Example function to handle retrieving user ID (could be from state, context, etc.)
  // const retrieveUserId = () => {
  //   // Example: Retrieve user ID from state or context
  //   const user = { id: '123' }; // Example user object
  //   setUserId(user.id);
  // };

  // // Example usage of retrieveUserId function (call it when component mounts or when user logs in)
  // useEffect(() => {
  //   retrieveUserId();
  // }, []);


  
  const renderItem = ({ item }) => {
    //const imageHeight = 0.8 * (Dimensions.get('window').width / 2);
    const imageHeight = 0.8 * (Dimensions.get('window').width / 2);
    return (
      <TouchableOpacity
        style={styles.recipeItem}
        onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
      >
        <Image source={{ uri: item.ImageUrl }} style={{ ...styles.recipeImage, height: imageHeight }} resizeMode="cover" />
        <View style={styles.recipeDetails}>
          <Text style={styles.recipeName}>{item.RecipeName}</Text>
          <Text style={styles.cuisine}>{item.Cuisine}</Text>
          <Text style={styles.diet}>{item.Diet}</Text>
          <Text style={styles.totalTime}>Total Time: {item.TotalTimeInMins} mins</Text>
        
          
     
      {/* Example: Button to add selected recipe to favorites */}
      {/* <TouchableOpacity onPress={()=>addToFavorites(item.RecipeID)}>
            <Text>Add to Favorites</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity onPress={() => addToFavorites(item.RecipeID)}>
        <Text style={styles.addToFavorites}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity> */}

        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Recipes..."
        onChangeText={(text) => setSearchQuery(text)}
        testID="search-input"
      />
      <View style={styles.filtersContainer}>
        <TextInput
          style={styles.filterInput}
          placeholder="Cuisine"
          value={cuisineFilter}
          onChangeText={(text) => setCuisineFilter(text)}
          testID="cuisine-filter" 
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Diet"
          value={dietFilter}
          onChangeText={(text) => setDietFilter(text)}
          testID="diet-filter"
        />
        <TextInput
          style={styles.filterInput}
          placeholder="Time(mins)"
          value={totalTimeFilter}
          onChangeText={(text) => setTotalTimeFilter(text)}
          keyboardType="numeric"
          testID="total-time-filter" 
        />
      </View>
      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.Srno.toString()}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  recipeItem: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  recipeImage: {
    width: '100%',
  },
  recipeDetails: {
    flex: 1,
    padding: 10,
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cuisine: {
    color: '#777',
    marginBottom: 4,
  },
  diet: {
    color: 'green',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  totalTime: {
    color: 'blue',
    fontWeight: 'bold',
  },
  filtersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: '#fff',
  },
  addToFavorites: {
    color: 'red',
    marginTop: 8,
  },
});

export default RecipeScreen;
