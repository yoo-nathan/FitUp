const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const pool = require('./db')


const BMRcal = async (req, res) => {
    const { UID } = req.query;
    
    function calculateBMR(gender, weight, height, age, workoutnum) {
        let bmr;
        weight = weight * 0.4536;
        height = height * 30.48;
        if (gender.toLowerCase() === 'male') {
          bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else if (gender.toLowerCase() === 'female') {
          bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        } else {
          throw new Error('Invalid gender specified. Please use "male" or "female".');
        }
        
        if (workoutnum >= 0 && workoutnum <= 1) {
            bmr *= 1.2; // Sedentary
        } else if (workoutnum >= 2 && workoutnum <= 3) {
            bmr *= 1.375; // Lightly active
        } else if (workoutnum >= 4 && workoutnum <= 5) {
            bmr *= 1.55; // Moderately active
        } else if (workoutnum == 6) {
            bmr *= 1.725; // Very active
        } else if (workoutnum == 7) {
            bmr *= 1.9; // Extra active
        } else {
            throw new Error('Invalid number of workout days. Please use a value between 0 and 7.');
        }
        
        return bmr;

      }    
  
      try {
        // Fetch user info and workout purpose from database
        const query = 'SELECT gender, weight, height, age, purpose, workout_schedule FROM userInfo WHERE UID = ?';
        const [rows] = await pool.query(query, [UID]);
        
        if (rows.length === 0) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        const user = rows[0];
        const workoutSchedule = JSON.parse(user.workout_schedule);
        // Calculate the number of workout days
        const numberOfWorkoutDays = workoutSchedule.length;
        let bmr = calculateBMR(user.gender, user.weight, user.height, user.age, numberOfWorkoutDays);
    
        // Adjust BMR based on the user's workout purpose
        switch (user.purpose) {
          case 'Lose weight':
            bmr *= 0.8;
            break;
          case 'Gain weight':
            bmr *= 1.15;
            break;
          // No default action needed; if it's neither case, do nothing
        }
        fat = bmr * 0.3 / 9
        carbo = bmr * 0.55 / 4
        protein = user.weight * 0.9
        array = [bmr.toFixed(0),carbo.toFixed(0),protein.toFixed(0),fat.toFixed(0)]
        // Return the adjusted BMR result
        res.json(array);
      } catch (error) {
        console.error('Error fetching user data or calculating BMR', error);
        res.status(500).json({ error: 'Server error' });
      }
    };

module.exports = {
  BMRcal
};
