import express from "express";
const router = express.Router();


const arrOfCountries=[
    {"id":1, "name":"andra prodesh"},
    {"id":2, "name":"himachal"},
    {"id":3, "name":"punjab"},
    {"id":4, "name":"mp"},
    {"id":5, "name":"up"},
    

];

const selectedCountries=[
    {"id":3, "name":"punjab"},
    {"id":4, "name":"mp"},
    {"id":5, "name":"up"},
]
router.get("/countries", (req, res) => {
    try {
     
      res.json({
        message: "Getting all countries list",
        data: arrOfCountries,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });

    router.post("/selectedcountries", (req, res) => {
        try {
          const { cities } = req.body; 
      
          if (!cities || !Array.isArray(cities)) {
            return res.status(400).json({
              error: "Invalid input. 'cities' should be an array of city names.",
            });
          }
      
         
          const filteredCountries = selectedCountries.filter((country) =>
            cities.includes(country.name.toLowerCase())
          );
      
          res.json({
            message: "Filtered selected countries based on cities",
            data: filteredCountries,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        }
      });
       

export default router;  
