import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'customDiagrams.json');

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const { category } = req.query;

            if (!category) {
                return res.status(400).json({ error: 'Category is required' });
            }

            // Read the custom diagrams data
            const data = await fs.readFile(dataFilePath, 'utf8');
            const diagrams = JSON.parse(data);

            // Return the specific category data or empty structure
            const categoryData = diagrams[category] || { nodes: [], connections: [], lastModified: null };

            res.status(200).json(categoryData);
        } catch (error) {
            console.error('Error reading diagram data:', error);
            res.status(500).json({ error: 'Failed to load diagram data' });
        }
    } else if (req.method === 'POST') {
        try {
            const { category, nodes, connections } = req.body;

            if (!category) {
                return res.status(400).json({ error: 'Category is required' });
            }

            // Read existing data
            let diagrams = {};
            try {
                const data = await fs.readFile(dataFilePath, 'utf8');
                diagrams = JSON.parse(data);
            } catch (error) {
                // File doesn't exist, create empty structure
                diagrams = {};
            }

            // Update the specific category
            diagrams[category] = {
                nodes: nodes || [],
                connections: connections || [],
                lastModified: new Date().toISOString()
            };

            // Write back to file
            await fs.writeFile(dataFilePath, JSON.stringify(diagrams, null, 2));

            res.status(200).json({ success: true, message: 'Diagram saved successfully' });
        } catch (error) {
            console.error('Error saving diagram data:', error);
            res.status(500).json({ error: 'Failed to save diagram data' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
