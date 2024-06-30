const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');

async function updateAIModel(feedback, modelPath) {
    // Load or create the model
    let model;
    try {
        if (fs.existsSync(modelPath)) {
            model = await tf.loadLayersModel(`file://${modelPath}`);
        } else {
            model = tf.sequential();
            model.add(tf.layers.dense({ units: 64, activation: 'relu', inputShape: [1] }));
            model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
            model.add(tf.layers.dense({ units: 1 }));
            model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });
        }
    } catch (err) {
        console.error('Error loading or creating the model:', err);
        return;
    }

    // Prepare the training data
    const xs = tf.tensor2d([parseInt(feedback.rating)], [1, 1]);
    const ys = tf.tensor2d([parseInt(feedback.rating)], [1, 1]); // Use the rating as the target value

    // Train the model
    try {
        await model.fit(xs, ys, { epochs: 50, batchSize: 1, shuffle: true });
        // Save the updated model
        await model.save(`file://${modelPath}`);
        console.log('Model updated and saved successfully.');
    } catch (err) {
        console.error('Error training or saving the model:', err);
    }
}

// Simulate feedback data
const feedback = { rating: '5', timestamp: new Date().toISOString() };
const modelPath = path.resolve(__dirname, 'model.json');

// Call the updateAIModel function with simulated feedback
updateAIModel(feedback, modelPath);
