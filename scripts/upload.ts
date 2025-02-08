// scripts/uploadQuestions.ts
import { prisma } from '../lib/prisma'
import fs from 'fs'
import csv from 'csv-parser'

async function uploadQuestions() {
  try {
    const results: any[] = []

    // Read CSV file
    fs.createReadStream('questions.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const row of results) {
          await prisma.question.create({
            data: {
              name: row.Name,
              questionId: parseInt(row['Question ID']),
              difficulty: row.Difficulty,
              questionTags: row['Question Tags'].split(',').map((tag: string) => tag.trim()),
              companyTags: row['Company Tags'].split(',').map((tag: string) => tag.trim()),
              questionUrl: row['Question URL'],
              totalSubmissions: parseInt(row['Total Submissions']),
              totalAccepted: parseInt(row['Total Accepted'])
            }
          })
        }
        console.log('Data upload completed!')
      })
  } catch (error) {
    console.error('Error uploading data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the upload
uploadQuestions()
