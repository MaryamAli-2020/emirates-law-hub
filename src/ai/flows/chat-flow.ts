'use server';
/**
 * @fileOverview A simple chat flow for the UAE Legislation portal AI assistant.
 *
 * - chat - A function that handles user queries about legislation.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getLegislations, Legislation } from '@/lib/data';

// Prepare legislation data as a string for the prompt
const legislationContext = getLegislations().map(l => 
    `ID: ${l.id}\nTitle: ${l.title}\nLegislation Number: ${l.legislationNumber}\nLegislation Type: ${l.legislationType}\nCategory: ${l.category}\nDate: ${l.date}\nSummary: ${l.summary}\nSubject Matter: ${l.subjectMatter}\n\n`
).join('---');

const ChatInputSchema = z.object({
  query: z.string().describe('The user\'s question about UAE legislation.'),
  history: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional().describe('The recent chat history for context.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  answer: z.string().describe('The AI assistant\'s answer to the user\'s query.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: ChatInputSchema},
  output: {schema: ChatOutputSchema},
  prompt: `You are an expert AI assistant for the UAE Legislation portal. Your role is to help users understand legislation by answering their questions in plain, easy-to-understand language.

  You have access to the following list of legislations. Use this information to answer the user's query. Do not make up information. If you don't know the answer, say that you don't have enough information.

  Keep your answers concise and helpful. When you mention a piece of legislation, refer to its title.

  LEGISLATION DATA:
  ---
  ${legislationContext}
  ---
  
  CHAT HISTORY:
  {{#if history}}
    {{#each history}}
      {{role}}: {{content}}
    {{/each}}
  {{/if}}

  USER QUERY:
  {{{query}}}
  `,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
