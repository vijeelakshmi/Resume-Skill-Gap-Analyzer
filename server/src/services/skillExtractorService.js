// A larger skill database (abbreviated for brevity)
const SKILLS = [
  'javascript', 'typescript', 'react', 'angular', 'vue', 'node.js', 'express',
  'python', 'django', 'flask', 'java', 'spring', 'c#', '.net', 'php', 'laravel',
  'sql', 'mysql', 'postgresql', 'mongodb', 'redis', 'graphql', 'rest api',
  'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'jenkins', 'git', 'github',
  'machine learning', 'data science', 'tensorflow', 'pytorch', 'pandas', 'numpy',
  'agile', 'scrum', 'kanban', 'jira', 'confluence', 'leadership', 'communication',
  'project management', 'product management', 'ux design', 'figma', 'sketch',
  'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind', 'material-ui'
];

export const extract = (text) => {
  const lowerText = text.toLowerCase();
  const found = new Set();

  SKILLS.forEach(skill => {
    // Simple word boundary check; could be improved with regex
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(lowerText)) {
      found.add(skill);
    }
  });

  return Array.from(found);
};

// Export the skill list for other services
export { SKILLS };