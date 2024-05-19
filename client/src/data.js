export const projectData = {
  projects: [
    {
      Project_ID: 1,
      Name: 'Project A',
      Created_by: 1,
    },
    {
      Project_ID: 2,
      Name: 'Project B',
      Created_by: 1,
    },
    {
      Project_ID: 2,
      Name: 'Project C',
      Created_by: 2,
    },
    {
      Project_ID: 2,
      Name: 'Project D',
      Created_by: 2,
    },
  ],
  chapters: [
    {
      Chapter_ID: 1,
      Project_ID: 1,
      Chapter_Number: 1,
      Chapter_Name: 'Chapter 1',
      Chapter_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      Chapter_ID: 2,
      Project_ID: 1,
      Chapter_Number: 3,
      Chapter_Name: 'Chapter 2',
      Chapter_text:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
      Chapter_ID: 3,
      Project_ID: 2,
      Chapter_Number: 2,
      Chapter_Name: 'Chapter 1',
      Chapter_text:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
  ],
  characters: [
    {
      Character_ID: 1,
      Project_ID: 1,
      Name: 'John Doe',
      Age: 30,
      Role: 'Protagonist',
    },
    {
      Character_ID: 2,
      Project_ID: 2,
      Name: 'Jane Smith',
      Age: 25,
      Role: 'Antagonist',
    },
    {
      Character_ID: 3,
      Project_ID: 1,
      Name: 'Alex Johnson',
      Age: 35,
      Role: 'Supporting',
    },
  ],
};

export default projectData;
