# Solution - Jack Pearson

## Task Completed
Front End

## Time Spent
9 Hours

## Approach / Implementation Details
For my wireframe I aimed for a clean, uncluttered UI, avoiding the overload of confusing information that I often saw in the dashboards of my university assignments, with a focus towards the overall score rather than the answers to the questions.

My Approach was to get all the data sent by the api on the page first so that i could see what i had to work with. I focused on building the Questions and Answers part first, making sure it showed everything clearly such as each question with its answer, the selected options and scores and which questions hadn’t been answered.

After getting the data from the API and making sure I could see all the information available, I focused on building the Questions and Answers section first. I made sure every question was displayed clearly with its answer, showed the selected options and their scores, and highlighted any unanswered questions so nothing got missed.

Next, I added some visualizations to make the data easier to understand at a glance. I used a bar chart to show the scores for each question and a radial chart to give a clear, visual breakdown of the overall score.

Finally, I styled the front end into a clean, easy-to-read dashboard. I wanted the overall score and insights to be the first things the user sees. The breakdown of the questions and answers comes next, and the full list of questions and answers is tucked into an accordion. This way, the UI stays uncluttered and easy to navigate, unlike some of the confusing layouts I’ve seen in university assessment dashboards. 

I replaced the standard loading message with a loading bar to give users a clear visual indication that the dashboard is loading, so they know the page isn’t frozen.

I also added a tooltip to display additional scoring information, making it easy for users to see the details without cluttering the interface.


## Tools & Libraries Used

I used Recharts for both the bar chart and the radial chart as their documentation was clear and easy to follow.

I used copilot to explain certain files in my workspace and for data manipulation

## Testing
As mentioned in the notes to the assignment, my http://localhost:3000/ was blocked so I instead used http://localhost:3001/ and that worked as expected. If you go to that URL then the dashboard should load as expected

## Challenges & Solutions
My biggest challenge was working with React and TypeScript, since most of my component-based experience has been with PHP, Twig, and Timber for WordPress, as well as uSync for Umbraco. Outside of university projects and personal study, this was my first significant exposure to these technologies. This meant that I had to spend longer to see how the project is setup and work out how I can add value to the base dashboard.

In the end I did go over the 2 - 3 hours which was advised I spend on this task, however I see this as a positive. I hope that this assignment has proven that I have the resilience to learn unfamiliar tools, adapt my approach as I go and learn quickly. Despite this being my first significant exposure to these technologies, I delivered a fully working tool that meets the brief.

Im aware that my solution may not be perfect but it does show a willingness to learn new skill and get stuck in.

## Trade-offs & Future Improvements
If I could improve this, I would add the “Download as PDF” button mentioned in the brief. I think this would be really useful for teachers or students to get a snapshot of their scores.

I could also do with better error handling, at the minute its just the generic message from the base, to improve UX I would make this alot more specific

I also think my code can definitely be refactored. I unfortunatley realise now that Ive finished that I should have broken the app down more. I’ve made components for the charts, but I could have pushed this further and made every key part of the dashboard its own component, such as the accordion, score, insights, etc. This would prevent my main results file from being so long and make it much easier for another developer to work on the project.