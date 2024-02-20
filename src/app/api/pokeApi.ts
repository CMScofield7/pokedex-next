import axios from 'axios';

export const fetchPokemonList = async (url: string) => {
  try {
    const response = await axios.get(url);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching pokemon list:', error);
  }
};

export const fetchPokemonDetails = async (url: string) => {
  try {
    const response = await axios.get(url);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching pokemon details:', error);
  }
};
