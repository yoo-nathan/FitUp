
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const pool = require('./db')
const { BMRcal } = require('./BMR calculation');
const OpenAI = require('openai');

const openai = new OpenAI.ApiKeyAuthentication({
    apiKey: "sk-proj-4hsnI64pzHCY7fmZseq9T3BlbkFJq1IkfLSGHmLUi5OpKnXY"
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
                       `${BMRInfo[3]} grams fat, and ${BMRInfo[2]} grams protein. For the nutrition information of menus, just make a prediction. Return the response in the following json format:
                       [
                       {
                        menu:"1 serving of certain menu",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       },
                       {
                        menu:"1 serving of certain menu",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       },
                       {
                        menu:"1 serving of certain menu",
                        carbs: "carbohydrates in gram",
                        protein: "protein in gram",
                        fat: "fat in gram"
                       }
                    ]
                       `;

        const response = await openai.createCompletion( {
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 1000,
            temperature: 1,
        });
        const parsableJSONresponse = response.data.choices[0].text;
        const parsedResponse = JSON.parse(parsableJSONresponse)
        res.json({
            parsedResponse
        }
        );
        console.log(parsedResponse);
    } catch (error) {
        console.error('Error generating diet plan', error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    getDietPlan
  };
  