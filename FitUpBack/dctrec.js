
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const pool = require('./db')
const { BMRcal } = require('./BMR calculation');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey : "sk-proj-oHF7tbU3HPbNx7Q55lZzT3BlbkFJHDPdDIn4goILbP1Di2PR"
});

async function fetchMenus() {
    const query = 'SELECT menu FROM DCT';
    const [rows] = await pool.query(query);
    return rows.map(row => row.menu).join(', ');
}
function getBMRInfo(UID) {
    return new Promise((resolve, reject) => {
        const req = { query: { UID } }; // Simulate the Express req object
        const res = {
            json: (data) => resolve(data), // Capture JSON response
            status: function(responseStatus) {
                // Capture and handle status method chaining
                return this;  
            },
            send: (data) => resolve(data), // Capture send response
            end: () => resolve(), // Handle end of response
            status( statusCode ) {
                this.statusCode = statusCode;
                return this;
            }
        };

        BMRcal(req, res, (err) => {
            if (err) reject(err);
        });
    });
}

const getDietPlan = async (req, res) => {
    const { UID } = req.query;

    try {
        const BMRInfo = await getBMRInfo(UID);
        const menus = await fetchMenus(); // You'll need to define this function to fetch menu items from your database

        const prompt = `Create a well-balanced diet plan using the following menu items: ${menus}. ` +
                       `Target daily intake: ${BMRInfo[0]} calories, ${BMRInfo[1]} grams carbohydrates, ` +
                       `${BMRInfo[3]} grams fat, and ${BMRInfo[2]} grams protein. For the nutrition information of menus, just make a prediction. Make sure the sum of the calories of foods add up to the target calorie. Return the response in the following json format:
                       [
                       {
                        menu:"1 serving of certain menu",
                        calorie: "calories in kcal",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       },
                       {
                        menu:"1 serving of certain menu",
                        calorie: "calories in kcal",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       },
                       {
                        menu:"1 serving of certain menu",
                        calorie: "calories in kcal",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       }
                    ]
                      don't say anything else than this json format `;
                       // Assuming the method and path are correct as per the latest SDK documentation
      
  
       const response = await openai.chat.completions.create( {
            model:"gpt-4",
            messages:[{"role": "user", "content": prompt}]
     } );
        const parsableJSONresponse = response.choices[0].message.content;
        const menurecommend = JSON.parse(parsableJSONresponse)
        res.json(menurecommend);
    } catch (error) {
        console.error('Error generating diet plan', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getDietPlan
  };
  