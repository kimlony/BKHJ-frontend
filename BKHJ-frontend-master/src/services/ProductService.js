import axios from "axios";

const API_URL = "/api"; // Use the proxy endpoint

class ProductDataService {
  getProductData = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data.hits.hits.map(hit => hit._source);
    } catch (error) {
      console.error("Error retrieving data:", error);
      return null;
    }
  };

  
};

export default new ProductDataService();